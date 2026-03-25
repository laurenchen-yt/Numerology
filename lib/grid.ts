import { GridLine, GridLineWithCoords } from "@/types/numerology";

// 8 possible lines in the 3x3 grid
export const GRID_LINES: GridLine[] = [
  { key: "1-2-3", digits: [1, 2, 3] },
  { key: "4-5-6", digits: [4, 5, 6] },
  { key: "7-8-9", digits: [7, 8, 9] },
  { key: "1-4-7", digits: [1, 4, 7] },
  { key: "2-5-8", digits: [2, 5, 8] },
  { key: "3-6-9", digits: [3, 6, 9] },
  { key: "1-5-9", digits: [1, 5, 9] },
  { key: "3-5-7", digits: [3, 5, 7] },
];

/**
 * Grid position map: digit -> [col, row] (0-indexed, top-left origin)
 * Layout:
 * 1 2 3
 * 4 5 6
 * 7 8 9
 */
export const GRID_POSITIONS: Record<number, [number, number]> = {
  1: [0, 0],
  2: [1, 0],
  3: [2, 0],
  4: [0, 1],
  5: [1, 1],
  6: [2, 1],
  7: [0, 2],
  8: [1, 2],
  9: [2, 2],
};

/**
 * Determine which lines are active (all 3 digits present in counts > 0).
 */
export function getActiveLines(
  digitCounts: Record<number, number>
): string[] {
  return GRID_LINES
    .filter((line) => line.digits.every((d) => digitCounts[d] > 0))
    .map((line) => line.key);
}

/**
 * Convert grid lines to SVG coordinate sets.
 * cellSize: pixel size of each grid cell.
 */
export function getLinesWithCoords(
  activeLineKeys: string[],
  cellSize: number
): GridLineWithCoords[] {
  const half = cellSize / 2;
  return GRID_LINES.filter((l) => activeLineKeys.includes(l.key)).map((line) => {
    const [c1, r1] = GRID_POSITIONS[line.digits[0]];
    const [c2, r2] = GRID_POSITIONS[line.digits[2]];
    return {
      ...line,
      x1: c1 * cellSize + half,
      y1: r1 * cellSize + half,
      x2: c2 * cellSize + half,
      y2: r2 * cellSize + half,
    };
  });
}
