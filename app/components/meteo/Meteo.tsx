'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
import './Meteo.scss';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog, WiStrongWind, WiHumidity } from 'react-icons/wi';
import { FiMapPin } from 'react-icons/fi';

interface WeatherData {
    temperature: number;
    windSpeed: number;
    humidity: number;
    weatherCode: number;
}

const CACHE_KEY = 'meteo-cache';

const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) throw new Error('Erreur API météo');
    return res.json();
});

function getWeatherIcon(code: number) {
    if (code === 0) return <WiDaySunny className="icone" color="#f39c12" />;
    if ([1, 2, 3].includes(code)) return <WiCloudy className="icone" color="#95a5a6" />;
    if ([45, 48].includes(code)) return <WiFog className="icone" color="#7f8c8d" />;
    if ([51, 53, 55, 61, 63, 65].includes(code)) return <WiRain className="icone" color="#3498db" />;
    if ([71, 73, 75].includes(code)) return <WiSnow className="icone" color="#ecf0f1" />;
    if ([95, 96, 99].includes(code)) return <WiThunderstorm className="icone" color="#9b59b6" />;
    return <WiDaySunny className="icone" color="#f39c12" />;
}

function getCache(): WeatherData | undefined {
    if (typeof window === 'undefined') return undefined;
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : undefined;
    } catch {
        return undefined;
    }
}

export default function Meteo() {
    const { data: weather, error } = useSWR<WeatherData>('/api/weather', fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 600000,
        fallbackData: getCache(),
    });

    useEffect(() => {
        if (weather) {
            localStorage.setItem(CACHE_KEY, JSON.stringify(weather));
        }
    }, [weather]);
    const isLoading = !weather && !error;
    return (
        <div className="conteneur">
            <p className="location"><FiMapPin className="logo"/>Aix en Provence</p>
            <div className="conditions">
                <div className="weather">
                    {error ? (
                        <p className="error">Erreur</p>
                    ) : isLoading ? (
                        <>
                            <span className="skeleton skeleton-icon" />
                            <span className="skeleton skeleton-temp" />
                        </>
                    ) : (
                        <>
                            <p className="code">{getWeatherIcon(weather!.weatherCode)}</p>
                            <p className="temperature">{weather!.temperature}°C</p>
                        </>
                    )}
                </div>
                <div className="condition">
                    <div className="wind">
                        <WiStrongWind className="logo"/>
                        {error ? (
                            <span>--</span>
                        ) : isLoading ? (
                            <span className="skeleton skeleton-value" />
                        ) : (
                            <span>{weather!.windSpeed} km/h</span>
                        )}
                    </div>
                    <div className="humidity">
                        <WiHumidity className="logo"/>
                        {error ? (
                            <span>--</span>
                        ) : isLoading ? (
                            <span className="skeleton skeleton-value" />
                        ) : (
                            <span>{weather!.humidity}%</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}