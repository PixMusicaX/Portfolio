"use client";

import { useEffect, useRef } from "react";

interface DividerProps {
  hoveredSide: "left" | "right" | "bottom" | null;
  variant?: "default" | "music" | "dev" | "waltz" | "synthwave" | "battle" | "electronic" | "fusion" | "acoustic" | "anime" | "orchestral" | "legacy";
  className?: string;
  align?: "left" | "right" | "bottom" | "top";
}

export const GaseousDivider = ({ hoveredSide, variant = "default", className = "", align = "left" }: DividerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isTurbulent = hoveredSide !== null;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;
    const SEGS = 120;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    function fbm(y: number, t: number, octaves: number) {
      let v = 0, a = 1, f = 1, tot = 0;
      for (let i = 0; i < octaves; i++) {
        v += Math.sin(y * 0.018 * f + t * (0.9 + i * 0.4) + i * 2.1) * a;
        v += Math.cos(y * 0.031 * f + t * (1.3 + i * 0.3) + i * 1.4) * a * 0.7;
        tot += a; a *= 0.58; f *= 2.1;
      }
      return v / tot;
    }

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      if (W === 0 || H === 0) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const dpr = window.devicePixelRatio || 1;
      
      const currentHoveredSide = document.body.dataset.hoveredSide || "none";

      ctx.save();
      if (currentHoveredSide === "left") {
        ctx.beginPath();
        // Shift rect extremely slightly left to avoid fractional subpixel 1px seams
        ctx.rect(cx - 0.5, 0, W * 2, H); 
        ctx.clip();
      } else if (currentHoveredSide === "right") {
        ctx.beginPath();
        ctx.rect(-W * 2, 0, cx + W * 2 + 0.5, H);
        ctx.clip();
      }

      const layers = [
        { spread: 80, alpha: 0.07, speed: 0.5, oct: 3 },
        { spread: 52, alpha: 0.13, speed: 0.7, oct: 4 },
        { spread: 34, alpha: 0.22, speed: 0.9, oct: 4 },
        { spread: 20, alpha: 0.38, speed: 1.1, oct: 5 },
        { spread: 11, alpha: 0.60, speed: 1.3, oct: 5 },
        { spread: 5,  alpha: 0.85, speed: 1.5, oct: 6 },
      ];
      
      for (const layer of layers) {
        const pts = [];
        for (let i = 0; i <= SEGS; i++) {
          const y = (i / SEGS) * H;
          const yNorm = i / SEGS;
          const env = Math.pow(Math.sin(yNorm * Math.PI), 0.4);
          const bulge = 1 + 0.4 * Math.sin(yNorm * Math.PI * 2 + t * 0.8);
          const baseY = y / dpr;
          const dx = fbm(baseY, t * layer.speed, layer.oct) * 28 * env * dpr;
          const hw = layer.spread * env * bulge * (0.7 + 0.3 * Math.abs(fbm(baseY, t * layer.speed + 10, 2))) * dpr;
          
          let lEdge = dx - hw;
          let rEdge = dx + hw;

          if (currentHoveredSide === "left") {
            lEdge = 0; // Perfectly flat on hovered side
            rEdge = hw * 1.4 + Math.abs(dx) * 1.2; 
          } else if (currentHoveredSide === "right") {
            rEdge = 0; // Perfectly flat on hovered side
            lEdge = -hw * 1.4 - Math.abs(dx) * 1.2; 
          }

          pts.push({ y, lEdge, rEdge });
        }

        ctx.beginPath();
        ctx.moveTo(cx + pts[0].lEdge, pts[0].y);
        for (let i = 1; i <= SEGS; i++) {
          const p = pts[i], pp = pts[i - 1];
          const mx = (cx + p.lEdge + cx + pp.lEdge) / 2;
          const my = (p.y + pp.y) / 2;
          ctx.quadraticCurveTo(cx + pp.lEdge, pp.y, mx, my);
        }
        for (let i = SEGS; i >= 0; i--) {
          const p = pts[i], pn = pts[Math.min(i + 1, SEGS)];
          const mx = (cx + p.rEdge + cx + pn.rEdge) / 2;
          const my = (p.y + pn.y) / 2;
          ctx.quadraticCurveTo(cx + pn.rEdge, pn.y, mx, my);
        }
        ctx.closePath();

        const g = ctx.createLinearGradient(0, 0, 0, H);
        if (variant === "music") {
          g.addColorStop(0,    `rgba(168,85,247,0)`);
          g.addColorStop(0.2,  `rgba(168,85,247,${layer.alpha})`);
          g.addColorStop(0.5,  `rgba(236,72,153,${layer.alpha})`);
          g.addColorStop(0.8,  `rgba(249,115,22,${layer.alpha})`);
          g.addColorStop(1,    `rgba(249,115,22,0)`);
        } else if (variant === "waltz") {
          g.addColorStop(0,    `rgba(30,58,138,0)`);
          g.addColorStop(0.2,  `rgba(30,58,138,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(29,78,216,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(37,99,235,${layer.alpha})`);
          g.addColorStop(1,    `rgba(37,99,235,0)`);
        } else if (variant === "synthwave") {
          g.addColorStop(0,    `rgba(88,28,135,0)`);
          g.addColorStop(0.2,  `rgba(88,28,135,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(147,51,234,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(192,38,211,${layer.alpha})`);
          g.addColorStop(1,    `rgba(192,38,211,0)`);
        } else if (variant === "battle") {
          g.addColorStop(0,    `rgba(136,19,55,0)`);
          g.addColorStop(0.2,  `rgba(136,19,55,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(225,29,72,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(244,63,94,${layer.alpha})`);
          g.addColorStop(1,    `rgba(244,63,94,0)`);
        } else if (variant === "electronic") {
          g.addColorStop(0,    `rgba(63,63,70,0)`);
          g.addColorStop(0.2,  `rgba(63,63,70,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(113,113,122,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(161,161,170,${layer.alpha})`);
          g.addColorStop(1,    `rgba(161,161,170,0)`);
        } else if (variant === "fusion") {
          g.addColorStop(0,    `rgba(146,64,14,0)`);
          g.addColorStop(0.2,  `rgba(146,64,14,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(217,119,6,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(245,158,11,${layer.alpha})`);
          g.addColorStop(1,    `rgba(245,158,11,0)`);
        } else if (variant === "acoustic") {
          g.addColorStop(0,    `rgba(6,95,70,0)`);
          g.addColorStop(0.2,  `rgba(6,95,70,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(5,150,105,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(16,185,129,${layer.alpha})`);
          g.addColorStop(1,    `rgba(16,185,129,0)`);
        } else if (variant === "anime") {
          g.addColorStop(0,    `rgba(157,23,77,0)`);
          g.addColorStop(0.2,  `rgba(157,23,77,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(219,39,119,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(236,72,153,${layer.alpha})`);
          g.addColorStop(1,    `rgba(236,72,153,0)`);
        } else if (variant === "orchestral") {
          g.addColorStop(0,    `rgba(49,46,129,0)`);
          g.addColorStop(0.2,  `rgba(49,46,129,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(79,70,229,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(99,102,241,${layer.alpha})`);
          g.addColorStop(1,    `rgba(99,102,241,0)`);
        } else if (variant === "legacy") {
          g.addColorStop(0,    `rgba(17,94,89,0)`);
          g.addColorStop(0.2,  `rgba(17,94,89,${layer.alpha * 0.8})`);
          g.addColorStop(0.5,  `rgba(13,148,136,${layer.alpha * 0.9})`);
          g.addColorStop(0.8,  `rgba(20,184,166,${layer.alpha})`);
          g.addColorStop(1,    `rgba(20,184,166,0)`);
        } else {
          g.addColorStop(0,    `rgba(255,255,255,0)`);
          g.addColorStop(0.04, `rgba(255,255,255,${layer.alpha})`);
          g.addColorStop(0.5,  `rgba(255,255,255,${layer.alpha})`);
          g.addColorStop(0.96, `rgba(255,255,255,${layer.alpha})`);
          g.addColorStop(1,    `rgba(255,255,255,0)`);
        }
        ctx.fillStyle = g;
        ctx.fill();
      }

      ctx.beginPath();
      let firstPt = true;
      for (let i = 0; i <= SEGS; i++) {
        const y = (i / SEGS) * H;
        const yNorm = i / SEGS;
        const env = Math.pow(Math.sin(yNorm * Math.PI), 0.3);
        const baseY = y / dpr;
        
        let dx = fbm(baseY, t * 1.6, 6) * 18 * env * dpr;
        if (currentHoveredSide === "left") {
          dx = Math.abs(dx) * 1.2;
        } else if (currentHoveredSide === "right") {
          dx = -Math.abs(dx) * 1.2;
        }
        
        if (firstPt) { ctx.moveTo(cx + dx, y); firstPt = false; }
        else {
          const py = ((i - 1) / SEGS) * H;
          // Constrain value above 0 preventing negative fractional power eval (NaN crash bounding square bug)
          const safeNorm = Math.max(0, (i - 1) / SEGS);
          let pdx = fbm(py / dpr, t * 1.6, 6) * 18 * Math.pow(Math.max(0, Math.sin(safeNorm * Math.PI)), 0.3) * dpr;
          
          if (currentHoveredSide === "left") {
            pdx = Math.abs(pdx) * 1.2;
          } else if (currentHoveredSide === "right") {
            pdx = -Math.abs(pdx) * 1.2;
          }
          
          ctx.quadraticCurveTo(cx + pdx, py, cx + (dx + pdx) / 2, (y + py) / 2);
        }
      }
      
      const cg = ctx.createLinearGradient(0, 0, 0, H);
      if (variant === "music") {
        cg.addColorStop(0,   'rgba(168,85,247,0)');
        cg.addColorStop(0.2, 'rgba(168,85,247,1)');
        cg.addColorStop(0.5, 'rgba(236,72,153,1)');
        cg.addColorStop(0.8, 'rgba(249,115,22,1)');
        cg.addColorStop(1,   'rgba(249,115,22,0)');
      } else if (variant === "waltz") {
        cg.addColorStop(0,   'rgba(30,58,138,0)');
        cg.addColorStop(0.2, 'rgba(30,58,138,1)');
        cg.addColorStop(0.5, 'rgba(29,78,216,1)');
        cg.addColorStop(0.8, 'rgba(37,99,235,1)');
        cg.addColorStop(1,   'rgba(37,99,235,0)');
      } else if (variant === "synthwave") {
        cg.addColorStop(0,   'rgba(88,28,135,0)');
        cg.addColorStop(0.2, 'rgba(88,28,135,1)');
        cg.addColorStop(0.5, 'rgba(147,51,234,1)');
        cg.addColorStop(0.8, 'rgba(192,38,211,1)');
        cg.addColorStop(1,   'rgba(192,38,211,0)');
      } else if (variant === "battle") {
        cg.addColorStop(0,   'rgba(136,19,55,0)');
        cg.addColorStop(0.2, 'rgba(136,19,55,1)');
        cg.addColorStop(0.5, 'rgba(225,29,72,1)');
        cg.addColorStop(0.8, 'rgba(244,63,94,1)');
        cg.addColorStop(1,   'rgba(244,63,94,0)');
      } else if (variant === "electronic") {
        cg.addColorStop(0,   'rgba(63,63,70,0)');
        cg.addColorStop(0.2, 'rgba(63,63,70,1)');
        cg.addColorStop(0.5, 'rgba(113,113,122,1)');
        cg.addColorStop(0.8, 'rgba(161,161,170,1)');
        cg.addColorStop(1,   'rgba(161,161,170,0)');
      } else if (variant === "fusion") {
        cg.addColorStop(0,   'rgba(146,64,14,0)');
        cg.addColorStop(0.2, 'rgba(146,64,14,1)');
        cg.addColorStop(0.5, 'rgba(217,119,6,1)');
        cg.addColorStop(0.8, 'rgba(245,158,11,1)');
        cg.addColorStop(1,   'rgba(245,158,11,0)');
      } else if (variant === "acoustic") {
        cg.addColorStop(0,   'rgba(6,95,70,0)');
        cg.addColorStop(0.2, 'rgba(6,95,70,1)');
        cg.addColorStop(0.5, 'rgba(5,150,105,1)');
        cg.addColorStop(0.8, 'rgba(16,185,129,1)');
        cg.addColorStop(1,   'rgba(16,185,129,0)');
      } else if (variant === "anime") {
        cg.addColorStop(0,   'rgba(157,23,77,0)');
        cg.addColorStop(0.2, 'rgba(157,23,77,1)');
        cg.addColorStop(0.5, 'rgba(219,39,119,1)');
        cg.addColorStop(0.8, 'rgba(236,72,153,1)');
        cg.addColorStop(1,   'rgba(236,72,153,0)');
      } else if (variant === "orchestral") {
        cg.addColorStop(0,   'rgba(49,46,129,0)');
        cg.addColorStop(0.2, 'rgba(49,46,129,1)');
        cg.addColorStop(0.5, 'rgba(79,70,229,1)');
        cg.addColorStop(0.8, 'rgba(99,102,241,1)');
        cg.addColorStop(1,   'rgba(99,102,241,0)');
      } else if (variant === "legacy") {
        cg.addColorStop(0,   'rgba(17,94,89,0)');
        cg.addColorStop(0.2, 'rgba(17,94,89,1)');
        cg.addColorStop(0.5, 'rgba(13,148,136,1)');
        cg.addColorStop(0.8, 'rgba(20,184,166,1)');
        cg.addColorStop(1,   'rgba(20,184,166,0)');
      } else {
        cg.addColorStop(0,    'rgba(255,255,255,0)');
        cg.addColorStop(0.04, 'rgba(255,255,255,1)');
        cg.addColorStop(0.5,  'rgba(255,255,255,1)');
        cg.addColorStop(0.96, 'rgba(255,255,255,1)');
        cg.addColorStop(1,    'rgba(255,255,255,0)');
      }
      ctx.strokeStyle = cg;
      ctx.lineWidth = 2.5 * dpr;
      ctx.stroke();

      for (let spark = 0; spark < 3; spark++) {
        const sy = H * (0.1 + 0.8 * ((t * 0.7 + spark * 1.7) % 1));
        const yNorm = sy / H;
        const env = Math.pow(Math.sin(yNorm * Math.PI), 0.4);
        let sdx = fbm(sy / dpr, t * 2.1 + spark * 5, 4) * 22 * env * dpr;
        
        if (currentHoveredSide === "left") {
          sdx = Math.abs(sdx) * 1.2 + Math.random() * 20 * dpr;
        } else if (currentHoveredSide === "right") {
          sdx = -Math.abs(sdx) * 1.2 - Math.random() * 20 * dpr;
        }
        
        const sAlpha = Math.pow(Math.sin(yNorm * Math.PI), 2) * 0.7;
        ctx.beginPath();
        ctx.arc(cx + sdx, sy, (1.5 + Math.random()) * dpr, 0, Math.PI * 2);
        
        let fillColor = `rgba(255,255,255,${sAlpha})`;
        if (variant === "music") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(249,115,22,${sAlpha})` : depth > 0.3 ? `rgba(236,72,153,${sAlpha})` : `rgba(168,85,247,${sAlpha})`;
        } else if (variant === "waltz") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(30,58,138,${sAlpha})` : depth > 0.3 ? `rgba(29,78,216,${sAlpha})` : `rgba(37,99,235,${sAlpha})`;
        } else if (variant === "synthwave") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(88,28,135,${sAlpha})` : depth > 0.3 ? `rgba(147,51,234,${sAlpha})` : `rgba(192,38,211,${sAlpha})`;
        } else if (variant === "battle") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(136,19,55,${sAlpha})` : depth > 0.3 ? `rgba(225,29,72,${sAlpha})` : `rgba(244,63,94,${sAlpha})`;
        } else if (variant === "electronic") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(63,63,70,${sAlpha})` : depth > 0.3 ? `rgba(113,113,122,${sAlpha})` : `rgba(161,161,170,${sAlpha})`;
        } else if (variant === "fusion") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(146,64,14,${sAlpha})` : depth > 0.3 ? `rgba(217,119,6,${sAlpha})` : `rgba(245,158,11,${sAlpha})`;
        } else if (variant === "acoustic") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(6,95,70,${sAlpha})` : depth > 0.3 ? `rgba(5,150,105,${sAlpha})` : `rgba(16,185,129,${sAlpha})`;
        } else if (variant === "anime") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(157,23,77,${sAlpha})` : depth > 0.3 ? `rgba(219,39,119,${sAlpha})` : `rgba(236,72,153,${sAlpha})`;
        } else if (variant === "orchestral") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(49,46,129,${sAlpha})` : depth > 0.3 ? `rgba(79,70,229,${sAlpha})` : `rgba(99,102,241,${sAlpha})`;
        } else if (variant === "legacy") {
          const depth = Math.random();
          fillColor = depth > 0.6 ? `rgba(17,94,89,${sAlpha})` : depth > 0.3 ? `rgba(13,148,136,${sAlpha})` : `rgba(20,184,166,${sAlpha})`;
        }
        ctx.fillStyle = fillColor;
        ctx.fill();
      }

      const speedMult = currentHoveredSide !== "none" ? 2.5 : 1;
      t += 0.028 * speedMult;
      
      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    document.body.dataset.turbulent = isTurbulent ? "true" : "false";
    document.body.dataset.hoveredSide = hoveredSide || "none";
  }, [isTurbulent, hoveredSide]);

  // FIX: Injected the top-alignment logic into the ternary chain
  const alignStyle = align === "left" 
    ? { left: 0, transform: 'translateX(-50%)', top: '-10%', bottom: '-10%', width: 800 } 
    : align === "right" 
      ? { right: 0, transform: 'translateX(50%)', top: '-10%', bottom: '-10%', width: 800 } 
      : align === "top"
        ? { top: 0, left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', width: 800, height: '120dvh' }
        : { bottom: 0, left: '50%', transform: 'translate(-50%, 50%) rotate(-90deg)', width: 800, height: '120dvh' };

  return (
    <div 
      className={`absolute z-30 pointer-events-none ${variant === "default" ? "mix-blend-difference" : ""} ${className}`}
      style={{ ...alignStyle }}
    >
      <canvas ref={canvasRef} className="w-full h-full opacity-90 mix-blend-normal" />
    </div>
  );
};
