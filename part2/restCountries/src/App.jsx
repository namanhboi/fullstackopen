import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_KEY;

const SearchBar = ({ search, onChangeSearch }) => {
  return (
    <div>
      <label htmlFor="searchBar">find countries</label>
      <input
        id="searchBar"
        type="text"
        value={search}
        onChange={(change) => onChangeSearch(change.target.value)}
      ></input>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  console.log(country);

  const [temp, setTemp] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=5&appid=${api_key}`
      )
      .then((response) => response.data)
      .then((response) => {
        const [lat, lon] = [response[0].lat, response[0].lon];
        return axios
          .get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
          )
          .then((response) => response.data);
      })
      .then(({ daily, ..._ }) => {
        setTemp(daily[0].temp.day);
        setWind(daily[0].wind_speed);
        setIcon(daily[0].weather[0].icon);
      });
  }, []);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages: </b>
      <ul>
        {Object.entries(country["languages"]).map(([key, lang]) => {
          console.log(country["languages"]);

          return <li key={key}>{lang}</li>;
        })}
      </ul>
      <img src={country.flags.png}></img>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}></img>
      <p>wind speed {wind} m/s</p>
    </div>
  );
};

const CountriesInfo = ({ countries }) => {
  console.log("hellow", countries);
  const [isInfoOpen, setIsInfoOpen] = useState(
    Object.fromEntries(countries.map((country) => [country.name.common, false]))
  );

  return countries.length > 10 ? (
    <p>Too many matches, please enter a more specific name</p>
  ) : countries.length === 1 ? (
    <CountryInfo country={countries[0]} />
  ) : (
    <div>
      {countries.map((country) => (
        <div>
          <p key={country.population}>
            {country.name.common}{" "}
            <button
              onClick={() =>
                setIsInfoOpen({
                  ...isInfoOpen,
                  [country.name.common]: ~isInfoOpen[country.name.common],
                })
              }
            >
              {isInfoOpen[country.name.common] ? "close" : "show"}
            </button>
          </p>
          {isInfoOpen[country.name.common] ? (
            <CountryInfo country={country}></CountryInfo>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, []);
  const onChangeSearch = (newSearch) => {
    setSearch(newSearch);
  };

  const matchingCountries = (countrySearch, countriesArr) => {
    return countriesArr.filter((country) =>
      country.name.common.toLowerCase().includes(countrySearch)
    );
  };

  return (
    <>
      <SearchBar search={search} onChangeSearch={onChangeSearch} />
      <CountriesInfo
        countries={matchingCountries(search, countries)}
      ></CountriesInfo>
    </>
  );
};

export default App;
