import WeekRow from "./WeekRow";

type CalendarProps = {
  yearsToLive: number;
  yearsAndWeeksSinceBirth: [number, number];
};

function getFillIndex(yearIndex: number, weekIndex: number, index: number) {
  if (index > yearIndex) return 0;

  if (index < yearIndex) return 52;

  return weekIndex;
}

export default function Calendar({
  yearsToLive,
  yearsAndWeeksSinceBirth: [yearIndex, weekIndex],
}: CalendarProps) {

  return (
    <div className="calendar">
      {[...Array(yearsToLive)].map((_, index) => {
        const year = index + 1;
        const label = year % 5 === 0 ? year : undefined;
        const fillIndex = getFillIndex(yearIndex, weekIndex, index);
        const hasGap = year % 10 === 0;

        return (
          <div className="week-row" key={index}>
            <WeekRow label={label} fillIndex={fillIndex} hasGap={hasGap} />
          </div>
        );
      })}
      <style jsx>{`
        .calendar {
          padding-bottom: 16px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
