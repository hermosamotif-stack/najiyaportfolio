import { useEffect, useRef } from "react";

const MorphingBlobs = () => {
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="blob-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          </filter>
        </defs>
        <g filter="url(#blob-blur)">
          <circle r="120" fill="hsla(220, 80%, 50%, 0.08)">
            <animate attributeName="cx" values="200;600;300;200" dur="20s" repeatCount="indefinite" />
            <animate attributeName="cy" values="150;350;500;150" dur="25s" repeatCount="indefinite" />
          </circle>
          <circle r="90" fill="hsla(260, 60%, 40%, 0.06)">
            <animate attributeName="cx" values="500;200;600;500" dur="18s" repeatCount="indefinite" />
            <animate attributeName="cy" values="400;200;300;400" dur="22s" repeatCount="indefinite" />
          </circle>
          <circle r="70" fill="hsla(200, 70%, 50%, 0.05)">
            <animate attributeName="cx" values="350;550;150;350" dur="15s" repeatCount="indefinite" />
            <animate attributeName="cy" values="250;450;200;250" dur="19s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default MorphingBlobs;
