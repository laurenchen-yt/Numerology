export type ParsedBirthDate = {
  year: number;
  month: number;
  day: number;
  digits: number[];
  normalizedDate: string;
};

export type NumerologyResult = {
  lifeNumber: number;
  lifeSteps: string[];
  talentSum: number;
  talentNumbers: number[];
  zodiacSign: string;
  zodiacNumber: number;
  digitCounts: Record<number, number>;
  missingDigits: number[];
  activeLines: string[];
};

export type GridLine = {
  key: string;
  digits: [number, number, number];
};

export type GridLineWithCoords = GridLine & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
