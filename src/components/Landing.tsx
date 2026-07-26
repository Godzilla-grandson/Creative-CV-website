import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="hero">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hi L'Oréal</h2>
            <h1>
              HERE'S MY PITCH
            </h1>
          </div>
          <div className="landing-info">
            <h3>I'm Hrishit, a</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Designer</div>
              <div className="landing-h2-2">Learner</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Learner</div>
              <div className="landing-h2-info-1">Designer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
