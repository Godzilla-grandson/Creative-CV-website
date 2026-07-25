import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const chapters = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "passions", label: "Passions" },
  { id: "beauty", label: "Beauty" },
  { id: "work", label: "Brand" },
  { id: "strengths", label: "Strengths" },
  { id: "contact", label: "Contact" },
];

// Scroll a chapter to the top of the viewport.
// Both smoother.scrollTo(selector) and smoother.scrollTo(number) land off
// target here (the latter by a full viewport), so set the native scroll
// position directly -- ScrollSmoother still eases the content to it, so the
// transition stays smooth. .pin-spacer is used where GSAP pinned a section,
// since that wrapper is what occupies the document flow.
function scrollToChapter(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  const flow = (el.closest(".pin-spacer") as HTMLElement) || (el as HTMLElement);
  window.scrollTo(0, flow.offsetTop);
}

const Navbar = () => {
  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".chapter-nav a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          if (section) {
            scrollToChapter(section);
          }
        }
      });
    });

    chapters.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self: ScrollTrigger) => {
          const link = document.querySelector(`a[data-href="#${id}"]`);
          link?.parentElement?.classList.toggle("active", self.isActive);
        },
      });
    });

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <a
          href="#hero"
          className="navbar-title"
          data-cursor="disable"
          onClick={(e) => {
            if (window.innerWidth > 1024) {
              e.preventDefault();
              scrollToChapter("#hero");
            }
          }}
        >
          Hrishit Sethia
        </a>
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          example@mail.com
        </a>
      </div>

      <nav className="chapter-nav" data-cursor="disable">
        <ul>
          {chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <a data-href={`#${chapter.id}`} href={`#${chapter.id}`}>
                <span className="chapter-dot"></span>
                <span className="chapter-label">
                  {String(index + 1).padStart(2, "0")} — {chapter.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
