import { motionValue, springValue } from "motion";

/**
 * Desktop-only cursor tracking for the mascot, loaded lazily after idle.
 * Spring physics from Motion; writes transforms directly (no React re-renders).
 * Pauses while the mascot is offscreen or the tab is hidden.
 */
export function startApeTracking(
  svg: SVGSVGElement,
  look: SVGGElement,
  eyes: SVGGElement,
): () => void {
  const targetX = motionValue(0);
  const targetY = motionValue(0);
  const spring = { stiffness: 120, damping: 16, mass: 0.7 };
  const x = springValue(targetX, spring);
  const y = springValue(targetY, spring);

  let center = { x: 0, y: 0 };
  const measure = () => {
    const r = svg.getBoundingClientRect();
    center = { x: r.left + r.width / 2, y: r.top + r.height * 0.6 };
  };
  measure();

  let frame = 0;
  const render = () => {
    frame = 0;
    const vx = x.get();
    const vy = y.get();
    // Head turns up to ~6deg and shifts slightly; eyes travel a little further.
    look.style.transform = `translate(${vx * 6}px, ${vy * 3}px) rotate(${vx * 6}deg)`;
    eyes.style.transform = `translate(${vx * 6}px, ${vy * 5}px)`;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  const unsubscribe = [x.on("change", schedule), y.on("change", schedule)];

  const clamp = (v: number) => Math.max(-1, Math.min(1, v));
  const onMove = (e: PointerEvent) => {
    targetX.set(clamp((e.clientX - center.x) / (window.innerWidth / 2)));
    targetY.set(clamp((e.clientY - center.y) / (window.innerHeight / 2)));
  };
  const onLeave = () => {
    targetX.set(0);
    targetY.set(0);
  };

  let listening = false;
  const listen = (on: boolean) => {
    if (on === listening) return;
    listening = on;
    if (on) {
      measure();
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", measure, { passive: true });
      window.addEventListener("resize", measure);
    } else {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      onLeave();
    }
  };

  let visible = true;
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    listen(visible && !document.hidden);
  });
  io.observe(svg);
  const onVisibility = () => listen(visible && !document.hidden);
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    listen(false);
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    unsubscribe.forEach((u) => u());
    if (frame) cancelAnimationFrame(frame);
    x.destroy();
    y.destroy();
    look.style.transform = "";
    eyes.style.transform = "";
  };
}
