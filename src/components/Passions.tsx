import { Suspense, lazy } from "react";
import "./styles/Passions.css";

const PassionsScene = lazy(() => import("./PassionsScene"));

type Props = {
  isDesktopView: boolean;
};

const placeholderPassions = ["[Passion 1]", "[Passion 2]", "[Passion 3]"];

const Passions = ({ isDesktopView }: Props) => {
  return (
    <div className="passions" id="passions">
      <h2>My Passions</h2>
      {isDesktopView ? (
        <Suspense fallback={null}>
          <PassionsScene />
        </Suspense>
      ) : (
        <div className="passions-mobile">
          {placeholderPassions.map((passion) => (
            <div className="passions-mobile-tile" key={passion}>
              {passion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Passions;
