import {
  weeksInYear,
  darkGrey,
  laptopScreenWidth,
  mobileScreenWidth,
} from "../constants";
import cn from "classnames";

type WeekRowProps = {
  label?: number;
  fillIndex: number;
  hasGap?: boolean;
};

export default function WeekRow({ label, fillIndex, hasGap }: WeekRowProps) {
  return (
    <div className={cn("row", { "has-gap": hasGap })}>
      {weeksInYear.map((_, index) => {
        let classes = "week";

        if (index < fillIndex) {
          classes += " filled";
        }

        return <div className={classes} key={index} />;
      })}
      <label className="label">{label}</label>

      <style jsx>{`
        .has-gap {
          margin-bottom: 4px;
        }

        .week {
          margin: 1px;
          height: 2px;
          width: 2px;
          border: 1px solid ${darkGrey};
          border-radius : 100%;
        }

        .week.filled {
          background-color: ${darkGrey};
        }

        .row {
          display: flex;
          align-items: center;
          position: relative;
        }

        .label {
          position: absolute;
          right: -8px;
          width: 1px;
          text-align: left;
          color: ${darkGrey};
          font-size: 8px;
        }

        @media screen and (min-width: ${mobileScreenWidth}) {
          .has-gap {
            margin-bottom: 6px;
          }

          .label {
            font-size: 10px;
          }

          .week {
            height: 3px;
            width: 3px;
          }
        }

        @media screen and (min-width: ${laptopScreenWidth}) {
          .has-gap {
            margin-bottom: 12px;
          }

          .label {
            font-size: 12px;
          }

          .week {
            height: 6px;
            width: 6px;
          }
        }
      `}</style>
    </div>
  );
}
