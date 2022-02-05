import axios from 'axios';

const requestConfig = axios.create({
  urlBase: 'https://api.openweathermap.org/data/2.5/',
  apiKey: 'ac07016af89b69efc7c7b4d0f13516e0'
})

export default requestConfig;