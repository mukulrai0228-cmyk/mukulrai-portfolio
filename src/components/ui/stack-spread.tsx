import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const IMG_BASE = "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread";
const images = [[`${IMG_BASE}/img8.png`, "Colour stripes"], [`${IMG_BASE}/img7.png`, "Wildflower meadow"], [`${IMG_BASE}/img6.png`, "Figure in a leather jacket"], [`${IMG_BASE}/img5.png`, "Footballer mid-kick"], [`${IMG_BASE}/img4.png`, "Terrier in profile"], [`${IMG_BASE}/img3.png`, "Breakdancer holding a pose"], [`${IMG_BASE}/img2.png`, "Renaissance fresco detail"], [`${IMG_BASE}/img1.png`, "Vintage fighter plane"]];
const positions = [[-20,-34,0,17,22],[32,-30,0,18,32],[-36,-2,0,15,32],[6,-32,0,25,30],[37,6,0,18,32],[-24,34,0,22,25],[2,36,0,20,26],[30,34,0,16,20]];

function Card({ index, progress, reduced, pointer, total, small }: { index: number; progress: any; reduced: boolean; pointer: { x: any; y: any }; total: number; small: boolean }) {
  const [x0, y0, rotation, width, height] = positions[index];
  const mobileX = [-27, 0, 27, -36, 36, -27, 0, 27][index];
  const mobileY = [-34, -34, -34, 3, 3, 28, 28, 28][index];
  const x = useTransform(progress, [0, 1], [index % 2 ? 2 : -2, small ? mobileX : x0]);
  const y = useTransform(progress, [0, 1], [index * .9 - 3, small ? mobileY : y0]);
  const depth = .55 + (index / Math.max(1, total - 1)) * .75;
  const xCss = useTransform([x, pointer.x, progress], ([value, cursor, p]: number[]) => `calc(-50% + ${value - (reduced ? 0 : cursor * 2.6 * depth * p)}vw)`);
  const yCss = useTransform([y, pointer.y, progress], ([value, cursor, p]: number[]) => `calc(-50% + ${value - (reduced ? 0 : cursor * 2.2 * depth * p)}vh)`);
  const rotate = useTransform(progress, [0, 1], [index % 2 ? 5 : -4, reduced ? 0 : rotation]);
  const scale = useTransform(progress, [0, 1], [.82, 1]);
  const size = small ? .62 : 1;
  return <motion.div className="spread-card" style={{ width: `${width * size}vw`, height: `${height * size}vh`, x: xCss, y: yCss, rotate, scale, zIndex: index + 1 }}><img src={images[index][0]} alt={images[index][1]} /></motion.div>;
}

function MobileSpread() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(useTransform(scrollYProgress, [0, .12, .72, 1], [0, 0, 1, 1]), { stiffness: 100, damping: 24, mass: .55 });
  const collapsed = [[0, 276, -8], [168, 162, -14], [-109, 160, 10], [180, -33, -10], [-179, -35, 12], [119, -241, -8], [-119, -253, 10], [0, -408, 4]];

  return <section ref={ref} id="projects-mobile" className="mobile-spread" aria-label="Selected design work">
    <div className="mobile-spread-sticky">
      {images.map(([src, alt], index) => {
        const [startX, startY, startRotate] = collapsed[index];
        const x = useTransform(progress, [0, 1], [reduced ? 0 : startX, 0]);
        const y = useTransform(progress, [0, 1], [reduced ? 0 : startY, 0]);
        const rotate = useTransform(progress, [0, 1], [reduced ? 0 : startRotate, 0]);
        const scale = useTransform(progress, [0, 1], [reduced ? 1 : .58, 1]);
        return <motion.img key={src} className={`mobile-card mobile-card-${index + 1}`} src={src} alt={alt} style={{ x, y, rotate, scale, zIndex: index + 1 }} />;
      })}
      <motion.div className="mobile-spread-copy" style={{ opacity: useTransform(progress, [0, .38, .68], [0, 0, 1]) }}><h2>Interfaces <span>That<br />Feel Right.</span></h2><p>Thoughtful UI/UX design for digital products, people, and the moments between.</p></motion.div>
      <motion.div className="mobile-scroll-label" style={{ opacity: useTransform(progress, [0, .12, .7], [1, 1, 0]) }}>SCROLL</motion.div>
    </div>
  </section>;
}

export function StackSpread() {
  const ref = useRef<HTMLDivElement>(null); const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(useTransform(scrollYProgress, [0, .12, .86, 1], [0, 0, 1, 1]), { stiffness: 90, damping: 24, mass: .6 });
  const opacity = 1; const hintOpacity = useTransform(scrollYProgress, [0, .12], [1, 0]);
  const [touch, setTouch] = useState(false); const rawX = useMotionValue(0); const rawY = useMotionValue(0); const pointer = { x: useSpring(rawX, { stiffness: 90, damping: 22, mass: .6 }), y: useSpring(rawY, { stiffness: 90, damping: 22, mass: .6 }) };
  useEffect(() => { const mq = matchMedia("(pointer: coarse)"); const read = () => setTouch(mq.matches); read(); mq.addEventListener("change", read); return () => mq.removeEventListener("change", read); }, []);
  useEffect(() => { if (touch || reduced) return; const move = (event: PointerEvent) => { rawX.set(event.clientX / innerWidth * 2 - 1); rawY.set(event.clientY / innerHeight * 2 - 1); }; const leave = () => { rawX.set(0); rawY.set(0); }; addEventListener("pointermove", move, { passive: true }); addEventListener("pointerleave", leave); return () => { removeEventListener("pointermove", move); removeEventListener("pointerleave", leave); }; }, [touch, reduced, rawX, rawY]);
  return <><section ref={ref} id="projects" className="spread-section"><div className="spread-sticky"><motion.div className="spread-copy" style={{ opacity }}><h2>Interfaces <span>That Feel Right.</span></h2><p>Thoughtful UI/UX design for digital products, people, and the moments between.</p></motion.div><div className="spread-cards">{images.map((_, index) => <Card key={index} index={index} total={images.length} progress={progress} pointer={pointer} small={touch} reduced={Boolean(reduced || touch)} />)}</div><motion.div className="spread-hint" style={{ opacity: hintOpacity }}>SCROLL <span>↓</span></motion.div></div></section><MobileSpread /></>;
}
