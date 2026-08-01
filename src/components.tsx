import { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import './global.css';
import { callOpenMeteo } from './apis';
import cloud from './assets/meteo/cloud.svg';
import { Seasons } from 'astronomy-engine';

import winter from './assets/seasons/winter.svg';
import spring from './assets/seasons/spring.svg';
import summer from './assets/seasons/summer.svg';
import autumn from './assets/seasons/autumn.svg';

import { AnimatedStormIcon      } from './assets/meteo/storm';
import { AnimatedRainIcon       } from './assets/meteo/cloudRain';
import { AnimatedSnowIcon       } from './assets/meteo/cloudSnow';
import { AnimatedEclipseIcon    } from './assets/meteo/eclipse';
import { AnimatedSunIcon        } from './assets/meteo/sun';
import { AnimatedWindIcon       } from './assets/meteo/wind';
import { AnimatedCloudMoonIcon  } from './assets/meteo/moonCloud';
import { AnimatedMoonIcon       } from './assets/meteo/moon';
import { AnimatedCloudSunIcon   } from './assets/meteo/sunCloud';
import { AnimatedSunriseIcon    } from './assets/meteo/sunrise';
import { AnimatedSunsetIcon     } from './assets/meteo/sunset';





export function SmallDigitalClock() {
    const [ora, setOra] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setOra(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const opzioniOra: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const opzioniData: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' };


    return (
        <div className='p-5 h-fit w-fit flex gap-5 items-center border-2 border-white rounded-[20px]'>
            <SeasonalIcon></SeasonalIcon>
            <div className='flex-col gap-5 '>
                <h1 className="text-7xl">
                    {ora.toLocaleTimeString('it-IT', opzioniOra)}
                </h1>
                <p className="text-xl ml-2 capitalize">
                    {ora.toLocaleDateString('it-IT', opzioniData)}
                </p>
            </div>
        </div>
    )
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface SeasonalIconProps {
    date?: Date;
    className?: string;
}

export const getAstronomicalSeason = (targetDate: Date = new Date()): Season => {
    const year = targetDate.getFullYear();

    const seasons = Seasons(year);

    const marEquinox = seasons.mar_equinox.date;
    const junSolstice = seasons.jun_solstice.date;
    const sepEquinox = seasons.sep_equinox.date;
    const decSolstice = seasons.dec_solstice.date;

    if (targetDate >= marEquinox && targetDate < junSolstice) {
        return 'spring';
    } else if (targetDate >= junSolstice && targetDate < sepEquinox) {
        return 'summer';
    } else if (targetDate >= sepEquinox && targetDate < decSolstice) {
        return 'autumn';
    } else {
        return 'winter';
    }
};

export const SeasonalIcon: React.FC<SeasonalIconProps> = ({
    date = new Date(),
    className = ''
}) => {
    const currentSeason = useMemo(() => getAstronomicalSeason(date), [date]);

    return (
        <div className={`seasonal-icon-wrapper ${className}`}>
            <style>{`
                .seasonal-icon-wrapper {
                    display: grid;
                    place-items: center;
                    width: 64px;
                    height: 64px;
                    position: relative;
                }

                .season-img {
                    grid-area: 1 / 1;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;

                    opacity: 0;
                    transform: scale(0.5) rotate(-15deg);
                    pointer-events: none;

                    transition:
                        opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                        transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .season-img.active {
                    opacity: 1;
                    transform: scale(1) rotate(0deg);
                    pointer-events: auto;
                }

                .season-img.spring.active {
                    animation: springFloat 4s ease-in-out infinite;
                }

                .season-img.summer.active {
                    animation: summerPulse 3s ease-in-out infinite;
                }

                .season-img.autumn.active {
                    animation: autumnSway 5s ease-in-out infinite;
                }

                .season-img.winter.active {
                    animation: winterSpin 16s linear infinite;
                }

                @keyframes springFloat {
                    0%, 100% { transform: scale(1) translateY(0); }
                    50% { transform: scale(1.05) translateY(-2px); }
                }

                @keyframes summerPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }

                @keyframes autumnSway {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1) rotate(6deg); }
                }

                @keyframes winterSpin {
                    from { transform: scale(1) rotate(0deg); }
                    to { transform: scale(1) rotate(360deg); }
                }
            `}</style>

            <img
                src={spring}
                alt="Primavera"
                className={`season-img spring ${currentSeason === 'spring' ? 'active' : ''}`}
            />
            <img
                src={summer}
                alt="Estate"
                className={`season-img summer ${currentSeason === 'summer' ? 'active' : ''}`}
            />
            <img
                src={autumn}
                alt="Autunno"
                className={`season-img autumn ${currentSeason === 'autumn' ? 'active' : ''}`}
            />
            <img
                src={winter}
                alt="Inverno"
                className={`season-img winter ${currentSeason === 'winter' ? 'active' : ''}`}
            />
        </div>
    );
};


export function OpenmeteoStats() {
    const [weatherData, setWeatherData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callOpenMeteo();
                setWeatherData(data);

            } catch (error) {
                console.error("Errore durante il recupero dei dati meteo:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-zinc-400">Caricamento meteo...</div>;
    }

    if (!weatherData) {
        return <div className="text-red-400">Impossibile caricare i dati.</div>;
    }

    return (
        <div className='p-5 h-fit w-fit flex gap-5 items-center border-2 border-white rounded-[20px]'>
            <CurrentWeatherCard weatherData={weatherData}></CurrentWeatherCard>
            <div className='flex-col gap-5 '>
                <h1 className="text-3xl">
                    {weatherData?.current?.temperature_2m.toFixed(2) ?? "--"} °C
                </h1>
            </div>
        </div>
    );
}

export const CurrentWeatherCard = ({ weatherData }: { weatherData: any }) => {
    const iconKey = getWeatherIconKey(weatherData);

    const IconComponent = meteoEmoji[iconKey];

    return (
        <div className="weather-card">
            <IconComponent width={64} height={64} />
        </div>
    );
};


const meteoEmoji = {
    "cloud" : cloud,
    "storm" : AnimatedStormIcon,
    "rain" : AnimatedRainIcon,
    "snow" : AnimatedSnowIcon,
    "eclipse" : AnimatedEclipseIcon,
    "sun" : AnimatedSunIcon,
    "cloudMoon" : AnimatedCloudMoonIcon,
    "moon" : AnimatedMoonIcon,
    "cloudSun" : AnimatedCloudSunIcon,
    "sunrise" : AnimatedSunriseIcon,
    "sunset" : AnimatedSunsetIcon,
}

export type MeteoKey = keyof typeof meteoEmoji;

export const getWeatherIconKey = (weatherData : any): MeteoKey => {
    const isNight = weatherData.current.is_day === 0 ? true : false;

    const now = new Date().getTime();
    const sunriseTime = weatherData.daily.sunrise[0]?.getTime();
    const sunsetTime = weatherData.daily.sunset[0]?.getTime();

    const MARGIN_MINUTES = 20;
    const MARGIN_MS = MARGIN_MINUTES * 60 * 1000;

    if (sunriseTime && Math.abs(now - sunriseTime) <= MARGIN_MS) {
        return "sunrise";
    }

    if (sunsetTime && Math.abs(now - sunsetTime) <= MARGIN_MS) {
        return "sunset";
    }

    switch (weatherData.current.code) {
        // 0: Cielo Sereno
        case 0:
            return isNight ? "moon" : "sun";

        // 1, 2, 3: Prevalentemente sereno, Parzialmente nuvoloso, Coperto
        case 1:
        case 2:
            return isNight ? "cloudMoon" : "cloudSun";
        case 3:
            return "cloud";

        // 45, 48: Nebbia
        case 45:
        case 48:
            return "cloud";

        // 51, 53, 55, 56, 57: Pioviggine (Drizzle)
        // 61, 63, 65, 66, 67: Pioggia
        // 80, 81, 82: Rovesci di pioggia (Rain showers)
        case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:
            return "rain";

        // 71, 73, 75, 77: Neve
        // 85, 86: Rovesci di neve
        case 71: case 73: case 75: case 77: case 85: case 86:
            return "snow";

        // 95, 96, 99: Temporale / Temporale con grandine
        case 95: case 96:case 99:
            return "storm";

        default:
            return isNight ? "moon" : "sun";
    }
};
