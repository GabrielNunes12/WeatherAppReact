import './App.css';
import { useState } from 'react';
import DateComponent from './Components/Date';
import { ThemeProvider } from "styled-components";
import {Axios as axios} from "axios";
import { darkTheme, lightTheme, GlobalStyles } from './Styles/index';
import { apiKey, baseUrl } from './ApiConfig/Connection';

function App() {
  const [query, setQuery] = useState([]);

  const [theme, setTheme] = useState('light');
  const [results, setResults] = useState({});

  const handleSearchBar = (event) => {
    event.preventDefault();
    if (event.target.value.trim() === ' ' || event.target.value.trimstart(' ') === ' ') return;
    const separatingValues = event.target.value;
    setQuery(separatingValues);
  }

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  const fetchWeather = (event) => {
    if (event.key === 'Enter') {
      axios.get(`${baseUrl}weather?lat=${query.split(' ')[0]}&lon=${query.split(' ')[1]}&units=metric&appid=${apiKey}`)
        .then((res) => {
          setResults(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <main>
          <label className="switch">
            <input type="checkbox" onClick={themeToggler} />
            <span className="slider round"></span>
          </label>
          <div className="search-box">
            <input
              className="search-bar"
              placeholder="Please, inform the coordinates..."
              onChange={handleSearchBar}
              onKeyPress={fetchWeather}
            />
          </div>
          {results.main && results.name.length !== 0 ?
            (
              <>
                <div
                  className="weather-wrap"
                >
                  <div className="location-box">
                    <div className="location">
                      {results.name}, {results.sys.country}
                    </div>
                    <DateComponent />
                  </div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(results.main.temp).toFixed(1)}ºC
                  </div>
                  <div className="weather">
                    {results.weather[0].main}
                  </div>
                </div>
              </>
            )
            :
            (
              <div
                className="weather-wrap"
              >
                <div className="location-box">
                  <div className="location">
                    Country not found
                  </div>
                </div>
              </div>
            )
          }
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
