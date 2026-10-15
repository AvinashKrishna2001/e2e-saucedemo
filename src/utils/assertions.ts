import { expect } from '@playwright/test';

export function parsePrice(text: string): number {
  const parsed = Number(text.replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(parsed)) throw new Error(`Could not parse a numeric price from "${text}".`);
  return parsed;
}

export function expectAscending(values: number[], subject = 'values'): void {
  const expected = [...values].sort((left, right) => left - right);
  expect(values, `${subject} should be sorted in ascending order`).toEqual(expected);
}
