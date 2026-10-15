import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const reportPath = path.join(root, 'test-results', 'results.json');
const outputPath = path.join(root, 'failure-summary.md');

const failedStatuses = new Set([
    'failed',
    'timedOut',
    'interrupted',
]);

function safeText(value) {
    return String(value ?? 'Not available')
        .replaceAll('\r', '')
        .replaceAll('`', '\\`');
}

function formatCodeBlock(value) {
    const content = String(value ?? 'No error details recorded.');
    return `\`\`\`text\n${content.replaceAll('```', "'''")}\n\`\`\``;
}

function collectTests(suites, parents = []) {
    const tests = [];

    for (const suite of suites ?? []) {
        const suiteTitles = suite.title
            ? [...parents, suite.title]
            : parents;

        for (const spec of suite.specs ?? []) {
            for (const test of spec.tests ?? []) {
                const results = test.results ?? [];

                // Prefer the failed attempt when a retry occurred.
                const result =
                    [...results].reverse().find((item) =>
                        failedStatuses.has(item.status),
                    ) ?? results.at(-1);

                tests.push({
                    title: [...suiteTitles, spec.title]
                        .filter(Boolean)
                        .join(' > '),
                    file: spec.file ?? suite.file ?? 'Unknown file',
                    line: spec.line,
                    project: test.projectName ?? 'Unknown project',
                    status: test.status ?? result?.status ?? 'unknown',
                    result,
                });
            }
        }

        tests.push(...collectTests(suite.suites, suiteTitles));
    }

    return tests;
}

function getErrors(result) {
    if (result?.errors?.length) {
        return result.errors;
    }

    if (result?.error) {
        return [result.error];
    }

    return [];
}

function formatErrors(result) {
    const errors = getErrors(result);

    if (errors.length === 0) {
        return 'No error message was recorded for this attempt.';
    }

    return errors
        .map((error, index) => {
            const message =
                error.message ??
                error.value ??
                'No error message recorded.';

            const sections = [
                `**Error ${index + 1}:**`,
                '',
                formatCodeBlock(message),
            ];

            if (error.stack) {
                sections.push(
                    '',
                    '**Stack trace:**',
                    '',
                    formatCodeBlock(error.stack),
                );
            }

            return sections.join('\n');
        })
        .join('\n\n');
}

function formatAttachments(result) {
    const attachments = result?.attachments ?? [];

    if (attachments.length === 0) {
        return 'No attachments were recorded for this attempt.';
    }

    return attachments.map((attachment) => {
        const filePath = attachment.path
            ? path.relative(
                root,
                path.resolve(root, attachment.path),
            ).split(path.sep).join('/')
            : null;

        const name = safeText(attachment.name ?? 'Attachment');
        const type = attachment.contentType
            ? ` (${safeText(attachment.contentType)})`
            : '';

        return filePath
            ? `- **${name}**${type}: \`${filePath}\``
            : `- **${name}**${type}: No file path recorded`;
    }).join('\n');
}

async function writeUnavailableSummary(error) {
    const reason = error.code === 'ENOENT'
        ? '`test-results/results.json` was not created. Playwright may not have started, or execution may have failed during setup.'
        : `The JSON report could not be read: ${safeText(error.message)}`;

    const markdown = [
        '# Playwright Failure Summary',
        '',
        `Generated: ${new Date().toISOString()}`,
        '',
        '## Diagnostic report unavailable',
        '',
        reason,
        '',
        'Check the GitHub Actions job logs for the original failure.',
        '',
    ].join('\n');

    await writeFile(outputPath, markdown, 'utf8');
    console.log(markdown);
}

async function main() {
    let report;

    try {
        const content = await readFile(reportPath, 'utf8');
        report = JSON.parse(content);
    } catch (error) {
        await writeUnavailableSummary(error);
        return;
    }

    const tests = collectTests(report.suites ?? []);

    const failures = tests.filter((test) =>
        test.status === 'unexpected' ||
        failedStatuses.has(test.result?.status),
    );

    const flaky = tests.filter(
        (test) => test.status === 'flaky',
    );

    const skipped = tests.filter(
        (test) => test.status === 'skipped',
    );

    const stats = report.stats ?? {};

    const passed = stats.expected ??
        tests.filter((test) => test.status === 'expected').length;

    const total = passed +
        (stats.unexpected ?? failures.length) +
        (stats.flaky ?? flaky.length) +
        (stats.skipped ?? skipped.length);

    const lines = [
        '# Playwright Failure Summary',
        '',
        `Generated: ${new Date().toISOString()}`,
        '',
        '## Test execution summary',
        '',
        `- **Total:** ${total}`,
        `- **Passed:** ${passed}`,
        `- **Failed:** ${stats.unexpected ?? failures.length}`,
        `- **Flaky:** ${stats.flaky ?? flaky.length}`,
        `- **Skipped:** ${stats.skipped ?? skipped.length}`,
        '',
        '## Failed tests',
        '',
    ];

    if (failures.length === 0) {
        lines.push('No final failed tests were recorded in `test-results/results.json`.');
        lines.push('');
    } else {
        for (const [index, test] of failures.entries()) {
            lines.push(
                `### ${index + 1}. ${safeText(test.title)}`,
                '',
                `- **Status:** ${safeText(test.status)}`,
                `- **Browser/project:** ${safeText(test.project)}`,
                `- **Spec file:** ${safeText(test.file)}${test.line ? `:${test.line}` : ''}`,
                '',
                '**Error details:**',
                '',
                formatErrors(test.result),
                '',
                '**Screenshots and other attachments:**',
                '',
                formatAttachments(test.result),
                '',
            );
        }
    }

    if (flaky.length > 0) {
        lines.push('## Flaky tests', '');

        for (const test of flaky) {
            lines.push(
                `- ${safeText(test.title)} (${safeText(test.project)})`,
            );
        }

        lines.push('');
    }

    if (skipped.length > 0) {
        lines.push('## Skipped tests', '');

        for (const test of skipped) {
            lines.push(`- ${safeText(test.title)}`);
        }

        lines.push('');
    }

    lines.push(
        '## Diagnostic files',
        '',
        '- **HTML report:** Download `playwright-html-report`.',
        '- **JSON, Markdown, screenshots, traces and videos:** Download `playwright-diagnostics`.',
        '- Screenshot, trace and video capture follows the settings in `playwright.config.ts`.',
        '',
    );

    const markdown = lines.join('\n');

    await writeFile(outputPath, markdown, 'utf8');
    console.log(markdown);
}

main().catch(async (error) => {
    const message = [
        '# Playwright Failure Summary',
        '',
        'The summary generator encountered an error.',
        '',
        formatCodeBlock(error.stack ?? error.message ?? error),
        '',
    ].join('\n');

    await writeFile(outputPath, message, 'utf8');
    console.error(message);

    // Avoid masking the original Playwright test exit status.
});