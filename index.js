function formatTime(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satrday"
  ];
  let currentDay = days[now.getDay()];
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}  ${currentHours}:${currentMinutes}`;
}
let current = document.querySelector("#date");
let now = new Date();
current.innerHTML = formatTime(now);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity:${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}km`;
  document.querySelector("#discription").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "6b1ad2b1489fef19b8767763765b92f8";
  let serchInput = document.querySelector("#type-city").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${serchInput}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#type-city").value;
  search(city);
}

let chooseCity = document.querySelector("#city-input");
chooseCity.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6b1ad2b1489fef19b8767763765b92f8";
  let units = "metric";
  let apiEndPoint = `http://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentPosition(event) {
  event.preventDefault();
}
navigator.geolocation.getCurrentPosition(showPosition);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);