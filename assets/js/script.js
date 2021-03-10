// targetting where the city name will be displayed
var cityName = document.querySelector("#city-search");

// targetting where the date will be displayed 
var currentDate = document.getElementById("date");

// targetting the form
var weatherFormEl = document.getElementById("city-form");

// setting a variable to store the cities from local storage
var cities = [];

// targetting the input
var cityInputEl = document.getElementById("city");

currentDate.textContent = moment().format("M/DD/YYYY");

// loading cities from localstorage if they're there
var loadCities = function() {
    cities = JSON.parse(localStorage.getItems("cities"));

    if (!cities) {
        cities = [];
    }
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
    cities.push(cityName);
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
    console.log(searchTerm);
}

weatherFormEl.addEventListener("submit", submitButton);


//getCurrentCityWeather("London");
//getCityForcast("London"); 
