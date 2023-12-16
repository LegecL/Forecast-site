function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#weather-place-city");
  let descriptionElement = document.querySelector("#condition-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#day-time");
  let monthElement = document.querySelector("#month-date");
  let iconElement = document.querySelector("#icon");

  console.log(response);

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  monthElement.innerHTML = formatMonth(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  cityElement.innerHTML = response.data.city;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayWord = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${dayWord}, ${hour}:${minutes}`;
}

function formatMonth(date) {
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthWord = month[date.getMonth()];
  let dateValue = date.getDate();
  return `${monthWord}, ${dateValue}`;
}

function searchCity(city) {
  let apiKey = "fa29c710ebc43ec2tbd44083o39347b6";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "fa29c710ebc43ec2tbd44083o39347b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="column-day">
    <div class="forecast-days">${formatDay(day.time)}</div>
    <div>
    <img src="${day.condition.icon_url}" class="forecast-icon" />
    </div>
    <div class="forecast-temperature">
      <span class="forecast-max-day-temperature">${Math.round(
        day.temperature.maximum
      )}&deg;</span>
      <span class="forecast-min-day-temperature">${Math.round(
        day.temperature.minimum
      )}&deg;</span>
    </div>
  </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Kyiv");
