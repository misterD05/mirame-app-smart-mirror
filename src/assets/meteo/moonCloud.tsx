import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const AnimatedCloudMoonIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  color = '#94a3b8'
}) => {
  return (
    <svg
      id="animated-cloud-moon-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="moon-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>

        <filter id="moon-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#fde047" floodOpacity="0.5" />
        </filter>

        <mask id="cloud-mask">
          <rect x="-10" y="-10" width="44" height="44" fill="#ffffff" />

          <path
            d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z"
            fill="#000000"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </mask>

        <style>{`
          /* Movimento morbido della Nuvola */
          .cloud-path {
            animation: cloudFloat 4s ease-in-out infinite;
            transform-origin: center;
          }

          @keyframes cloudFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-0.8px);
            }
          }

          /* Galleggiamento limitato della Luna */
          .moon-path {
            animation: moonFloat 5s ease-in-out infinite;
            transform-origin: 17px 8px;
            will-change: transform;
          }

          @keyframes moonFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-1px) rotate(2deg);
            }
          }
        `}</style>
      </defs>

      <g mask="url(#cloud-mask)">
        <path
          className="moon-path"
          d="M17.376 18.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"
          fill="none"
          stroke="url(#moon-glow-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#moon-soft-shadow)"
        />
      </g>

      <path
        className="cloud-path"
        d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
