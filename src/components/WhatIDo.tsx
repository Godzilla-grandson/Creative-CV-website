import "./styles/WhatIDo.css";

type WhatIDoCardData = {
  title: string;
  description: string;
};

const cards: WhatIDoCardData[] = [
  {
    title: "Work Experience",
    description:
      "I spent two years managing knowledge for millions of sneakers that Entrupy's AI models authenticate. I also built and led a sports club there, running nine events across twelve months for sixty people on a shoestring budget, because I believe any organisation without sporting engagements is missing something essential.",
  },
  {
    title: "Education",
    description:
      "I studied fashion design at NIFT Jodhpur with a specialisation in luxury & couture. Currently, I'm at MDI Gurgaon, figuring out how design thinking and business strategy can occupy the same sentence without fighting each other.",
  },
];

const WhatIDo = () => {
  return (
    <div className="whatido-section" id="what-i-do">
      <div className="whatido-header">
        <h2>
          MORE
          <br />
          ABOUT <span className="accent">ME</span>
        </h2>
      </div>
      <div className="whatido-cards">
        <div className="whatido-corner-tl"></div>
        <div className="whatido-corner-tr"></div>
        <div className="whatido-corner-bl"></div>
        <div className="whatido-corner-br"></div>
        {cards.map((card, index) => (
          <div className="whatido-card" key={card.title}>
            {index > 0 && <div className="whatido-divider"></div>}
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
