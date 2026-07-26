import "./styles/DesignPortfolio.css";
import PortfolioImage from "./PortfolioImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Project {
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  link?: string;
}

// Thumbnail is a placeholder — swap `thumbnail` with a real image path per project.
const projects: Project[] = [
  {
    title: "Project One",
    category: "[Category — e.g. Web Design]",
    description: "[Placeholder — short description of the project]",
    thumbnail: "/images/placeholder.webp",
  },
  {
    title: "Project Two",
    category: "[Category — e.g. Brand Identity]",
    description: "[Placeholder — short description of the project]",
    thumbnail: "/images/placeholder.webp",
  },
  {
    title: "Project Three",
    category: "[Category — e.g. UI/UX]",
    description: "[Placeholder — short description of the project]",
    thumbnail: "/images/placeholder.webp",
  },
  {
    title: "Project Four",
    category: "[Category — e.g. Motion]",
    description: "[Placeholder — short description of the project]",
    thumbnail: "/images/placeholder.webp",
  },
];

const DesignPortfolio = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("portfolio-box");
      const rectLeft = document
        .querySelector(".portfolio-container")!
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
        trigger: ".portfolio-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "portfolio",
      },
    });

    timeline.to(".portfolio-flex", {
      x: -translateX,
      ease: "none",
    });
  }, []);

  return (
    <div className="portfolio-section" id="portfolio">
      <div className="portfolio-container section-container">
        <h2>
          Design <span>Portfolio</span>
        </h2>
        <div className="portfolio-flex">
          {projects.map((project, index) => (
            <div className="portfolio-box" key={project.title}>
              <div className="portfolio-info">
                <div className="portfolio-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>About</h4>
                <p>{project.description}</p>
              </div>
              <PortfolioImage
                image={project.thumbnail}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignPortfolio;
