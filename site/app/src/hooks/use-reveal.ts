import { useEffect, useRef, useState } from "react";

/**
 * Reports when an element first reaches the middle of the viewport, and then
 * stays true. The latch matters: a reveal that flips back off leaves content
 * invisible whenever it sits just outside the viewport, which reads as
 * missing rather than as animation.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { inView, ref };
}
