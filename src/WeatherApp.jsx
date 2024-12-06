import { useState } from "react";
import "./WeatherApp.css";
export const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "YOUR_API_KEY";
  const difKelvin = 273.15; // Restamos este valor para convertir la temp a grados celsius

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`);
      const data = await response.json();

      //Para validar que le pasemos al weatherData un objeto válido
      if (data.cod == "200") {
        setWeatherData(data);
      } else {
        console.error("No existe una ciudad que se llame ", city);
      }
    } catch (error) {
      console.error("Ha ocurrido un problema ", error);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherData();
    }
  };

  return (
    <div className="container">
      <h1>Aplicación del clima</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Ingresa una ciudad"
          value={city}
          onChange={({ target }) => setCity(target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {weatherData && (
        <div className="cotainer">
          <h2>{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
          <p>
            La temperatura actual es{" "}
            {Math.floor(weatherData.main.temp - difKelvin)}°C
          </p>
          <p>
            La condición meteorológica actual es: {weatherData.weather[0].main}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Icono sobre el clima"
          />
        </div>
      )}
    </div>
  );
};
