import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const AnimatedSunIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  color = '#ffb703'
}) => {
  return (
    <svg
      id="animated-sun-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="sun-core-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#ff9100" />
        </linearGradient>

        <filter id="sun-glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#ffb703" floodOpacity="0.6" />
        </filter>

        <style>{`
          /* Rotazione continua e fluida dei raggi */
          .sun-rays {
            animation: rotateRays 12s linear infinite;
            transform-origin: 12px 12px;
          }

          @keyframes rotateRays {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          /* Pulsazione morbida del nucleo centrale */
          .sun-core {
            animation: pulseCore 3s ease-in-out infinite;
            transform-origin: 12px 12px;
          }

          @keyframes pulseCore {
            0%, 100% {
              transform: scale(1);
              opacity: 0.95;
            }
            50% {
              transform: scale(1.08);
              opacity: 1;
            }
          }
        `}</style>
      </defs>

      <g filter="url(#sun-glow-filter)">
        <circle
          className="sun-core"
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="url(#sun-core-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g className="sun-rays" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </g>
      </g>
    </svg>
  );
};
