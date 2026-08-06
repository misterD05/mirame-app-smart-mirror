import { fetchWeatherApi } from "openmeteo";


const latitude_env = Number(import.meta.env.VITE_LAT || 0);
const longitude_env = Number(import.meta.env.VITE_LONG || 0);
const url = "https://api.open-meteo.com/v1/forecast";



const params = {
	latitude: latitude_env,
	longitude: longitude_env,
	daily: ["weather_code", "temperature_2m_min", "temperature_2m_max", "apparent_temperature_min", "apparent_temperature_max", "uv_index_max", "wind_speed_10m_max", "wind_direction_10m_dominant", "sunrise", "sunset"],
	hourly: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "precipitation_probability", "weather_code", "wind_speed_10m", "wind_speed_80m", "wind_direction_80m", "wind_direction_10m", "wind_speed_120m", "wind_speed_180m", "wind_direction_120m", "wind_direction_180m", "wind_gusts_10m"],
	current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "wind_speed_10m", "wind_direction_10m", "weather_code", "is_day"],
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
	const sunrise = daily.variables(8)!;
	const sunset = daily.variables(9)!;

	// Note: The order of weather variables in the URL query and the indices below need to match!
	const weatherData = {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			temperature_2m: current.variables(0)!.value(),
			relative_humidity_2m: current.variables(1)!.value(),
			apparent_temperature: current.variables(2)!.value(),
			wind_speed_10m: current.variables(3)!.value(),
			wind_direction_10m: current.variables(4)!.value(),
			weather_code: current.variables(5)!.value(),
			is_day: current.variables(6)!.value(),
		},
		hourly: {
			time: Array.from(
				{ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
				(_ , i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
			),
			temperature_2m: hourly.variables(0)!.valuesArray(),
			relative_humidity_2m: hourly.variables(1)!.valuesArray(),
			apparent_temperature: hourly.variables(2)!.valuesArray(),
			precipitation_probability: hourly.variables(3)!.valuesArray(),
			weather_code: hourly.variables(4)!.valuesArray(),
			wind_speed_10m: hourly.variables(5)!.valuesArray(),
			wind_speed_80m: hourly.variables(6)!.valuesArray(),
			wind_direction_80m: hourly.variables(7)!.valuesArray(),
			wind_direction_10m: hourly.variables(8)!.valuesArray(),
			wind_speed_120m: hourly.variables(9)!.valuesArray(),
			wind_speed_180m: hourly.variables(10)!.valuesArray(),
			wind_direction_120m: hourly.variables(11)!.valuesArray(),
			wind_direction_180m: hourly.variables(12)!.valuesArray(),
			wind_gusts_10m: hourly.variables(13)!.valuesArray(),
		},
		daily: {
			time: Array.from(
				{ length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
				(_ , i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
			),
			weather_code: daily.variables(0)!.valuesArray(),
			temperature_2m_min: daily.variables(1)!.valuesArray(),
			temperature_2m_max: daily.variables(2)!.valuesArray(),
			apparent_temperature_min: daily.variables(3)!.valuesArray(),
			apparent_temperature_max: daily.variables(4)!.valuesArray(),
			uv_index_max: daily.variables(5)!.valuesArray(),
			wind_speed_10m_max: daily.variables(6)!.valuesArray(),
			wind_direction_10m_dominant: daily.variables(7)!.valuesArray(),
			// Map Int64 values to according structure
			sunrise: [...Array(sunrise.valuesInt64Length())].map(
				(_ , i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
			),
			// Map Int64 values to according structure
			sunset: [...Array(sunset.valuesInt64Length())].map(
				(_ , i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
			),
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
