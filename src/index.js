function formatDate(timestamp){
  let date=new Date(timestamp);
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
  let day=days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
  let date=new Date(timestamp);
  let hours=date.getHours();
  if(hours<10){
    hours=`0${hours}`;
  }
  let minutes=date.getMinutes();
   if(minutes<10){
    minutes=`0${minutes}`;
  }
return `${hours}:${minutes}`
}

function displayForecast(response){
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for(let index=0; index<6; index++){
    let forecast=response.data.list[index];
    forecastElement.innerHTML+=`
  <div class="col-4">
            <div class="card" style="width: 100px;">
              <div class="card-body">
                <h5 class="card-title">${formatHours(forecast.dt*1000)}</h5>
                <p class="card-text">
                     <img src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon}@2x.png"
      />
                  <strong>${Math.round(forecast.main.temp_max)}</strong>/${Math.round(forecast.main.temp_min)}
                </p>
              </div>
            </div>
          </div>`;
  }
}

function search(city) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;
  
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;
    let iconElement=document.querySelector(`#icon`);
    iconElement.setAttribute(`src`,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)
    let currentDateApp = document.querySelector("#currentTime");
    currentDateApp.innerHTML=formatDate(response.data.dt*1000)

}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let celsiusTemperature=null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchCurrentLocation(position) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector(`#clButtonId`);
currentLocationButton.addEventListener("click", getCurrentLocation);
search("Amsterdam");

function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(`#temperature`)
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(`#temperature`)
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let fahrenheitLink=document.querySelector(`#fahrenheit-link`)
fahrenheitLink.addEventListener(`click`,displayFahrenheitTemp);

let celsiusLink=document.querySelector(`#celsius-link`)
celsiusLink.addEventListener(`click`,displayCelsiusTemp);


