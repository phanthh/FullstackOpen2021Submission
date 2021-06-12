import { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
const CountryView = ({ country, showImd }) => {
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;
  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get(url).then((res) => {
      setWeatherData(res.data.current);
    });
  }, []);

  return show || showImd ? (
    <div>
      <h1>
        {country.name}{" "}
        {showImd ? null : <button onClick={() => setShow(!show)}>hide</button>}
      </h1>
      <p>
        <strong>Capital: </strong>
        {country.capital}
      </p>

      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} width="100" />

      {weatherData ? (
        <>
          <h2>Weather in {country.capital}</h2>
          <p>
            <strong>{weatherData.weather_descriptions[0]}</strong>
          </p>
          <p>
            <strong>Temperature: </strong> {weatherData.temperature} Celcius
          </p>
          <p>
            <strong>UV Index: </strong> {weatherData.uv_index}
          </p>
          <p>
            <strong>Visibility: </strong> {weatherData.visibility}
          </p>
          <img
            src={weatherData.weather_icons[0]}
            alt={weatherData.weather_descriptions[0]}
          />
          <p>
            <strong>Wind: </strong> {weatherData.wind_speed} mph direction{" "}
            {weatherData.wind_dir}
          </p>
        </>
      ) : null}
    </div>
  ) : (
    <div>
      <p>
        {country.name} <button onClick={() => setShow(!show)}>show</button>
      </p>
    </div>
  );
};

export default CountryView;
