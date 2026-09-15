import SpinningBorderButton from "./spinning-border-button";

export function ArrowFillButton({ href = "/resume.pdf" }: { href?: string }) {
  return <SpinningBorderButton className="resume-button" href={href} download="Mukul-Rai-Resume.pdf" aria-label="Download Mukul Rai resume" />;
}
