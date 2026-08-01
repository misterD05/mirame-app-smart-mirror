import React from 'react';

export interface AnimatedSunriseIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  sunColorStart?: string;
  sunColorEnd?: string;
  horizonColor?: string;
}

export const AnimatedSunriseIcon: React.FC<AnimatedSunriseIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  sunColorStart = '#ffb703', /* Giallo Alba */
  sunColorEnd = '#fb8500',   /* Arancione Alba */
  horizonColor = '#94a3b8'   /* Orizzonte */
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
      className={`animated-sunrise-icon ${className}`}
    >
      <defs>
        <linearGradient
          id="sunriseGradient"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={sunColorEnd} />
          <stop offset="100%" stopColor={sunColorStart} />
        </linearGradient>

        <filter id="sunriseGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor={sunColorEnd} floodOpacity="0.5" />
        </filter>

        <style>{`
          /* Animazione del Sole che sorge dall'orizzonte */
          .sunrise-sun {
            transform-origin: 12px 18px;
            animation: riseAndGlow 4s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes riseAndGlow {
            0%, 100% {
              transform: translateY(0) scale(0.98);
            }
            50% {
              transform: translateY(-1px) scale(1.03);
            }
          }

          /* Animazione freccia contenuta in alto */
          .sunrise-arrow {
            animation: arrowUp 2s ease-in-out infinite;
          }

          @keyframes arrowUp {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-0.8px);
              opacity: 1;
            }
          }
        `}</style>
      </defs>

      <g
        className="sunrise-sun"
        stroke="url(#sunriseGradient)"
        strokeWidth="2"
        filter="url(#sunriseGlow)"
      >

        <path className="sunrise-arrow" d="m9 6.5 3-3 3 3" />
        <path d="M12 3.5v6.5" />

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
