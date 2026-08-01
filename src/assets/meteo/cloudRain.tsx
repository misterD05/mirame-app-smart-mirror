import React from 'react';

export interface SvgIconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const AnimatedRainIcon: React.FC<SvgIconProps> = ({
  width = 100,
  height = 100,
  className = ''
}) => {
  return (
    <svg
      id="animated-rain-final"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        {/* Animazioni CSS integrate */}
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



          /* Variabile custom per easing potente */
          :root {
            --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
          }

          /* Animazione Pioggia migliorata: caduta fluida, dissolvenza, distanziamento */
          .rain-drop {
            animation: rainDrop 1.4s linear infinite; /* Leggermente più lenta x eleganza */
            will-change: transform, opacity;
            opacity: 0;
          }

          /* Ritardi scaglionati per prevenire sovrapposizioni visive nel loop */
          .drop-1 { animation-delay: 0s; }
          .drop-2 { animation-delay: 0.5s; }
          .drop-3 { animation-delay: 1.0s; }
          .drop-4 { animation-delay: 0.25s; }
          .drop-5 { animation-delay: 0.75s; }

          @keyframes rainDrop {
            0% {
              opacity: 0;
              transform: translate(4px, -6px); /* Partenza alta e a destra */
            }
            15% {
              opacity: 1;
            }
            85% {
              opacity: 0.8;
            }
            100% {
              opacity: 0;
              transform: translate(-5px, 9px); /* Arrivo basso e a sinistra */
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

      <g className="rain-group">
        <path
          className="rain-drop drop-1"
          d="M9,15 L7.5,18"
          fill="none"
          stroke="#448de1"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          className="rain-drop drop-2"
          d="M12.5,16 L11,19"
          fill="none"
          stroke="#448de1"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          className="rain-drop drop-3"
          d="M16.5,16.5 L15,19.5"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.2"
          strokeLinecap="round"
              />
        <path
          className="rain-drop drop-4"
          d="M15.5,17 L14,20"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
        <path
          className="rain-drop drop-5"
          d="M7,17 L5.5,20" 
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.0"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
