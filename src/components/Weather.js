import React, { useState, useEffect } from "react";


const WeatherAPI = () => {

  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          setError("Can't process your local weather");
        }
      );
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      //hide api key with.env
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const { lat, lon } = location;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setWeatherData(data);
    };

    if (location.lat && location.lon) {
      fetchData();
    }
  }, [location]);

  return (
    <div className="section">
      {error ? (
        <p>{error}</p>
      ) : weatherData.main ? (
        <div className="widget">
          <div className="ticker">
          <div className="city">{(weatherData.name)}</div>
          <div className="temp">Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</div>
          <div className="temp">Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)}°C</div>
          <div className="temp">Humidity: {weatherData.main.humidity}%</div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherAPI;
