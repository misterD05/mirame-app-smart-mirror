import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
}

export const AnimatedWindIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = '',
  color = '#38bdf8'
}) => {
  return (
    <svg
      id="animated-wind-draw-reverse"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="wind-stroke-gradient-rev" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>

        <style>{`
          .wind-path-rev {
            stroke-dasharray: 40;
            /* Parte dal valore negativo per invertire la direzione di srotolamento */
            stroke-dashoffset: -40;
            animation: drawWindReverse 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          /* Ritardi scaglionati per far apparire le 3 correnti in sequenza */
          .path-top {
            animation-delay: 0.3s;
          }

          .path-middle {
            animation-delay: 0s; /* Parte per prima la corrente centrale */
          }

          .path-bottom {
            animation-delay: 0.6s;
          }

          @keyframes drawWindReverse {
            0% {
              stroke-dashoffset: -40; /* Invisibile: parte da sinistra */
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            50%, 70% {
              stroke-dashoffset: 0; /* Formazione completa della linea e della spirale */
              opacity: 1;
            }
            90%, 100% {
              stroke-dashoffset: 40; /* Scompare riassorbendosi verso la spirale */
              opacity: 0;
            }
          }
        `}</style>
      </defs>

      <g
        stroke="url(#wind-stroke-gradient-rev)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path
          className="wind-path-rev path-top"
          d="M9.8 4.4A2 2 0 1 1 11 8H2"
        />

        <path
          className="wind-path-rev path-middle"
          d="M17.5 8a2.5 2.5 0 1 1 2 4H2"
        />

        <path
          className="wind-path-rev path-bottom"
          d="M12.8 19.6A2 2 0 1 0 14 16H2"
        />
      </g>
    </svg>
  );
};
