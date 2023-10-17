import Calendar from "../components/Calendar";
import Theme from "../components/Theme";
import { darkGrey, laptopScreenWidth, mobileScreenWidth } from "../constants";
import { validateAge, yearsAndWeeksSinceDate } from "../utils/years";
import { NextPageContext } from "next";
import isValid from "date-fns/isValid";
import parseISO from "date-fns/parseISO";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

type CalendarPageProps = {
  title: string;
  age: number;
  dob: string;
};

export default function CalendarPage({ title,age, dob }: CalendarPageProps) {
  console.log("tit",title)
  console.log("age",age)
  console.log("dob",dob)
  const yearsAndWeeksSinceBirth = yearsAndWeeksSinceDate(new Date(dob));
  const [downloadFlag, setDownloadFlag] = useState(false)
  useEffect(()=>{
    if(document){
      document!.getElementById("downloadBtn")!.addEventListener("click", () => {
        html2canvas(document.querySelector("#cal_canvas")!).then((canvas: any) => {
          let anchorTag = document.createElement("a");
          document.body.appendChild(anchorTag);
          anchorTag.download = `atmaniriksanam_${new Date()}.png`;
          anchorTag.href = canvas.toDataURL();
          anchorTag.target = '_blank';
          anchorTag.click();
        });
       });
    }
  
  },[downloadFlag]);

  return (
    <Theme>
      <div id="cal_canvas">
      <h1>{title}</h1>
      <Calendar
        yearsToLive={age}
        yearsAndWeeksSinceBirth={yearsAndWeeksSinceBirth}
      />
       <div id="quote">
      <cite id="cite-quote">
       Zindagi na milegi dobara
      </cite>
    </div>
      </div>
    
      <div className="download" onClick={()=>setDownloadFlag(true)}>
    <button id="downloadBtn">Download Calender!</button>
  </div>
      <style jsx>
        {`
          h1 {
            letter-spacing: 0.4em;
            color: ${darkGrey};
            text-align: center;
            font-weight: normal;
            font-size: 16px;
          }

          @media screen and (min-width: ${mobileScreenWidth}) {
            h1 {
              font-size: 16px;
              letter-spacing: 0.6em;
            }
          }

          @media screen and (min-width: ${laptopScreenWidth}) {
            h1 {
              font-size: 24px;
              letter-spacing: 0.8em;
            }
          }
        `}
      </style>
    </Theme>
  );
}

CalendarPage.getInitialProps = async (ctx: NextPageContext) => {
  const title = ctx.query.title?.toString();
  const age = validateAge(Number(ctx.query.age), 1, 125);
  const dob = parseISO(ctx.query.dob?.toString());

  return {
    title,
    dob: isValid(dob) ? dob : parseISO("1994-01-01"),
    age,
  };
};
