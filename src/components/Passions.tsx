import { Suspense, lazy } from "react";
import "./styles/Passions.css";

const PassionsScene = lazy(() => import("./PassionsScene"));

type Props = {
  isDesktopView: boolean;
};

const Passions = ({ isDesktopView }: Props) => {
  return (
    <div className="passions" id="passions">
      <h2>No agenda here, just bubbles</h2>
      {isDesktopView && (
        <Suspense fallback={null}>
          <PassionsScene />
        </Suspense>
      )}
    </div>
  );
};

export default Passions;
