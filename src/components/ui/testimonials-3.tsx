import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Quote } from "lucide-react";

type Testimonial = { quote: string; name: string; role: string; company: string; image: string };

const testimonials: Testimonial[] = [
  { quote: "We just acquired Efferd for 3 gazillion dollars. We're calling it iEfferd. It's our best product yet.", image: "https://unavatar.io/x/tim_cook", name: "Tim Cook", role: "CEO", company: "Apple" },
  { quote: "I'm considering shipping Efferd components with Prime delivery. 2-day shipping on beautiful UIs? Done.", image: "https://unavatar.io/x/JeffBezos", name: "Jeff Bezos", role: "Founder", company: "Amazon" },
  { quote: "We're rewriting OpenAI's entire frontend in Efferd. The AGI told us it's the only logical choice.", image: "https://unavatar.io/x/sama", name: "Sam Altman", role: "CEO", company: "OpenAI" },
];

function TestimonialCard({ testimonial, index, progress, reduced }: { testimonial: Testimonial; index: number; progress: any; reduced: boolean }) {
  const fadeInStart = [0, .12, .45][index];
  const fadeInEnd = index === 0 ? .1 : fadeInStart + .18;
  const opacity = index === 0
    ? useTransform(progress, [0, .1, .26], [1, 1, 1])
    : useTransform(progress, [fadeInStart, fadeInEnd, Math.min(1, fadeInEnd + .18)], [0, 1, 1]);
  const x = useTransform(progress, [fadeInStart, fadeInEnd], [reduced || index === 0 ? 0 : -90, 0]);
  const y = useTransform(progress, [fadeInStart, fadeInEnd], [reduced ? 0 : 35, 0]);
  const scale = useTransform(progress, [fadeInStart, fadeInEnd], [reduced ? 1 : .96, 1]);

  return <motion.figure className={`testimonial-card testimonial-card-${index + 1}`} style={{ opacity, x, y, scale }}>
    <div className="testimonial-card-line" /><Quote className="testimonial-quote-icon" aria-hidden="true" />
    <blockquote>{testimonial.quote}</blockquote>
    <figcaption><img src={testimonial.image} alt={`${testimonial.name}'s profile`} /><span><strong>{testimonial.name}</strong><small>{testimonial.role}, {testimonial.company}</small></span></figcaption>
  </motion.figure>;
}

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: .55 });
  const [current, setCurrent] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (value) => setCurrent(Math.min(3, Math.floor(value * 3) + 1)));

  return <section ref={ref} id="testimonials" className="testimonials-section" aria-label="Testimonials">
    <div className="testimonials-sticky">
      <div className="testimonials-heading"><span>TESTIMONIALS</span><h2>Good work leaves<br /><em>an impression.</em></h2></div>
      <div className="testimonial-stage">
        {testimonials.map((testimonial, index) => <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} progress={progress} reduced={Boolean(reduced)} />)}
      </div>
      <div className="testimonial-progress" aria-hidden="true"><span>0{current}</span><i /><span>03</span></div>
      <div className="testimonial-scroll-hint">SCROLL <span>↓</span></div>
    </div>
  </section>;
}

export default TestimonialsSection;
