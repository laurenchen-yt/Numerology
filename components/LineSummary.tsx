interface LineSummaryProps {
  activeLines: string[];
  missingDigits: number[];
  digitCounts: Record<number, number>;
}

const LINE_LABELS: Record<string, { name: string; desc: string }> = {
  "1-2-3": { name: "思維軸", desc: "邏輯清晰、善於分析" },
  "4-5-6": { name: "意志軸", desc: "行動有力、意志堅定" },
  "7-8-9": { name: "行動軸", desc: "落地執行、務實高效" },
  "1-4-7": { name: "計畫軸", desc: "長遠規劃、穩步推進" },
  "2-5-8": { name: "感性軸", desc: "情感細膩、直覺敏銳" },
  "3-6-9": { name: "創造軸", desc: "創意豐沛、美感天賦" },
  "1-5-9": { name: "決心軸", desc: "目標明確、意志貫徹" },
  "3-5-7": { name: "靈感軸", desc: "直覺靈動、洞見超前" },
};

export default function LineSummary({
  activeLines,
  missingDigits,
  digitCounts,
}: LineSummaryProps) {
  const dominantDigits = Object.entries(digitCounts)
    .filter(([, c]) => c >= 3)
    .map(([d]) => Number(d));

  return (
    <div className="w-full rounded-2xl bg-white/4 ring-1 ring-white/10 p-5 backdrop-blur-sm space-y-5">
      <h3 className="text-xs text-white/40 uppercase tracking-widest font-semibold">
        連線判定 & 數字分布
      </h3>

      {/* Active lines */}
      <div>
        <p className="text-xs text-white/35 mb-3">九宮格連線</p>
        {activeLines.length === 0 ? (
          <p className="text-sm text-white/40 italic">無形成主要連線</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {activeLines.map((key) => {
              const label = LINE_LABELS[key];
              return (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-violet-600/20 ring-1 ring-violet-500/30 rounded-xl px-3 py-1.5"
                >
                  <span className="font-mono text-xs text-violet-300">{key}</span>
                  {label && (
                    <>
                      <span className="text-white/20">·</span>
                      <span className="text-xs text-white/70">{label.name}</span>
                      <span className="hidden sm:inline text-[10px] text-white/35">
                        {label.desc}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dominant digits */}
      {dominantDigits.length > 0 && (
        <div>
          <p className="text-xs text-white/35 mb-2">強勢能量（出現 3 次以上）</p>
          <div className="flex flex-wrap gap-2">
            {dominantDigits.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 bg-amber-600/20 ring-1 ring-amber-500/30 rounded-lg px-2.5 py-1 text-xs text-amber-200"
              >
                <span className="font-bold">{d}</span>
                <span className="text-amber-200/40">×{digitCounts[d]}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing digits */}
      {missingDigits.length > 0 && (
        <div>
          <p className="text-xs text-white/35 mb-2">缺少數字（成長潛力方向）</p>
          <div className="flex flex-wrap gap-2">
            {missingDigits.map((d) => (
              <span
                key={d}
                className="inline-flex items-center bg-white/5 ring-1 ring-white/10 rounded-lg px-2.5 py-1 text-xs text-white/40"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
