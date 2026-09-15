import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { PortfolioHero } from "./components/ui/portfolio-hero";
import { GooeyCounter } from "./components/ui/gooey-counter";

function App() {
  const [loading, setLoading] = useState(true);
  return <>{loading && <GooeyCounter onComplete={() => setLoading(false)} />}<PortfolioHero /></>;
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
