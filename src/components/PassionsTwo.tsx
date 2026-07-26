import { useState } from "react";
import { MdImage } from "react-icons/md";
import "./styles/PassionsTwo.css";

type PassionCardData = {
  title: string;
  description: string;
  image: string;
};

const passionCards: PassionCardData[] = [
  {
    title: "Badminton",
    description: "The only time nothing exists in my head except how to beat my opponent. The game brings out my most competitive, most aggressive character.",
    image: "/images/Badminton.jpeg",
  },
  {
    title: "Garba",
    description: "Inter-branch garba champion in school. Being a Gujarati at heart, garba is all I've known and loved as a form of dance since childhood.",
    image: "/images/garba.jpg",
  },
  {
    title: "Meditation",
    description: "Reluctant to start, but consistent practice pulled me into a zone I'd never experienced before. It's been over four years since I began practicing breathing meditation daily.",
    image: "/images/meditation-comp.jpeg",
  },
];

const PassionCard = ({ title, description, image }: PassionCardData) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = image && !imageFailed;
  return (
    <div className="passions-two-card">
      <div className="passions-two-card-image">
        {showImage ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="passions-two-card-image-fallback">
            <MdImage />
          </div>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const PassionsTwo = () => {
  return (
    <div className="passions-two" id="passions-2">
      <h2>My Passions</h2>
      <div className="passions-two-cards">
        {passionCards.map((card) => (
          <PassionCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default PassionsTwo;
