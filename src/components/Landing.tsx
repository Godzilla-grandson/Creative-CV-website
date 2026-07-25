import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="hero">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>My Creative CV for</h2>
            <h1>
              L'ORÉAL
              <br />
              <span>INTERNSHIP</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Hi, I'm Hrishit — a</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Dreamer</div>
              <div className="landing-h2-2">Doer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Doer</div>
              <div className="landing-h2-info-1">Dreamer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
