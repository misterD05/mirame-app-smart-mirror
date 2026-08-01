import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const AnimatedEclipseIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = ''
}) => {
  return (
    <svg
      id="animated-eclipse-sequence"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="sun-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffee55" />
          <stop offset="100%" stopColor="#ff9900" />
        </linearGradient>

        <filter id="corona-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#ffaa00" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#ff6600" floodOpacity="0.5" />
        </filter>

        <style>{`
          /* Micro-oscillazione di base */
          .eclipse-container {
            animation: cloudFloat 5s ease-in-out infinite;
            transform-origin: center;
          }

          @keyframes cloudFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-0.6px); }
          }

          /* 1. Transito fluido e solido della Luna */
          .moon-shadow {
            animation: moonTransit 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            transform-origin: center;
            opacity: 1;
            will-change: transform;
          }

          @keyframes moonTransit {
            0% {
              transform: translate(22px, -22px);
            }
            50% {
              transform: translate(0px, 0px);
            }
            100% {
              transform: translate(-22px, 22px);
            }
          }

          /* 2. Transizione ULTRA-FLUIDA della Corona (Glow) tramite Opacity */
          .corona-layer {
            animation: coronaFade 7s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            transform-origin: center;
            will-change: opacity;
          }

          @keyframes coronaFade {
            0%, 20% {
              opacity: 0; /* Invisibile prima dell'arrivo della Luna */
            }
            50% {
              opacity: 1; /* Dissolvenza morbida al massimo durante l'eclissi totale */
            }
            80%, 100% {
              opacity: 0; /* Dissolvenza morbida mentre la Luna va via */
            }
          }
        `}</style>
      </defs>

      <g className="eclipse-container">
        <circle
          className="corona-layer"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="url(#sun-glow)"
          strokeWidth="2"
          filter="url(#corona-soft-glow)"
        />

        <circle
          cx="12"
          cy="12"
          r="10"
          fill="#ffbb00"
          stroke="#ffbb00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          className="moon-shadow"
          cx="12"
          cy="12"
          r="9.8"
          fill="#121820"
          stroke="#121820"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
};
