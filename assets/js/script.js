// targetting where the city name will be displayed
var cityName = document.querySelector("#city-search");

// targetting where the date will be displayed 
var currentDate = document.getElementById("date");

// targetting the form
var weatherFormEl = document.getElementById("city-form");

// targetting the button div
var buttons = document.getElementById("buttons");

// setting a variable to store the cities from local storage
var cities = [];

// targetting the input
var cityInputEl = document.getElementById("city");

currentDate.textContent = moment().format("M/DD/YYYY");

// loading cities from localstorage if they're there
var loadCities = function() {
    cities = JSON.parse(localStorage.getItem("cities"));
    if (!cities) {
        cities = []
    };
};

// getting city weather
var getCurrentCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=da47b6e8a518f806d11e4e81cc84a11f";
    //make request to the url
    fetch(apiUrl).then(function(response) {
//        console.log(response);
        response.json().then(function(data) {
            displayWeather(data, city);
        }); 
    });
};
// getting forcast
var getCityForcast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=da47b6e8a518f806d11e4e81cc84a11f";
 //   make request to the url
    fetch(apiUrl).then(function(response) {
//        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

var submitButton = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    loadCities();
    if (!cities.includes(cityName)) {
        cities.push(cityName);
    };
    localStorage.setItem("cities", JSON.stringify(cities));
    if (cityName) {
        getCurrentCityWeather(cityName);
        getCityForcast(cityName);
        cityInputEl.value="";
    } else {
        alert("Please enter a City name");
    }
};



var displayWeather = function(weather, searchTerm) {
    cityName.textContent = searchTerm;
    console.log(weather);
    console.log(weather.main.temp);
    console.log(weather.weather[0].icon);
    console.log(weather.main.humidity);
    console.log(searchTerm);
};

var createButtons = function() {
    cities.forEach(function() {
        var btn = document.createElement("button");
        btn.innerHTML = [].value;
        buttons.appendChild(btn);
    });
};


weatherFormEl.addEventListener("submit", submitButton);

loadCities();
createButtons();
console.log(cities);
//getCurrentCityWeather("London");
//getCityForcast("London"); 