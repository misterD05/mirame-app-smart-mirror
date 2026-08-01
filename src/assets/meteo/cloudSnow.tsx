import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const AnimatedSnowIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = ''
}) => {
  return (
    <svg
      id="animated-snow-final"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        <style>{`
          /* Animazione Galleggiamento Nuvola */
          .cloud-body {
            animation: cloudFloat 4s ease-in-out infinite;
            transform-origin: center;
          }

          @keyframes cloudFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-0.6px); }
          }

          /* Animazione Fiocchi di Neve: Caduta morbida con oscillazione (sway) */
          .snow-flake {
            animation: snowFall 2.8s ease-in-out infinite;
            will-change: transform, opacity;
            opacity: 0;
          }

          /* Ritardi scaglionati per un flusso naturale */
          .flake-1 { animation-delay: 0s; }
          .flake-2 { animation-delay: 0.8s; }
          .flake-3 { animation-delay: 1.6s; }
          .flake-4 { animation-delay: 0.4s; }
          .flake-5 { animation-delay: 1.2s; }

          @keyframes snowFall {
            0% {
              opacity: 0;
              transform: translate(0px, -4px);
            }
            20% {
              opacity: 0.9;
              transform: translate(1.5px, 0px); /* Oscillazione a destra */
            }
            50% {
              opacity: 1;
              transform: translate(-1.5px, 4px); /* Oscillazione a sinistra */
            }
            80% {
              opacity: 0.8;
              transform: translate(1px, 7px);
            }
            100% {
              opacity: 0;
              transform: translate(-0.5px, 10px);
            }
          }
        `}</style>
      </defs>

      <path
        className="cloud-body"
        d="M4,14.899C1.964943,12.819778,1.428153,9.698528,2.651668,7.058901s3.952225-4.247261,6.854101-4.038126s5.371865,2.191432,6.204231,4.979225h1.79c1.982356-.000226,3.731362,1.296799,4.306771,3.193807s-.158332,3.94711-1.806771,5.048193"
        fill="none"
        stroke="#7b93a8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g className="snow-group">
        <circle
          className="snow-flake flake-1"
          cx="8.5"
          cy="16"
          r="0.9"
          fill="#a0c4ff"
        />
        <circle
          className="snow-flake flake-2"
          cx="12"
          cy="16.5"
          r="1.1"
          fill="#90e0ef"
        />
        <circle
          className="snow-flake flake-3"
          cx="15.8"
          cy="16"
          r="0.9"
          fill="#a0c4ff"
        />
        <circle
          className="snow-flake flake-4"
          cx="14.5"
          cy="17.5"
          r="0.75"
          fill="#caf0f8"
        />
        <circle
          className="snow-flake flake-5"
          cx="6.5"
          cy="17.2"
          r="0.75"
          fill="#caf0f8"
        />
      </g>
    </svg>
  );
};
