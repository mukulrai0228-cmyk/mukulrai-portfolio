import { useEffect, useRef } from "react";

type Cell = { r: number; c: number };
const DIGITS: Record<string, string[]> = {
  "0": ["01110", "11011", "11011", "11011", "11011", "11011", "01110"],
  "1": ["00110", "01110", "00110", "00110", "00110", "00110", "01111"],
  "2": ["01110", "11011", "00011", "00110", "01100", "11000", "11111"],
  "3": ["11110", "00011", "00011", "01110", "00011", "00011", "11110"],
  "4": ["00110", "01110", "11010", "11010", "11111", "00010", "00010"],
  "5": ["11111", "11000", "11000", "11110", "00011", "00011", "11110"],
  "6": ["01110", "11000", "11000", "11110", "11011", "11011", "01110"],
  "7": ["11111", "00011", "00110", "00110", "01100", "01100", "01100"],
  "8": ["01110", "11011", "11011", "01110", "11011", "11011", "01110"],
  "9": ["01110", "11011", "11011", "01111", "00011", "00110", "01100"],
};

const randomCells = (count: number, rows: number, cols: number): Cell[] => {
  const cells = Array.from({ length: rows * cols }, (_, i) => ({ r: Math.floor(i / cols), c: i % cols }));
  return cells.sort(() => Math.random() - 0.5).slice(0, count);
};

function numberCells(value: number, rows: number, cols: number): Cell[] {
  const chars = String(value).split("");
  const width = chars.length * 5 + (chars.length - 1) * 2;
  const left = Math.floor((cols - width) / 2);
  const top = Math.floor((rows - 7) / 2);
  return chars.flatMap((char, digitIndex) => {
    const shape = DIGITS[char];
    return shape.flatMap((line, r) => [...line].flatMap((pixel, c) => pixel === "1" ? [{ r: top + r, c: left + digitIndex * 7 + c }] : []));
  });
}

export function GooeyCounter({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rows = 13;
    const cols = 22;
    const start = performance.now();
    const second = 12 + Math.floor(Math.random() * 18);
    const fourth = 58 + Math.floor(Math.random() * 20);
    const phases = [{ at: 0, value: 3 }, { at: 620, value: second }, { at: 1320, value: 40 }, { at: 2070, value: fourth }, { at: 2860, value: 100 }];
    let current = numberCells(3, rows, cols).map((p) => ({ ...p }));
    let from = current.map((p) => ({ ...p }));
    let target = current.map((p) => ({ ...p }));
    let phaseIndex = 0;
    let raf = 0;
    let lastValue = 3;

    const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const nextTarget = (value: number) => { from = current.map((p) => ({ ...p })); target = numberCells(value, rows, cols); const max = Math.max(from.length, target.length); while (from.length < max) from.push({ ...(from[Math.floor(Math.random() * from.length)] ?? { r: 6, c: 11 }) }); while (target.length < max) target.push(randomCells(1, rows, cols)[0]); current = from.map((p) => ({ ...p })); };
    const draw = (now: number) => {
      const elapsed = now - start;
      const phase = phases[phaseIndex];
      if (phase && elapsed >= phase.at) { lastValue = phase.value; nextTarget(phase.value); phaseIndex += 1; }
      const previousAt = phaseIndex === 0 ? 0 : phases[phaseIndex - 1].at;
      const t = Math.min(1, Math.max(0, (elapsed - previousAt) / 500));
      const ease = t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      current = current.map((p, i) => ({ r: p.r + ((target[i]?.r ?? p.r) - p.r) * ease, c: p.c + ((target[i]?.c ?? p.c) - p.c) * ease }));
      ctx.clearRect(0, 0, innerWidth, innerHeight); ctx.fillStyle = "#000"; ctx.fillRect(0, 0, innerWidth, innerHeight);
      const cell = Math.min(48, Math.min(innerWidth * .9 / cols, innerHeight * .72 / rows)); const ox = (innerWidth - cell * cols) / 2; const oy = (innerHeight - cell * rows) / 2;
      ctx.strokeStyle = "rgba(255,255,255,.22)"; ctx.lineWidth = .5;
      for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(ox + c * cell, oy); ctx.lineTo(ox + c * cell, oy + rows * cell); ctx.stroke(); }
      for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(ox, oy + r * cell); ctx.lineTo(ox + cols * cell, oy + r * cell); ctx.stroke(); }
      ctx.fillStyle = "#fff";
      current.forEach((p, i) => { if (!target[i]) return; const x = ox + (p.c + .5) * cell; const y = oy + (p.r + .5) * cell; ctx.beginPath(); ctx.arc(x, y, cell * .32, 0, Math.PI * 2); ctx.fill(); });
      for (let i = 0; i < current.length; i++) for (let j = i + 1; j < current.length; j++) { const a = current[i], b = current[j]; const dx = (b.c - a.c) * cell, dy = (b.r - a.r) * cell; if (Math.hypot(dx, dy) < cell * 1.65) { ctx.strokeStyle = "#fff"; ctx.lineWidth = cell * .48; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(ox + (a.c + .5) * cell, oy + (a.r + .5) * cell); ctx.lineTo(ox + (b.c + .5) * cell, oy + (b.r + .5) * cell); ctx.stroke(); } }
      if (lastValue === 100 && elapsed > 3360) onComplete(); else raf = requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize", resize); raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [onComplete]);

  return <div className="gooey-loader" role="status" aria-label="Loading portfolio"><canvas ref={canvasRef} /><span className="loader-label">LOADING</span></div>;
}
