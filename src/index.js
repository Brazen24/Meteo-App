//function to update the weather information on the webpage

function refreshWeather(response) {
  //selecting HTML elements where weather data will be displayed
  let temperatureElement = document.querySelector("#temperature");

  let cityElement = document.querySelector("#city");

  let descriptionElement = document.querySelector("#description");

  let humidityElement = document.querySelector("#humidity");

  let windSpeedElement = document.querySelector("#wind-speed");

  let timeElement = document.querySelector("#time");

  let iconElement = document.querySelector("#icon");
  // Extracting relevant data from the API response
  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000); // Convert timestamp to a Date object

  // Update the HTML elements with the extracted weather data
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date); // Format the date and time using a helper function
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

// Function to format date and time into a readable format
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  // Add a leading zero to minutes if less than 10 for consistent formatting
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  // Return formatted date and time string (e.g., "Monday 14:05"
  return `${day} ${hours}:${minutes}`;
}

// Function to fetch weather data for a given city using the Weather API
function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  // Make an API call using Axios and call refreshWeather with the response
  axios.get(apiUrl).then(refreshWeather);
}
// Function to handle the form submission event
function handleSearchSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behaviour
  let searchInput = document.querySelector("#search-form-input"); // Get the user input from the form

  // Call searchCity with the user's input
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

// Add an event listener to the search form to handle form submissions
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default city to display weather information when the page loads
searchCity("Paris");
displayForecast();
