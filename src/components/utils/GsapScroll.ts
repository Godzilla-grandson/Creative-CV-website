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
      .to(monitor!.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
      .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
      .to(screenLight!.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
      .fromTo(
        ".character-rim",
        { opacity: 1, scaleX: 1.4 },
        { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
        0.3
      );

    // Still one shared timeline/trigger (not two independent scroll
    // systems) -- but staggered into non-overlapping segments: the About
    // box fully finishes its exit (0 -> 0.3) before the character starts
    // moving at all (0.3 -> 1). The character's own segment now gets most
    // of tl3's widened range, with easing and a paired opacity fade
    // (instead of a fast, linear, position-only move) so it glides out
    // rather than snapping.
    tl3
      .fromTo(
        ".about-me",
        { opacity: 1 },
        { opacity: 0, ease: "none", duration: 0.21 },
        0
      )
      .fromTo(
        ".character-model",
        { y: "0%", opacity: 1 },
        { y: "-100%", opacity: 0, ease: "power2.out", duration: 0.79 },
        0.21
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

  // Anchored to the exact same point tl3 (in setCharTimeline) ends on --
  // ".about-section" "bottom+=800 top" -- zero explicit buffer, so this
  // starts the instant the character's exit finishes. Not an independent
  // guess based on Passions' own position, which could end up starting
  // before the character's exit completes.
  //
  // Total range cut from 700px to 350px, with the "hold" specifically
  // cut from 245px to 80px -- the hold (a static, nothing-animating
  // pause) was the single largest contributor to the perceived dead
  // scroll space, more than the handoff point itself was.
  //
  // One timeline, three non-overlapping phases (same trigger, staggered
  // positions -- not three independent scroll systems):
  //   1. container (bubbles + "My Passions" header) fades in
  //   2. a short hold -- header stays visible, nothing animates
  //   3. the 3 cards fade in afterward, once the header's had its moment
  const tlPassionsEntrance = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "bottom+=320 top",
      end: "bottom+=460 top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  tlPassionsEntrance
    // duration extended from 0.34 to 0.57 (48px -> 80px of actual scroll):
    // at 0.34 this fade was so short it read as an instant snap rather
    // than a visible fade, unlike the ~100px exit fades. Runs right up to
    // where the cards tween below picks up, so the previous silent gap
    // between "container visible" and "cards start" is now an active,
    // visible fade instead -- cards' own start/duration are unchanged.
    .fromTo("#passions", { opacity: 0 }, { opacity: 1, ease: "power1.inOut", duration: 0.57 }, 0)
    .fromTo(
      ".passions-cards",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, ease: "power1.inOut", duration: 0.43 },
      0.57
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
          duration: EXIT_PX / 2 / PIN_TOTAL_PX,
          // Without this, GSAP applies this tween's {opacity:1} "from"
          // value the instant it's created (page load), regardless of
          // its position in the timeline -- clobbering whatever the
          // separate entrance timeline had just set on the same element.
          immediateRender: false,
        },
        (140 + HOLD_PX) / PIN_TOTAL_PX
      )
      .fromTo(
        ".passions-cards",
        { opacity: 1 },
        {
          opacity: 0,
          ease: "power1.inOut",
          duration: EXIT_PX / 2 / PIN_TOTAL_PX,
          immediateRender: false,
        },
        (140 + HOLD_PX + EXIT_PX / 2) / PIN_TOTAL_PX
      );
  }
}
