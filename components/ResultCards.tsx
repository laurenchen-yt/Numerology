import { NumerologyResult } from "@/types/numerology";

interface ResultCardsProps {
  result: NumerologyResult;
  birthDate: string;
}

const LIFE_NUMBER_KEYWORDS: Record<number, string> = {
  1: "開拓 · 獨立 · 領導",
  2: "協調 · 敏感 · 合作",
  3: "創意 · 表達 · 好奇",
  4: "踏實 · 穩定 · 秩序",
  5: "自由 · 探索 · 變化",
  6: "責任 · 關愛 · 完美",
  7: "內省 · 思考 · 洞察",
  8: "執行 · 效率 · 成就",
  9: "理想 · 同理 · 大局",
};

export default function ResultCards({ result, birthDate }: ResultCardsProps) {
  const { lifeNumber, talentNumbers, zodiacSign, zodiacNumber } = result;

  const cards = [
    {
      id: "life-number",
      label: "生命數",
      value: lifeNumber,
      sub: LIFE_NUMBER_KEYWORDS[lifeNumber] ?? "",
      gradient: "from-violet-600/30 to-purple-900/20",
      ring: "ring-violet-500/40",
      glow: "shadow-violet-500/20",
    },
    {
      id: "talent-numbers",
      label: "天賦數",
      value: talentNumbers.join(" · "),
      sub: `來自總和 ${result.talentSum}`,
      gradient: "from-indigo-600/30 to-blue-900/20",
      ring: "ring-indigo-500/40",
      glow: "shadow-indigo-500/20",
    },
    {
      id: "zodiac-sign",
      label: "星座",
      value: zodiacSign,
      sub: `星座數 ${zodiacNumber}`,
      gradient: "from-amber-600/20 to-orange-900/20",
      ring: "ring-amber-500/40",
      glow: "shadow-amber-500/20",
    },
    {
      id: "active-lines",
      label: "九宮格連線",
      value: `${result.activeLines.length} 條`,
      sub:
        result.activeLines.length > 0
          ? result.activeLines.join("  ")
          : "尚無連線",
      gradient: "from-teal-600/20 to-emerald-900/20",
      ring: "ring-teal-500/40",
      glow: "shadow-teal-500/20",
    },
  ];

  return (
    <div className="w-full">
      <p className="text-center text-white/40 text-sm mb-4">
        出生日期：<span className="text-white/70">{birthDate}</span>
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.id}
            id={card.id}
            className={`
              relative rounded-2xl p-4 backdrop-blur-sm
              bg-gradient-to-br ${card.gradient}
              ring-1 ${card.ring}
              shadow-lg ${card.glow}
              flex flex-col items-center justify-center gap-1
              transition-transform duration-200 hover:-translate-y-1
            `}
          >
            <div className="text-xs text-white/45 uppercase tracking-widest font-medium">
              {card.label}
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {card.value}
            </div>
            <div className="text-[10px] text-white/40 text-center leading-snug">
              {card.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
