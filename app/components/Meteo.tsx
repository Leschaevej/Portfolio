'use client';

import { useEffect, useState } from 'react';
import '../components/Meteo.scss';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiHumidity } from 'react-icons/wi';
import { FiMapPin } from 'react-icons/fi';


interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
}

function getWeatherIcon(code: number) {
  if (code === 0) return <WiDaySunny size={48} color="#f39c12" />;
  if ([1, 2, 3].includes(code)) return <WiCloudy size={48} color="#95a5a6" />;
  if ([45, 48].includes(code)) return <WiFog size={48} color="#7f8c8d" />;
  if ([51, 53, 55, 61, 63, 65].includes(code)) return <WiRain size={48} color="#3498db" />;
  if ([71, 73, 75].includes(code)) return <WiSnow size={48} color="#ecf0f1" />;
  if ([95, 96, 99].includes(code)) return <WiThunderstorm size={48} color="#9b59b6" />;
  return <WiDaySunny size={48} color="#f39c12" />;
}

export default function Meteo() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      const latitude = 43.529742;
      const longitude = 5.447427;

      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m`
        );
        const data = await res.json();

        const currentTime = data.current_weather.time;
        const humidityIndex = data.hourly.time.indexOf(currentTime);

        setWeather({
          temperature: data.current_weather.temperature,
          windSpeed: data.current_weather.windspeed,
          humidity: humidityIndex !== -1 ? data.hourly.relative_humidity_2m[humidityIndex] : 0,
          weatherCode: data.current_weather.weathercode,
        });
      } catch (error) {
        console.error('Erreur météo:', error);
      }
    }

    fetchWeather();
  }, []);

  if (!weather) return <div>Chargement météo...</div>;

  return (
    <div className="weatherContainer">
        <p className="location"><FiMapPin className="logo"/>Aix en Provence</p>
        <div className="weatherCondition">
            <div className="weather">
                <p className="weatherCode">{getWeatherIcon(weather.weatherCode)}</p>
                <p className="temperature">{weather.temperature}°C</p>
            </div>
            <div className="condition">
            <div className="wind">
                <WiStrongWind className="logo"/>
                <span>{weather.windSpeed} km/h</span>
            </div>
            <div className="humidity">
                <WiHumidity className="logo"/>
                <span>{weather.humidity}%</span>
            </div>
            </div>
        </div>
    </div>

  );
}
