const LATITUDE = 43.53;
const LONGITUDE = 5.45;
export const revalidate = 600;
interface WeatherData {
    temperature: number;
    windSpeed: number;
    humidity: number;
    weatherCode: number;
}
export async function GET() {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&hourly=relative_humidity_2m,windspeed_10m`,
            {
                next: { revalidate: 600 },
            }
        );
        if (!response.ok) {
            throw new Error(`Open-Meteo API status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.current_weather) {
            return new Response(
                JSON.stringify({ error: 'Format de réponse invalide' }),
                { status: 500 }
            );
        }
        const currentTime = data.current_weather.time;
        const humidityIndex = data.hourly?.time?.indexOf(currentTime) ?? -1;
        const weatherData: WeatherData = {
            temperature: data.current_weather.temperature,
            windSpeed: data.current_weather.windspeed,
            humidity: humidityIndex !== -1 ? data.hourly.relative_humidity_2m[humidityIndex] : 0,
            weatherCode: data.current_weather.weathercode,
        };
        return new Response(JSON.stringify(weatherData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
            },
        });
    } catch (error) {
        console.error('Erreur fetch météo:', error);
        return new Response(
            JSON.stringify({ error: 'Erreur interne serveur' }),
            { status: 500 }
        );
    }
}