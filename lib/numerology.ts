/**
 * Sum all digits in an array.
 */
export function sumDigits(digits: number[]): number {
  return digits.reduce((a, b) => a + b, 0);
}

/**
 * Repeatedly sum digits until a single digit remains.
 * Returns each intermediate step as a string for display.
 */
export function reduceToSingleDigit(
  n: number,
  steps: string[] = []
): { result: number; steps: string[] } {
  if (n < 10) return { result: n, steps };

  const digits = String(n).split("").map(Number);
  const next = digits.reduce((a, b) => a + b, 0);
  const stepStr = `${digits.join("+")} = ${next}`;
  return reduceToSingleDigit(next, [...steps, stepStr]);
}

/**
 * Calculate Life Number (生命數) from raw digit array.
 * Returns the single-digit result and full step trace.
 */
export function getLifeNumber(digits: number[]): {
  lifeNumber: number;
  lifeSteps: string[];
} {
  const firstSum = sumDigits(digits);
  const firstStep = `${digits.join("+")} = ${firstSum}`;

  if (firstSum < 10) {
    return { lifeNumber: firstSum, lifeSteps: [firstStep] };
  }

  const { result, steps } = reduceToSingleDigit(firstSum, [firstStep]);
  return { lifeNumber: result, lifeSteps: steps };
}

/**
 * Calculate Talent Numbers (天賦數) from raw digit array.
 * Returns the first sum and its individual digits.
 */
export function getTalentNumbers(digits: number[]): {
  talentSum: number;
  talentNumbers: number[];
} {
  const sum = sumDigits(digits);
  if (sum < 10) {
    return { talentSum: sum, talentNumbers: [sum] };
  }
  const talentNumbers = String(sum).split("").map(Number);
  return { talentSum: sum, talentNumbers };
}

/**
 * Count occurrences of each digit 1-9 in the digit array (0 ignored).
 */
export function getDigitCounts(digits: number[]): Record<number, number> {
  const counts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) counts[i] = 0;
  for (const d of digits) {
    if (d >= 1 && d <= 9) counts[d] = (counts[d] || 0) + 1;
  }
  return counts;
}

/**
 * Return list of digits 1-9 that don't appear in the digit array.
 */
export function getMissingDigits(digitCounts: Record<number, number>): number[] {
  return Object.entries(digitCounts)
    .filter(([, count]) => count === 0)
    .map(([d]) => Number(d));
}
