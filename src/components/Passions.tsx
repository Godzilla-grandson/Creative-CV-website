import { Suspense, lazy, useState } from "react";
import { MdImage } from "react-icons/md";
import "./styles/Passions.css";

const PassionsScene = lazy(() => import("./PassionsScene"));

type Props = {
  isDesktopView: boolean;
};

type PassionCardData = {
  title: string;
  description: string;
  image: string;
};

const passionCards: PassionCardData[] = [
  {
    title: "[Passion 1]",
    description: "[Placeholder — a short description of this passion.]",
    image: "/images/placeholder.webp",
  },
  {
    title: "[Passion 2]",
    description: "[Placeholder — a short description of this passion.]",
    image: "/images/placeholder.webp",
  },
  {
    title: "[Passion 3]",
    description: "[Placeholder — a short description of this passion.]",
    image: "/images/placeholder.webp",
  },
];

const PassionCard = ({ title, description, image }: PassionCardData) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = image && !imageFailed;
  return (
    <div className="passions-card">
      <div className="passions-card-image">
        {showImage ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="passions-card-image-fallback">
            <MdImage />
          </div>
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Passions = ({ isDesktopView }: Props) => {
  return (
    <div className="passions" id="passions">
      <h2>My Passions</h2>
      {isDesktopView && (
        <Suspense fallback={null}>
          <PassionsScene />
        </Suspense>
      )}
      <div className="passions-cards">
        {passionCards.map((card) => (
          <PassionCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Passions;
