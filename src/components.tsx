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
    const [hour, setHour] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setHour(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const optionHour: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit'};
    const optionDate: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' };


    return (
        <div className='p-5 h-fit w-fit flex gap-5 items-center border-2 border-white rounded-[20px]'>
            <SeasonalIcon></SeasonalIcon>
            <div className='flex-col gap-5 '>
                <h1 className="text-7xl">
                    {hour.toLocaleTimeString('it-IT', optionHour)}
                </h1>
                <p className="text-xl ml-2 capitalize">
                    {hour.toLocaleDateString('it-IT', optionDate)}
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
    const [hour, setHour] = useState<number>(0)

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
        let date = new Date();
        setHour(date.getHours());
    }, []);

    if (loading) {
        return <div className="text-zinc-400">Caricamento meteo...</div>;
    }

    if (!weatherData) {
        return <div className="text-red-400">Impossibile caricare i dati.</div>;
    }

    return (
        <div className='p-5 h-fit w-fit flex flex-col items-start center gap-5 border-2 border-white rounded-[20px]'>
            <div className='h-fit w-fit flex gap-5 items-center'>
                <CurrentWeatherCard weatherData={weatherData}></CurrentWeatherCard>
                <div className='flex-col gap-5 '>
                    <h1 className="text-xl">
                        Temperature:{' '}
                        <span className='font-bold'>{weatherData?.current?.temperature_2m.toFixed(2) ?? "--"} °C</span>
                    </h1>
                    <h1 className="text-xl">
                        Apparent Temp.:{' '}
                        <span className='font-bold'>{weatherData?.current?.apparent_temperature.toFixed(2) ?? "--"} °C</span>
                    </h1>
                    <h1 className="text-xl">
                        Relative Humidity:{' '}
                        <span className='font-bold'>{weatherData?.current?.relative_humidity_2m.toFixed(2) ?? "--"} %</span>
                    </h1>
                    <h1 className="text-xl">
                        Precipitation Prob.:{' '}
                        <span className='font-bold'>{weatherData?.hourly?.precipitation_probability[hour].toFixed(2) ?? "--"} %</span>
                    </h1>
                </div>

            </div>
            <div className='h-fit w-fit flex gap-5 items-center'>
                <AnimatedWindIcon></AnimatedWindIcon>
                <div className='flex-col gap-5 '>
                    <h1 className="text-xl">
                        Wind 10m:{' '}
                        <span className='font-bold'>{weatherData?.current?.wind_speed_10m.toFixed(2) ?? "--"} km/h</span>
                        <div>
                        <h1 className="text-xl font-medium">
                            Direction:{' '}
                            <span className="font-bold">
                                {getWindDirectionCardinal(weatherData?.current?.wind_direction_10m)} ({weatherData?.current?.wind_direction_10m !== undefined && weatherData?.current?.wind_direction_10m !== null ? weatherData?.current?.wind_direction_10 : "--"}°)
                            </span>
                        </h1>
                        </div>
                    </h1>
                </div>
                <WindDirection weatherData={weatherData}></WindDirection>
            </div>
        </div>
    );
}

function getWindDirectionCardinal(degrees?: number): string {
    if (degrees === undefined || degrees === null) return "--";

    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const windTargetDegrees = (degrees + 180) % 360;

    const index = Math.round(windTargetDegrees / 22.5) % 16;
    return directions[index];
}


export function WindDirection({ weatherData }: { weatherData: any }) {
    const degrees = weatherData?.current?.wind_direction_10m;
    const cardinal = getWindDirectionCardinal(degrees);

    const rotationStyle = degrees !== undefined && degrees !== null ? { transform: `rotate(${(degrees + 180)}deg)` } : {};

    return (
        <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 rounded-full border-1 border-slate-300 flex items-center justify-center select-none">

            <span className="absolute top-0.5 text-xl font-bold text-blue-500">N</span>
            <span className="absolute right-1 text-xl font-bold text-slate-400">E</span>
            <span className="absolute bottom-0.5 text-xl font-bold text-slate-400">S</span>
            <span className="absolute left-1 text-xl font-bold text-slate-400">O</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500 transition-transform duration-500 ease-out"
                style={rotationStyle}
            >
                <path d="M9 16a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H3.707a.707.707 0 0 1-.5-1.207l6.939-6.939a1.207 1.207 0 0 1 1.708 0l6.94 6.94a.707.707 0 0 1-.5 1.206H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1z"/>
                <path d="M15 20H9"/>
            </svg>
        </div>
    </div>
    );
}

export const CurrentWeatherCard = ({ weatherData }: { weatherData: any }) => {
    const iconKey = getWeatherIconKey(weatherData);

    const IconComponent = meteoEmoji[iconKey];

    return (
        <div className="weather-card">
            <IconComponent width={90} height={90} />
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
        // 0: Normal Sky
        case 0:
            return isNight ? "moon" : "sun";

        // 1, 2, 3: Cloudy
        case 1:
        case 2:
            return isNight ? "cloudMoon" : "cloudSun";
        case 3:
            return "cloud";

        // 45, 48: Fog
        case 45:
        case 48:
            return "cloud";

        // 51, 53, 55, 56, 57: Drizzle
        // 61, 63, 65, 66, 67: Rain
        // 80, 81, 82: Rain showers
        case 51: case 53: case 55: case 56: case 57: case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82:
            return "rain";

        // 71, 73, 75, 77: Snow
        // 85, 86: Snow storm
        case 71: case 73: case 75: case 77: case 85: case 86:
            return "snow";

        // 95, 96, 99: Storm
        case 95: case 96:case 99:
            return "storm";

        default:
            return isNight ? "moon" : "sun";
    }
};




interface TaskProps{
    name: string;
    description: string;
    time: Date;
    place: string;
    other: string
}

export function Task({
    name,
    description,
    time,
    place = "Home",
    other = "none, maybe re-check"
} : TaskProps) {

}

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

    const lang = import.meta.env.VITE_LANG;

    const monthName = new Intl.DateTimeFormat(lang, {
        month: 'long',
        year: 'numeric'
    }).format(currentDate);

    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(2026, 0, 5 + i);
        return new Intl.DateTimeFormat(lang, { weekday: 'narrow' }).format(date);
    });

    const isToday = (day: number) => {
        const now = new Date();
        return (
            day === now.getDate() &&
            month === now.getMonth() &&
            year === now.getFullYear()
        );
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    return (
        <div className="w-80 font-sans border border-white p-4 rounded-xl shadow-sm ">
            <div className="flex items-center justify-between mb-3">
                <button
                    onClick={handlePrevMonth}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Mese precedente"
                >
                    ‹
                </button>
                <h3 className="capitalize font-semibold text-center text-white">
                    {monthName}
                </h3>
                <button
                    onClick={handleNextMonth}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Mese successivo"
                >
                    ›
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center">
                {weekDays.map((day, i) => (
                    <strong key={i} className="text-xs text-gray-500 py-1 uppercase">
                        {day}
                    </strong>
                ))}

                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="py-2" />
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const active = isToday(day);
                    return (
                        <div
                            key={day}
                            className={`py-2 text-sm rounded-full transition-colors cursor-pointer ${
                                active
                                    ? 'bg-blue-600 text-white font-bold'
                                    : 'border-2 border-white text-white hover:bg-gray-100'
                            }`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
