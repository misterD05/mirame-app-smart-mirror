import { fetchWeatherApi } from "openmeteo";


const latitude_env = Number(import.meta.env.VITE_LAT || 0);
const longitude_env = Number(import.meta.env.VITE_LONG || 0);
const url = "https://api.open-meteo.com/v1/forecast";



const params = {
	latitude: latitude_env,
	longitude: longitude_env,
	daily: ["temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "uv_index_max", "wind_speed_10m_max", "wind_direction_10m_dominant"],
	hourly: ["temperature_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "evapotranspiration", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m", "uv_index", "is_day", "sunshine_duration",  "weather_code"],
	current: ["temperature_2m", "apparent_temperature", "is_day"],
	cell_selection: "nearest",
};

export async function callOpenMeteo() {
	const responses = await fetchWeatherApi(url, params);

	// Process first location. Add a for-loop for multiple locations or weather models
	const response = responses[0];

	// Attributes for timezone and location
	const latitude = response.latitude();
	const longitude = response.longitude();
	const elevation = response.elevation();
	const utcOffsetSeconds = response.utcOffsetSeconds();

	console.log(
		`\nCoordinates: ${latitude}°N ${longitude}°E`,
		`\nElevation: ${elevation}m asl`,
		`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
	);

	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	// Define Int64 variables so they can be processed accordingly
	const sunrise = daily.variables(4)!;
	const sunset = daily.variables(5)!;

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			temperature_2m: current.variables(0)!.value(),
			apparent_temperature: current.variables(1)!.value(),
			is_day: current.variables(2)!.value(),
		},
		hourly: {
			time: Array.from(
				{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
				(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
			),
			temperature_2m: hourly.variables(0)!.valuesArray(),
			apparent_temperature: hourly.variables(1)!.valuesArray(),
			precipitation_probability: hourly.variables(2)!.valuesArray(),
			precipitation: hourly.variables(3)!.valuesArray(),
			rain: hourly.variables(4)!.valuesArray(),
			evapotranspiration: hourly.variables(5)!.valuesArray(),
			wind_speed_10m: hourly.variables(6)!.valuesArray(),
			wind_speed_80m: hourly.variables(7)!.valuesArray(),
			wind_direction_10m: hourly.variables(8)!.valuesArray(),
			wind_direction_80m: hourly.variables(9)!.valuesArray(),
			uv_index: hourly.variables(10)!.valuesArray(),
			is_day: hourly.variables(11)!.valuesArray(),
			sunshine_duration: hourly.variables(12)!.valuesArray(),
			weather_code: hourly.variables(1)!.valuesArray(),
		},
		daily: {
			time: Array.from(
				{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
				(_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
			),
			temperature_2m_max: daily.variables(0)!.valuesArray(),
			temperature_2m_min: daily.variables(1)!.valuesArray(),
			apparent_temperature_max: daily.variables(2)!.valuesArray(),
			apparent_temperature_min: daily.variables(3)!.valuesArray(),
			// Map Int64 values to according structure
			sunrise: [...Array(sunrise.valuesInt64Length())].map(
				(_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
			),
			// Map Int64 values to according structure
			sunset: [...Array(sunset.valuesInt64Length())].map(
				(_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
			),
			daylight_duration: daily.variables(6)!.valuesArray(),
			uv_index_max: daily.variables(7)!.valuesArray(),
			wind_speed_10m_max: daily.variables(8)!.valuesArray(),
			wind_direction_10m_dominant: daily.variables(9)!.valuesArray(),
		},
	};

	return weatherData;
}

/*// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log(
	`\nCurrent time: ${weatherData.current.time}\n`,
	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
	`\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
	`\nCurrent is_day: ${weatherData.current.is_day}`,
);
console.log("\nHourly data:\n", weatherData.hourly)
console.log("\nDaily data:\n", weatherData.daily)
 */
