import { ParsedBirthDate } from "@/types/numerology";

/**
 * Parses a birth date string in YYYY/MM/DD, YYYY-MM-DD, or YYYYMMDD format.
 * Throws a descriptive error if the input is invalid.
 */
export function parseBirthDate(input: string): ParsedBirthDate {
  const cleaned = input.trim();

  let year: number, month: number, day: number;

  // Match YYYY/MM/DD or YYYY-MM-DD
  const withSepMatch = cleaned.match(
    /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/
  );
  // Match YYYYMMDD
  const noSepMatch = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);

  if (withSepMatch) {
    year = parseInt(withSepMatch[1], 10);
    month = parseInt(withSepMatch[2], 10);
    day = parseInt(withSepMatch[3], 10);
  } else if (noSepMatch) {
    year = parseInt(noSepMatch[1], 10);
    month = parseInt(noSepMatch[2], 10);
    day = parseInt(noSepMatch[3], 10);
  } else {
    throw new Error("生日格式錯誤，請輸入 YYYY/MM/DD、YYYY-MM-DD 或 YYYYMMDD");
  }

  // Basic range checks
  if (year < 1900 || year > new Date().getFullYear()) {
    throw new Error(`年份 ${year} 超出合理範圍，請重新確認`);
  }
  if (month < 1 || month > 12) {
    throw new Error("月份必須介於 1 到 12 之間");
  }
  if (day < 1 || day > 31) {
    throw new Error("日期必須介於 1 到 31 之間");
  }

  // Validate actual date existence
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    throw new Error(
      `你輸入的日期 ${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")} 不存在，請重新確認`
    );
  }

  // Extract all individual digits from the date string (year + month + day)
  const normalizedDate = `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  const digits = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`
    .split("")
    .map(Number);

  return { year, month, day, digits, normalizedDate };
}
