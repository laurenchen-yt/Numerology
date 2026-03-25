interface CalculationStepsProps {
  digits: number[];
  lifeSteps: string[];
  lifeNumber: number;
  talentSum: number;
  talentNumbers: number[];
}

export default function CalculationSteps({
  digits,
  lifeSteps,
  lifeNumber,
  talentSum,
  talentNumbers,
}: CalculationStepsProps) {
  return (
    <div className="w-full rounded-2xl bg-white/4 ring-1 ring-white/10 p-5 space-y-5 backdrop-blur-sm">
      <h3 className="text-xs text-white/40 uppercase tracking-widest font-semibold">
        計算過程
      </h3>

      {/* Digit extraction */}
      <div>
        <p className="text-xs text-white/35 mb-2">提取數字</p>
        <div className="flex flex-wrap gap-2">
          {digits.map((d, i) => (
            <span
              key={i}
              className={`
                inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-mono font-bold
                ${d === 0
                  ? "bg-white/5 text-white/20 ring-1 ring-white/10"
                  : "bg-violet-600/25 text-violet-200 ring-1 ring-violet-500/30"
                }
              `}
            >
              {d}
            </span>
          ))}
        </div>
        <p className="text-xs text-white/30 mt-1">
          0 不計入九宮格，仍參與數字加總
        </p>
      </div>

      {/* Life number steps */}
      <div>
        <p className="text-xs text-white/35 mb-2">生命數推導</p>
        <div className="space-y-1 font-mono text-sm">
          {lifeSteps.map((step, i) => (
            <div
              key={i}
              className={`text-white/${i === lifeSteps.length - 1 ? "80" : "50"}`}
            >
              {i < lifeSteps.length - 1 ? (
                <span>{step}</span>
              ) : (
                <span className="text-violet-300 font-bold">{step}</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-white/40">
          ∴ 生命數 ={" "}
          <span className="text-violet-300 font-bold text-sm">{lifeNumber}</span>
        </div>
      </div>

      {/* Talent number */}
      <div>
        <p className="text-xs text-white/35 mb-2">天賦數推導</p>
        <div className="font-mono text-sm text-white/60">
          {digits.join("+")} = {talentSum}
        </div>
        <div className="mt-1 text-xs text-white/40">
          ∴ 天賦數 ={" "}
          <span className="text-indigo-300 font-bold text-sm">
            {talentNumbers.join(" · ")}
          </span>
        </div>
      </div>
    </div>
  );
}
