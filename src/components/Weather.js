import React, { useState, useEffect } from "react";
import { RiUserFollowFill } from "react-icons/ri";
import axios from 'axios';


const WeatherAPI = () => {

  /// weather API

  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState('Get your daily message!');

  const quoteUrl = 'https://type.fit/api/quotes';

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
      // console.log(data);
      setWeatherData(data);
    };

    if (location.lat && location.lon) {
      fetchData();
    }
  }, [location]);

  ///////// MOTIVATION Quote API


  const fetchQuote = async () => {

    try {
        const response = await axios.get(quoteUrl);
        console.log(response);

        const quotes = response.data.filter(quote => quote.text.length <= 99);
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        setQuote(randomQuote.text);

    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchQuote();
  }, []);



  return (
    <div className="widget-container">
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
    <div className="widget">
    <div className='card_quote'>
      <p>{quote}</p>
   </div>
   <button className="btnn" onClick={fetchQuote}>
        Message for you!
      </button>
    </div>
    </div>
  );
};

export default WeatherAPI;
