"use client";

import { useState } from "react";

interface InterpretationCardProps {
  interpretation: string;
  lifeNumber: number;
  zodiacSign: string;
}

export default function InterpretationCard({
  interpretation,
  lifeNumber,
  zodiacSign,
}: InterpretationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(interpretation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const paragraphs = interpretation.split("\n\n").filter(Boolean);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-purple-900/25 to-indigo-900/15 ring-1 ring-purple-500/20 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs text-white/40 uppercase tracking-widest font-semibold">
          生命靈數解析
        </h3>
        <button
          onClick={handleCopy}
          aria-label="複製解析文字"
          className="text-xs text-white/30 hover:text-violet-300 transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/5"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已複製
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              複製
            </>
          )}
        </button>
      </div>

      <div className="space-y-4 text-sm text-white/70 leading-relaxed">
        {paragraphs.map((para, i) => (
          <p key={i} className={i === 0 ? "text-white/85" : ""}>
            {para}
          </p>
        ))}
      </div>

      <p className="mt-5 text-[10px] text-white/20 text-right">
        生命數 {lifeNumber} · {zodiacSign} · 僅供參考，請保持開放態度
      </p>
    </div>
  );
}
