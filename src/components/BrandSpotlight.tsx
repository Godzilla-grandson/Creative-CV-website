import "./styles/BrandSpotlight.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const brandMoments = [
  { title: "Why Diesel", note: "[Placeholder — reason #1]" },
  { title: "A Campaign I Love", note: "[Placeholder — reason #2]" },
  { title: "What It Says About Me", note: "[Placeholder — reason #3]" },
];

const BrandSpotlight = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          The Brand I Relate To <span>Most</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>DIESEL</h3>
                <div>
                  <h4>L'Oréal Luxe</h4>
                  <p>Fragrance</p>
                </div>
              </div>
              <h4>Why it resonates</h4>
              <p>[Placeholder — why Diesel, in your own words]</p>
            </div>
            <WorkImage image="/images/placeholder.webp" alt="Diesel" />
          </div>
          {brandMoments.map((moment, index) => (
            <div className="work-box" key={moment.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{moment.title}</h4>
                    <p>Diesel</p>
                  </div>
                </div>
                <h4>Note</h4>
                <p>{moment.note}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="Diesel" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSpotlight;
