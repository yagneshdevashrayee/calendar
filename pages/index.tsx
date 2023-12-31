import { useState } from "react";
import Theme from "../components/Theme";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Ved");
  const [dateOfBirth, setDateOfBirth] = useState("1996-01-30");
  const [age, setAge] = useState("80");

  return (
    <Theme>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          router.push(
            `/calendar?dob=${encodeURIComponent(
              dateOfBirth
            )}&age=${encodeURIComponent(age)}&title=${encodeURIComponent(title)}`
          );
        }}
      >
        <div className="container">
        <div className="form-control">
            <label className="label">Title(Preferrably your name):</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className="form-control">
            <label className="label">Date of Birth:</label>
            <input
              className="input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              type="date"
            ></input>
          </div>
          <div className="form-control">
            <label className="label">Age Upto:</label>
            <input
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
            ></input>
          </div>
          <button>Generate Calendar</button>
        </div>
      </form>

      <style jsx>
        {`
          .input {
            width: 150px;
          }
          .label {
            padding-right: 16px;
          }
          .form-control {
            padding-bottom: 24px;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 90vh;
          }
        `}
      </style>
    </Theme>
  );
}
