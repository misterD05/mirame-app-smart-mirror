import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const AnimatedMoonIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  color = 'currentColor'
}) => {
  return (
    <svg
      id="animated-moon-star-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="moon-star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        <filter id="star-moon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#fde047" floodOpacity="0.5" />
        </filter>

        <style>{`
          /* 1. Fluttuazione della Luna */
          .moon-body {
            animation: moonFloat 5s ease-in-out infinite;
            transform-origin: 12px 12px;
            will-change: transform;
          }

          @keyframes moonFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-1px) rotate(-2deg);
            }
          }

          /* 2. Luccichio della Stella (Centro esatto impostato su 20px, 5px) */
          .star-sparkle {
            animation: starTwinkle 2.5s ease-in-out infinite;
            transform-origin: 20px 5px;
            will-change: transform, opacity;
          }

          @keyframes starTwinkle {
            0%, 100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: scale(0.6) rotate(45deg);
              opacity: 0.3;
            }
          }
        `}</style>
      </defs>

      <g filter="url(#star-moon-glow)">
        <path
          className="moon-body"
          d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
          fill="none"
          stroke="url(#moon-star-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g className="star-sparkle" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 5h4" />
          <path d="M20 3v4" />
        </g>
      </g>
    </svg>
  );
};
