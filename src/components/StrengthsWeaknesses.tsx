import { useEffect, useRef } from "react";
import "./styles/StrengthsWeaknesses.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const StrengthsWeaknesses = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO" id="strengths">
      <div className="what-box">
        <h2 className="title">
          MY S<span className="hat-h2">TRENGTHS</span>
          <div>
            &<span className="do-h2"> WEAKNESSES</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>STRENGTHS</h3>
              <div className="what-content-flex">
                <div className="what-tags">Empathy</div>
                <div className="what-tags">Composure</div>
                <div className="what-tags">Attention to Detail</div>
              </div>
              <p>
                Design taught me empathy first, every brief starts with a pain point, not a solution. Meditation built composure, training the part of my mind that used to react to deadlines and last-minute changes. And attention to detail comes from authenticating sneakers, where one missed stitch separated real from fake, and from product design, where the smallest detail separates functional from exceptional. Together they've left me with a low tolerance for "good enough."
              </p>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>WEAKNESSES</h3>
              <div className="what-content-flex">
                <div className="what-tags">Time Estimation</div>
                <div className="what-tags">The Comfort of a Lead</div>
              </div>
              <p>
                I underestimate how long things take, planning for ideal execution instead of the real one, and deadlines pay for that optimism. I'm working on building in buffer, not just better intentions. I also ease off when I'm winning, the intensity that got me there fades until I've talked myself into being done, and it's cost me finishes I should have controlled. I'm learning to treat a lead as the starting line, not the finish.
              </p>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
