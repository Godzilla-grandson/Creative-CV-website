import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import Beauty from "./Beauty";
import BrandSpotlight from "./BrandSpotlight";
import Contact from "./Contact";
import Cursor from "./Cursor";
import DesignPortfolio from "./DesignPortfolio";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Passions from "./Passions";
import PassionsTwo from "./PassionsTwo";
import SocialIcons from "./SocialIcons";
import StrengthsWeaknesses from "./StrengthsWeaknesses";
import WhatIDo from "./WhatIDo";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <PassionsTwo />
            <Passions isDesktopView={isDesktopView} />
            <Beauty />
            <BrandSpotlight />
            <StrengthsWeaknesses />
            <DesignPortfolio />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
