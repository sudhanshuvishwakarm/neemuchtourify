// components/layout/SmoothScroll.jsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Expose on window so Project.jsx (and any other section) can:
    //   window.__lenis.on('scroll', callback)   ← fires every RAF tick
    //   window.__lenis.scroll                   ← current smooth scroll position
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return <>{children}</>;
}

// // components/layout/SmoothScroll.jsx
// "use client";

// import { useEffect } from "react";
// import Lenis from "lenis";

// export default function SmoothScroll({ children }) {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,          // scroll duration multiplier — 1.2 feels premium
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
//       smoothWheel: true,
//       wheelMultiplier: 1,
//       touchMultiplier: 1.5,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);

//   return <>{children}</>;
// }