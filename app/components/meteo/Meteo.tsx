'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import './Meteo.scss';
import { WiDaySunny } from "@react-icons/all-files/wi/WiDaySunny";
import { WiCloudy } from "@react-icons/all-files/wi/WiCloudy";
import { WiRain } from "@react-icons/all-files/wi/WiRain";
import { WiSnow } from "@react-icons/all-files/wi/WiSnow";
import { WiThunderstorm } from "@react-icons/all-files/wi/WiThunderstorm";
import { WiFog } from "@react-icons/all-files/wi/WiFog";
import { WiStrongWind } from "@react-icons/all-files/wi/WiStrongWind";
import { WiHumidity } from "@react-icons/all-files/wi/WiHumidity";
import { FiMapPin } from "@react-icons/all-files/fi/FiMapPin";

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

export default function Meteo() {
    const [mounted, setMounted] = useState(false);
    const { data: weather, error } = useSWR<WeatherData>(mounted ? '/api/weather' : null, fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 600000,
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (weather) {
            try {
                localStorage.setItem(CACHE_KEY, JSON.stringify(weather));
            } catch {}
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