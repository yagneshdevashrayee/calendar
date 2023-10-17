import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInYears from "date-fns/differenceInYears";
import startOfToday from "date-fns/startOfToday";
import startOfDay from "date-fns/startOfDay";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

export function yearsAndWeeksSinceDate(date: Date): [number, number] {
  const startOfDate = startOfDay(date);
  const today = startOfToday();

  const year = getYear(today);
  const month = getMonth(startOfDate);
  const day = startOfDate.getDate();

  const weekIndex = differenceInWeeks(
    today,
    startOfDay(new Date(year, month, day))
  );
  const yearIndex = differenceInYears(today, startOfDate);
  return [yearIndex, weekIndex];
}

export function validateAge(num: number, min: number, max: number) {
  const age = Math.min(Math.max(Math.floor(num), min), max);

  if (!age) {
    return 80;
  }

  return age;
}
