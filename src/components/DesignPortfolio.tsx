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
    title: "Menace of Counterfeits in e-commerce ecosystem",
    category: "Research report",
    description: "Documenting the rise of counterfeit products in e-commerce ecosystem",
    thumbnail: "/images/menace.png",
    link: "https://medium.com/@juicydrops99/the-rising-menace-of-counterfeits-in-e-commerce-ecosystem-293d663070dd",
  },
  {
    title: "The Christmas Truce",
    category: "A mini collection of 3 garments",
    description: "A conceptualised collection based on Trench warfare",
    thumbnail: "/images/christmas truce.png",
    link: "https://www.behance.net/gallery/183783355/The-Christmas-Truce-(A-mini-collection)",
  },
  {
    title: "A blissful retribution",
    category: "A fashion ensemble",
    description: "A custom puffer blouse and skirt documented through creative direction",
    thumbnail: "/images/blissfull retribution.png",
    link: "https://www.behance.net/gallery/167904613/A-blissful-retribution-(an-ensemble)",
  },
  {
    title: "Smuggling candies into a theatre, fashionably",
    category: "A conceptual collection",
    description: "A concept created based on a hypothetical scenario",
    thumbnail: "/images/candies.png",
    link: "https://www.behance.net/gallery/196445709/Ways-to-smuggle-a-candy-inside-a-club-or-a-theatre",
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
