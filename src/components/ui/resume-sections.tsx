import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";

const projectImages = ["https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread/img8.png", "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread/img7.png", "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread/img6.png", "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread/img5.png", "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread/img4.png", "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread/img3.png"];
const projects = [
  ["WBL", "World Bowling League", "A competition platform redefining the future of bowling.", projectImages[0]],
  ["TMS", "Tournament Management System", "Operations and global publishing for bowling tournaments.", projectImages[1]],
  ["PLAY APP", "Bowler participation dashboard", "A focused dashboard for participation and streaming.", projectImages[2]],
  ["TBR", "Team Blue Rising", "A racing experience for an E1 series team.", projectImages[3]],
  ["AFK ELEPHANTS", "Gamified NFT platform", "A web3 product built around deflationary mechanics.", projectImages[4]],
  ["RIZELY", "Lead generation platform", "End-to-end dashboard and landing page design.", projectImages[5]],
];

const experience = [
  { dates: "MAR 2025 - PRESENT", location: "BANGALORE · ONSITE", title: "Senior UI/UX Designer", company: "Basik Marketing", detail: "Designing thoughtful brand, web, and digital experiences for ambitious businesses." },
  { dates: "APR 2023 - MAR 2025", location: "REMOTE", title: "UI/UX Designer", company: "LeagueSportsCo", detail: "Designed and prototyped a diverse portfolio of esports, sports, Web3, and technology products." },
  { dates: "APR 2022 - MAY 2023", location: "REMOTE", title: "Graphic & UI/UX Designer", company: "Zone", detail: "Created experiences for a global gaming platform with competitive, high-energy products." },
  { dates: "2022", location: "GURGAON", title: "Freelancing", company: "Independent", detail: "Designed dashboards, landing pages, and product identities for growing teams." },
];

function Reveal({ children, className = "", ...props }: { children: ReactNode; className?: string } & ComponentProps<typeof motion.div>) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} {...props}>{children}</motion.div>;
}

function ProjectRow({ project, index }: { project: string[]; index: number }) {
  const [tag, name, detail, image] = project;
  const [active, setActive] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 24, mass: .4 });
  const y = useSpring(rawY, { stiffness: 180, damping: 24, mass: .4 });
  return <Reveal className="project-index-row" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} onMouseMove={(event: MouseEvent<HTMLDivElement>) => { rawX.set(event.clientX); rawY.set(event.clientY); }}><span>0{index + 1}</span><strong>{tag}</strong><h3>{name}</h3><p>{detail}</p><ArrowUpRight /><motion.img className="project-hover-image" src={image} alt="" aria-hidden="true" style={{ x, y, opacity: active ? 1 : 0, scale: active ? 1 : .72 }} /></Reveal>;
}

export function ResumeSections() {
  return <>
    <section id="experience" className="resume-section experience-section">
      <div className="resume-section-inner">
        <Reveal className="resume-intro"><span className="section-kicker">EXPERIENCE</span><h2>Work that moves<br /><em>people forward.</em></h2><p>UI/UX design, product thinking, and visual systems for ambitious digital teams.</p></Reveal>
        <div className="experience-list">{experience.map((item, index) => <Reveal className="experience-row" key={item.company}><span className="experience-index">0{index + 1}</span><span className="experience-dates">{item.dates}<small>{item.location}</small></span><div><h3>{item.title}</h3><strong>{item.company}</strong><p>{item.detail}</p></div></Reveal>)}</div>
      </div>
    </section>

    <section id="project-list" className="resume-section project-index-section">
      <div className="resume-section-inner"><Reveal className="resume-intro"><span className="section-kicker">SELECTED WORK</span><h2>Built with<br /><em>intent.</em></h2></Reveal><div className="project-index">{projects.map((project, index) => <ProjectRow project={project} index={index} key={project[0]} />)}</div></div>
    </section>

    <section className="resume-section skills-section"><div className="resume-section-inner skills-grid"><Reveal><span className="section-kicker">SKILLS & TOOLS</span><h2>Design meets<br /><em>development.</em></h2></Reveal><Reveal className="skill-copy"><h3>Design & development skills</h3><p>Interaction Design, User Experience Design, Wireframing, Prototyping, Collaboration, Communication, Responsive Website & Application Design, Mockups, Visual Design, HTML, CSS, SCSS.</p><h3>Tools</h3><p>Figma, Adobe Creative Suite, Photoshop, Illustrator, Sketch, Framer X, Proto.io, VS Code.</p></Reveal></div></section>

    <section className="resume-section education-section"><div className="resume-section-inner education-grid"><Reveal><span className="section-kicker">EDUCATION</span><h2>Always<br /><em>learning.</em></h2></Reveal><Reveal className="education-card"><span>2021 - 2024</span><div><h3>BCA in Artificial Intelligence & Machine Learning</h3><p>SGT University · Gurgaon</p></div></Reveal></div></section>

    <footer id="contact" className="site-footer"><div className="footer-inner"><Reveal><span className="section-kicker">CONTACT</span><h2>Have a good<br /><em>idea?</em></h2></Reveal><div className="footer-contact"><a href="mailto:mukulrai0228@gmail.com"><Mail />mukulrai0228@gmail.com</a><a href="tel:+91920202397"><Phone />+91 8920202397</a><span><MapPin />Gurgaon, Haryana</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MUKUL RAI</span><div><a href="https://www.behance.net/mukulrai1" target="_blank" rel="noreferrer">BEHANCE <ArrowUpRight /></a><a href="https://www.figma.com/@memukul" target="_blank" rel="noreferrer">FIGMA <ArrowUpRight /></a></div><a href="#home" className="back-top">BACK TO TOP ↑</a></div></div></footer>
  </>;
}

export default ResumeSections;
