"use client";

import { useState } from "react";

interface BirthInputFormProps {
  onSubmit: (value: string) => void;
  loading?: boolean;
}

export default function BirthInputForm({ onSubmit, loading }: BirthInputFormProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) {
      setError("請輸入出生日期");
      return;
    }
    setError("");
    onSubmit(value.trim());
  };

  const handleClear = () => {
    setValue("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative group">
        <input
          id="birth-date-input"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder="例如：1979/10/02"
          className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-base focus:outline-none focus:border-violet-400/60 focus:bg-white/8 transition-all duration-300 backdrop-blur-sm pr-24"
          aria-label="出生日期"
          aria-describedby="birth-date-hint birth-date-error"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[80px] top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors text-xl leading-none px-1"
            aria-label="清除"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed text-white text-sm font-medium transition-all duration-200 active:scale-95"
        >
          {loading ? "計算中…" : "計算"}
        </button>
      </div>

      {/* Format hint */}
      <p id="birth-date-hint" className="mt-2 text-xs text-white/35 text-center">
        支援格式：YYYY/MM/DD · YYYY-MM-DD · YYYYMMDD
      </p>

      {/* Error */}
      {error && (
        <p
          id="birth-date-error"
          role="alert"
          className="mt-2 text-sm text-red-400/90 text-center animate-fade-in"
        >
          ⚠ {error}
        </p>
      )}
    </form>
  );
}
