// getting city weather
var getCurrentCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=da47b6e8a518f806d11e4e81cc84a11f";

    //make request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        }); 
    });
};

// getting forcast
var getCityForcast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid=40294c6c026c149fa301c764eea53d3a";

    //make request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

// targetting the form
var weatherFormEl = document.getElementById("city-form");

// targetting the input
var cityInputEl = document.getElementById("city");

var submitButton = function(event) {
    event.preventDefault();
    console.log(event);
};

weatherFormEl.addEventListener("submit", submitButton);


getCurrentCityWeather("London");
getCityForcast("London");