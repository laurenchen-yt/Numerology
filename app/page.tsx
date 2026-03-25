"use client";

import { useState } from "react";
import BirthInputForm from "@/components/BirthInputForm";
import ResultCards from "@/components/ResultCards";
import CalculationSteps from "@/components/CalculationSteps";
import NumerologyGrid from "@/components/NumerologyGrid";
import LineSummary from "@/components/LineSummary";
import InterpretationCard from "@/components/InterpretationCard";
import { parseBirthDate } from "@/lib/parseBirthDate";
import { getLifeNumber, getTalentNumbers, getDigitCounts, getMissingDigits } from "@/lib/numerology";
import { getZodiacSign, getZodiacNumber } from "@/lib/zodiac";
import { getActiveLines } from "@/lib/grid";
import { generateInterpretation } from "@/lib/interpretation";
import { NumerologyResult, ParsedBirthDate } from "@/types/numerology";

type AppState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "result"; parsed: ParsedBirthDate; result: NumerologyResult; interpretation: string };

const EXAMPLE_DATE = "1979/10/02";

export default function Home() {
  const [state, setState] = useState<AppState>({ status: "idle" });
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  function compute(input: string) {
    setLoading(true);
    setInputError("");
    try {
      const parsed = parseBirthDate(input);
      const { lifeNumber, lifeSteps } = getLifeNumber(parsed.digits);
      const { talentSum, talentNumbers } = getTalentNumbers(parsed.digits);
      const zodiacSign = getZodiacSign(parsed.month, parsed.day);
      const zodiacNumber = getZodiacNumber(zodiacSign);
      const digitCounts = getDigitCounts(parsed.digits);
      const missingDigits = getMissingDigits(digitCounts);
      const activeLines = getActiveLines(digitCounts);

      const result: NumerologyResult = {
        lifeNumber,
        lifeSteps,
        talentSum,
        talentNumbers,
        zodiacSign,
        zodiacNumber,
        digitCounts,
        missingDigits,
        activeLines,
      };

      const interpretation = generateInterpretation(result);
      setState({ status: "result", parsed, result, interpretation });
    } catch (e) {
      if (e instanceof Error) {
        setInputError(e.message);
      } else {
        setInputError("計算過程發生未知錯誤，請重新嘗試");
      }
      setState({ status: "idle" });
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (value: string) => {
    compute(value);
  };

  const handleExample = () => {
    compute(EXAMPLE_DATE);
  };

  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[#09090f]">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-transparent to-indigo-950/30" />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-violet-600/8 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-indigo-600/8 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 space-y-12">
        {/* Hero */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-600/15 ring-1 ring-violet-500/25 text-violet-300 text-xs tracking-widest uppercase mb-2">
            ✦ 生命靈數解析
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">
            探索你的<br className="sm:hidden" />生命數字
          </h1>
          <p className="text-white/45 text-base max-w-sm mx-auto leading-relaxed">
            輸入你的西元出生日期，解析生命數、天賦數、星座與九宮格能量
          </p>
        </header>

        {/* Input */}
        <section aria-label="出生日期輸入" className="space-y-3">
          <BirthInputForm onSubmit={handleSubmit} loading={loading} />
          {inputError && (
            <p role="alert" className="text-center text-sm text-red-400/90">
              ⚠ {inputError}
            </p>
          )}
          {state.status === "idle" && (
            <p className="text-center text-xs text-white/25">
              或試試範例：
              <button
                onClick={handleExample}
                className="ml-1 text-violet-400/70 hover:text-violet-300 underline underline-offset-2 transition-colors"
              >
                {EXAMPLE_DATE}
              </button>
            </p>
          )}
        </section>

        {/* Results */}
        {state.status === "result" && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary cards */}
            <section aria-label="計算結果摘要">
              <ResultCards
                result={state.result}
                birthDate={state.parsed.normalizedDate}
              />
            </section>

            {/* Calculation steps */}
            <section aria-label="計算過程">
              <CalculationSteps
                digits={state.parsed.digits}
                lifeSteps={state.result.lifeSteps}
                lifeNumber={state.result.lifeNumber}
                talentSum={state.result.talentSum}
                talentNumbers={state.result.talentNumbers}
              />
            </section>

            {/* Grid */}
            <section aria-label="九宮格">
              <NumerologyGrid
                digitCounts={state.result.digitCounts}
                activeLines={state.result.activeLines}
              />
            </section>

            {/* Line summary */}
            <section aria-label="連線判定">
              <LineSummary
                activeLines={state.result.activeLines}
                missingDigits={state.result.missingDigits}
                digitCounts={state.result.digitCounts}
              />
            </section>

            {/* Interpretation */}
            <section aria-label="解析文字">
              <InterpretationCard
                interpretation={state.interpretation}
                lifeNumber={state.result.lifeNumber}
                zodiacSign={state.result.zodiacSign}
              />
            </section>
          </div>
        )}

        {/* Idle placeholder */}
        {state.status === "idle" && (
          <div className="text-center py-16 space-y-3 opacity-40">
            <div className="grid grid-cols-3 gap-2 max-w-[144px] mx-auto mb-6">
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <div key={n} className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/30 text-xs font-mono">
                  {n}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/30">輸入生日後，結果將顯示在這裡</p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-white/15 pt-4 border-t border-white/5">
          生命靈數計算 · 僅供參考 · 不構成任何命理建議
        </footer>
      </div>
    </main>
  );
}
