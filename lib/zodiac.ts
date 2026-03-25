import { zodiacNumberMap, ZodiacSign } from "@/constants/zodiacNumberMap";

type ZodiacRange = {
  name: ZodiacSign;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
};

const ZODIAC_RANGES: ZodiacRange[] = [
  { name: "摩羯座", startMonth: 12, startDay: 22, endMonth: 12, endDay: 31 },
  { name: "摩羯座", startMonth: 1, startDay: 1, endMonth: 1, endDay: 19 },
  { name: "水瓶座", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: "雙魚座", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: "牡羊座", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: "金牛座", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: "雙子座", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { name: "巨蟹座", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { name: "獅子座", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: "處女座", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: "天秤座", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { name: "天蠍座", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { name: "射手座", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

export function getZodiacSign(month: number, day: number): ZodiacSign {
  for (const range of ZODIAC_RANGES) {
    if (range.startMonth === range.endMonth) {
      if (month === range.startMonth && day >= range.startDay && day <= range.endDay) {
        return range.name;
      }
    } else if (month === range.startMonth && day >= range.startDay) {
      return range.name;
    } else if (month === range.endMonth && day <= range.endDay) {
      return range.name;
    }
  }
  // Fallback (shouldn't happen)
  return "摩羯座";
}

export function getZodiacNumber(sign: ZodiacSign): number {
  return zodiacNumberMap[sign];
}
