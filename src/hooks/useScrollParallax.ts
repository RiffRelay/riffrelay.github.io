import { useEffect, useRef } from "react";

export function useScrollParallax<T extends HTMLElement>(distance: number, maxTilt = 5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updatePosition = () => {
      frame = 0;
      const { top, height } = element.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - (top + height / 2)) / window.innerHeight;
      const boundedOffset = Math.max(-1, Math.min(1, offset));
      element.style.setProperty("--scroll-parallax-y", `${(boundedOffset * distance).toFixed(2)}px`);
    };
    const schedulePositionUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition);
    };
    const updateTilt = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const { left, top, width, height } = element.getBoundingClientRect();
      const pointerX = ((event.clientX - left) / Math.max(width, 1)) * 2 - 1;
      const pointerY = ((event.clientY - top) / Math.max(height, 1)) * 2 - 1;
      element.style.setProperty("--tilt-x", `${(-pointerY * maxTilt).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(pointerX * maxTilt).toFixed(2)}deg`);
    };
    const resetTilt = () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    };

    updatePosition();
    window.addEventListener("scroll", schedulePositionUpdate, { passive: true });
    window.addEventListener("resize", schedulePositionUpdate);
    element.addEventListener("pointermove", updateTilt);
    element.addEventListener("pointerleave", resetTilt);
    return () => {
      window.removeEventListener("scroll", schedulePositionUpdate);
      window.removeEventListener("resize", schedulePositionUpdate);
      element.removeEventListener("pointermove", updateTilt);
      element.removeEventListener("pointerleave", resetTilt);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [distance, maxTilt]);

  return ref;
}
