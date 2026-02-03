const Url =
  "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current_weather=true";

async function getWeather() {
  const response = await fetch(Url);
  const data = await response.json();

  // MAIN weather object
  const weather = data.current_weather;

  console.log("Temperature:", weather.temperature);
  console.log("Wind Speed:", weather.windspeed);
  console.log("Wind Direction:", weather.winddirection);
  console.log("Weather Code:", weather.weathercode);
  console.log("Time:", weather.time);
}

getWeather();
