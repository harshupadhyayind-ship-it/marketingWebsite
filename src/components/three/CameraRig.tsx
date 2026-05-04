"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Hero → About
    tl.to(camera.position, { z: -17, y: 1.5, x: 0, duration: 1, ease: "none" }, 0)
      // About → Services
      .to(camera.position, { z: -42, y: -0.5, x: 0.5, duration: 1, ease: "none" }, 1)
      // Services → Work
      .to(camera.position, { z: -67, y: 0.5, x: -0.5, duration: 1, ease: "none" }, 2)
      // Work → Contact
      .to(camera.position, { z: -92, y: 0, x: 0, duration: 1, ease: "none" }, 3);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [camera]);

  return null;
}
