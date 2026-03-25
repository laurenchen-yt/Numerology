"use client";

import { NumerologyResult } from "@/types/numerology";
import { GRID_POSITIONS, getLinesWithCoords } from "@/lib/grid";

interface NumerologyGridProps {
  digitCounts: NumerologyResult["digitCounts"];
  activeLines: NumerologyResult["activeLines"];
}

const CELL_SIZE = 96; // px
const SVG_SIZE = CELL_SIZE * 3;
const HALF = CELL_SIZE / 2;

// Display order for grid: top-left to bottom-right
const GRID_ORDER = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function DigitDots({ count }: { count: number }) {
  if (count === 0) return null;
  if (count === 1)
    return <span className="text-2xl font-bold text-white/90">{1}</span>;

  // Render repeated dots for count >= 2
  return (
    <div className="flex flex-wrap justify-center items-center gap-1 max-w-[56px]">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="inline-block w-5 h-5 rounded-full bg-violet-400/80 text-[10px] font-bold text-white flex items-center justify-center leading-none"
          style={{ lineHeight: "20px", textAlign: "center" }}
        >
          {/* empty dots for visual representation */}
        </span>
      ))}
    </div>
  );
}

export default function NumerologyGrid({ digitCounts, activeLines }: NumerologyGridProps) {
  const lineCoords = getLinesWithCoords(activeLines, CELL_SIZE);

  return (
    <div className="w-full rounded-2xl bg-white/4 ring-1 ring-white/10 p-5 backdrop-blur-sm">
      <h3 className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-4">
        生命靈數九宮格
      </h3>

      {/* Grid container with SVG overlay */}
      <div className="relative mx-auto" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
        {/* SVG lines overlay */}
        <svg
          className="absolute inset-0 pointer-events-none z-10"
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        >
          {lineCoords.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgb(167 139 250 / 0.75)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="0"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="200"
                to="0"
                dur="0.5s"
                fill="freeze"
              />
            </line>
          ))}
        </svg>

        {/* Grid cells */}
        <div className="grid grid-cols-3 gap-0 w-full h-full z-0">
          {GRID_ORDER.flat().map((digit) => {
            const count = digitCounts[digit] ?? 0;
            const [col, row] = GRID_POSITIONS[digit];
            const isActive = activeLines.some((line) =>
              line.split("-").map(Number).includes(digit)
            );

            return (
              <div
                key={digit}
                className={`
                  relative flex flex-col items-center justify-center
                  border border-white/8
                  ${isActive ? "bg-violet-600/15" : "bg-white/3"}
                  transition-colors duration-300
                `}
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
              >
                {/* Digit number label (top-left corner) */}
                <span className="absolute top-1.5 left-2 text-[10px] text-white/25 font-mono">
                  {digit}
                </span>

                {/* Count display */}
                {count === 0 ? (
                  <span className="text-white/12 text-lg">—</span>
                ) : count === 1 ? (
                  <span className="text-3xl font-bold text-white/90 tabular-nums">
                    {digit}
                  </span>
                ) : (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-2xl font-bold text-violet-200/90 tabular-nums">
                      {digit}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: count }).map((_, i) => (
                        <span
                          key={i}
                          className="block w-1.5 h-1.5 rounded-full bg-violet-400/70"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-4 text-xs text-white/35">
        <span className="flex items-center gap-1">
          <span className="block w-3 h-0.5 bg-violet-400/70 rounded" />
          已連線
        </span>
        <span className="flex items-center gap-1">
          <span className="block w-1.5 h-1.5 rounded-full bg-violet-400/70" />
          重複出現
        </span>
      </div>
    </div>
  );
}
