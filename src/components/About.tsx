import { useEffect, useState } from "react";
import "./styles/About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero") as HTMLElement;
      if (hero) {
        const heroBottom = hero.offsetHeight;
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        setIsVisible(scrollY > heroBottom * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`about-section ${isVisible ? "visible" : "hidden"}`} id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          An award-winning designer by discipline. A Knowledge Analyst by experience. An MBA student by choice
          <br />
          <br />
          I play badminton, run, and passionately follow cricket. I practice daily breathing meditation too; I believe staying physically and mentally fit isn't a privilege, it's a responsibility. If my mother were to describe me in a line, she’d say that I lead with empathy in everything I set out to do.
          <br />
          <br />
          Scroll through to know more about me...
        </p>
      </div>
    </div>
  );
};

export default About;
