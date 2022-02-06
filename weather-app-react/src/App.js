import './App.css';
import { useState } from 'react';
import requestConfig from './ApiConfig/requestConfig';
import DateComponent from './Components/Date';
function App() {
  const [query, setQuery] = useState([]);

  const [results, setResults] = useState({});

  const handleSearchBar = (event) => {
    event.preventDefault();
    if (event.target.value.trim() === ' ') return;
    const separatingValues = event.target.value;
    setQuery(separatingValues);
  }

  const fetchWeather = (event) => {
    if (event.key === 'Enter') {
      requestConfig.get(`https://api.openweathermap.org/data/2.5/weather?lat=${query.split(' ')[0]}&lon=${query.split(' ')[1]}&units=metric&appid=ac07016af89b69efc7c7b4d0f13516e0`)
        .then((res) => {
          console.log('res', res);
          setResults(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div className="App">
      <main>
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
                  <DateComponent/>
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
    </div>
  );
}

export default App;
