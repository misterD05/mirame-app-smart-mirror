import React from 'react';

export interface CloudSunIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const AnimatedCloudSunIcon: React.FC<CloudSunIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  color = '#94a3b8'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animated-cloud-sun ${className}`}
    >
      <defs>
        <linearGradient
          id="sun-glow-grad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffa435" />
          <stop offset="100%" stopColor="#fa8f15" />
        </linearGradient>

        <filter id="sun-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#fdc347" floodOpacity="0.5" />
        </filter>

        <style>{`
          /* Animazione rotazione/pulsazione per il Sole abbassato */
          .sun-element {
            transform-origin: 12px 13.5px;
            animation: sunPulse 6s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes sunPulse {
            0%, 100% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(10deg) scale(1.05);
            }
          }

          /* Animazione fluttuante per la Nuvola */
          .cloud-element {
            animation: cloudFloat 3s ease-in-out infinite;
          }

          @keyframes cloudFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-0.8px);
            }
          }
        `}</style>
      </defs>

      <g
        className="sun-element"
        stroke="url(#sun-glow-grad)"
        strokeWidth="2"
        filter="url(#sun-soft-shadow)"
      >
        <path d="M12 4v1.2" />
        <path d="m18.2 6.8-0.9 0.9" />
        <path d="M20 13.2h-1.2" />
        <path d="m5.8 6.8 0.9 0.9" />

        <path d="M15.5 14.1a4 4 0 0 0-5.5-3.8" />
      </g>

      <path
        className="cloud-element"
        d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"
        fill="none"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  );
};
