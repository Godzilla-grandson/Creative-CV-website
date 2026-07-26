import * as THREE from "three";
import gsap from "gsap";

type StandardMesh = THREE.Mesh & { material: THREE.MeshStandardMaterial };

function recolorMesh(character: THREE.Object3D, name: string, color: string) {
  const mesh = character.getObjectByName(name) as THREE.Mesh | undefined;
  const material = mesh?.material as THREE.MeshStandardMaterial | undefined;
  if (mesh && material) {
    const cloned = material.clone();
    cloned.color.set(color);
    mesh.material = cloned;
  }
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character) return;

  recolorMesh(character, "BODYSHIRT", "#e8543c");
  recolorMesh(character, "Pant", "#1c1c22");
  recolorMesh(character, "Shoe", "#1c1c22");
  recolorMesh(character, "hair", "#2b1710");

  const tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      // "top top" here is the same physical scroll position as tl1's
      // "bottom top" on .landing-section, since the two sections sit
      // flush with no gap -- guarantees this starts exactly when tl1
      // ends, not an independent guess that could land early.
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  // Anchored to the SAME element/keyword that tl2 ends on ("bottom top"
  // of .about-section) so this can only start once tl2 has fully
  // finished -- no independent guess on a different element's position
  // that could drift out of sync.
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "bottom top",
      // Tightened from +=1700: kept enough distance for the glide to
      // still feel eased/gradual (not a snap), while cutting the overall
      // dead scroll space before Passions. Offset goes on "bottom" (the
      // trigger-side keyword, document space) not "top" (the viewport-
      // side keyword) -- a viewport is only ~900px tall, so an offset
      // that large on it collapses to a near-zero range instead of
      // actually extending anything.
      end: "bottom+=320 top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  let screenLight: StandardMesh | undefined;
  let monitor: StandardMesh | undefined;
  character.children.forEach((object) => {
    if (object.name === "Plane004") {
      object.children.forEach((child) => {
        const mesh = child as StandardMesh;
        mesh.material.transparent = true;
        mesh.material.opacity = 0;
        if (mesh.material.name === "Material.027") {
          monitor = mesh;
          mesh.material.color.set("#FFD9B8");
        }
      });
    }
    if (object.name === "screenlight") {
      const mesh = object as StandardMesh;
      mesh.material.transparent = true;
      mesh.material.opacity = 0;
      mesh.material.emissive.set("#FFB3C6");
      gsap.timeline({ repeat: -1, repeatRefresh: true }).to(mesh.material, {
        emissiveIntensity: () => Math.random() * 8,
        duration: () => Math.random() * 0.6,
        delay: () => Math.random() * 0.1,
      });
      screenLight = mesh;
    }
  });
  const neckBone = character.getObjectByName("spine005");
  if (window.innerWidth > 1024) {
    tl1
      .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
      .to(camera.position, { z: 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    tl2
      .to(
        camera.position,
        { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
        0
      )
      .to(".about-section", { y: "30%", duration: 6 }, 0)
      // Moves the box out of view under its own speed (on top of normal
      // scroll motion) so it's fully offscreen well before the monitor
      // lights up at delay:6 above -- not left to drift out at the pace
      // of ordinary document scroll, which wasn't reliably clear in time.
      .to(".about-me", { y: "-140%", duration: 3.5, ease: "power1.in" }, 0)
      .to(monitor!.material, { opacity: 1, duration: 0.8, delay: 6 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
      .to(screenLight!.material, { opacity: 1, duration: 0.8, delay: 7.3 }, 0)
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

    // Just the About box's own exit -- a fast safety-net fade tied to
    // .about-section itself, independent of the character. The character
    // stays on screen (seated at the desk from tl2) through the whole of
    // the new "What I Do" section below; its exit is tl4, anchored on
    // that section instead of this one.
    tl3.fromTo(
      ".about-me",
      { opacity: 1 },
      { opacity: 0, ease: "none", duration: 0.21 },
      0
    );

    // Character's exit, deferred until the "What I Do" section (which
    // now sits between About and Passions) has fully scrolled past --
    // keeps the seated/typing pose from tl2 visible as the backdrop for
    // that section's header + cards instead of vanishing right after
    // About.
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: "#what-i-do",
        start: "bottom top",
        end: "bottom+=320 top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl4.fromTo(
      ".character-model",
      { y: "0%", opacity: 1 },
      { y: "-100%", opacity: 0, ease: "power2.out", duration: 1 },
      0
    );
  }
}

export function setChapterReveals() {
  gsap.timeline({
    scrollTrigger: {
      trigger: "#strengths",
      start: "top 70%",
      end: "bottom top",
    },
  }).fromTo(
    ".what-box-in",
    { display: "none" },
    { display: "flex", duration: 0.1 },
    0
  );

  // PassionsTwo (a plain, un-animated section) now sits between What I Do
  // and Passions in document order, so the character's exit (tl4, still
  // anchored to "#what-i-do" bottom+320) finishes during PassionsTwo, not
  // immediately before Passions. Passions' own entrance is anchored to
  // PassionsTwo's bottom instead -- its actual, variable-height position
  // in the document -- rather than a fixed offset from What I Do, which
  // would drift out of sync with PassionsTwo's real height.
  //
  // Total range kept at the same 140px span the old "+=320 to +=460"
  // window used, with the "hold" specifically cut from 245px to 80px --
  // the hold (a static, nothing-animating pause) was the single largest
  // contributor to the perceived dead scroll space, more than the
  // handoff point itself was.
  //
  // Single-phase entrance now that this section is just the header +
  // bubble scene (no cards to stagger a second phase for): the container
  // (bubbles + "My Passions" header) fades in, full stop.
  const tlPassionsEntrance = gsap.timeline({
    scrollTrigger: {
      trigger: "#passions-2",
      start: "bottom top",
      end: "bottom+=140 top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  tlPassionsEntrance.fromTo(
    "#passions",
    { opacity: 0 },
    { opacity: 1, ease: "power1.inOut", duration: 0.57 },
    0
  );

  // Passions was fading out almost instantly on scroll, before the
  // header/cards were even fully visible for a moment -- because there
  // was no exit animation at all; Beauty (the next section, 0px behind
  // it in document flow) just started appearing underneath as soon as
  // normal scroll carried the user past it. Fixed with a GSAP pin (not
  // CSS position:sticky, which doesn't reliably track ScrollSmoother's
  // transform-based scroll) that holds Passions fully in place for a
  // genuine 300px pause (~2-3 mouse-wheel scrolls) once fully visible,
  // then fades it out in two stages -- header first, cards after --
  // instead of everything vanishing on the same frame. pin:true adds a
  // pin-spacer that pushes Beauty/everything after it later in the
  // document by the pin's scroll distance -- an unavoidable side effect
  // of creating genuine hold time, not a manual edit to Beauty itself.
  if (window.innerWidth > 1024) {
    const HOLD_PX = 300;
    const EXIT_PX = 200;
    const PIN_TOTAL_PX = 140 + HOLD_PX + EXIT_PX; // 140 = entrance duration already established above

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".passions",
          start: "top top",
          end: `+=${PIN_TOTAL_PX}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        ".passions h2",
        { opacity: 1 },
        {
          opacity: 0,
          ease: "power1.inOut",
          // No cards to stagger a second fade-out phase with anymore --
          // the header just fades out over the full exit window.
          duration: EXIT_PX / PIN_TOTAL_PX,
          // Without this, GSAP applies this tween's {opacity:1} "from"
          // value the instant it's created (page load), regardless of
          // its position in the timeline -- clobbering whatever the
          // separate entrance timeline had just set on the same element.
          immediateRender: false,
        },
        (140 + HOLD_PX) / PIN_TOTAL_PX
      );
  }
}
