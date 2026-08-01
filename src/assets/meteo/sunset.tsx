import React from 'react';

export interface AnimatedSunsetIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  sunColorStart?: string;
  sunColorEnd?: string;
  horizonColor?: string;
}

export const AnimatedSunsetIcon: React.FC<AnimatedSunsetIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  sunColorStart = '#fb8500',
  sunColorEnd = '#d90429',
  horizonColor = '#64748b'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animated-sunset-icon ${className}`}
    >
      <defs>
        <linearGradient
          id="sunsetGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={sunColorStart} />
          <stop offset="100%" stopColor={sunColorEnd} />
        </linearGradient>

        <filter id="sunsetGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor={sunColorStart} floodOpacity="0.5" />
        </filter>

        <style>{`
          /* Animazione del Sole che scende verso l'orizzonte */
          .sunset-sun {
            transform-origin: 12px 18px;
            animation: setAndGlow 4s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes setAndGlow {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(1px) scale(0.96);
            }
          }

          /* Animazione freccia direzionale verso il basso */
          .sunset-arrow {
            animation: arrowDown 2s ease-in-out infinite;
          }

          @keyframes arrowDown {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.7;
            }
            50% {
              transform: translateY(0.8px);
              opacity: 1;
            }
          }
        `}</style>
      </defs>

      <g
        className="sunset-sun"
        stroke="url(#sunsetGradient)"
        strokeWidth="2"
        filter="url(#sunsetGlow)"
      >
        <path className="sunset-arrow" d="m15 6.5-3 3-3-3" />
        <path d="M12 2v6.5" />

        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />

        <path d="M16 18a4 4 0 0 0-8 0" />
      </g>

      <path
        d="M22 22H2"
        stroke={horizonColor}
        strokeWidth="2"
      />
    </svg>
  );
};
