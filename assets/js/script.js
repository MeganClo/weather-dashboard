var weatherContainer = document.getElementById("weather-container");
var cityName = document.querySelector("#city-search");
// targetting the form
var weatherFormEl = document.getElementById("city-form");
// targetting the input
var cityInputEl = document.getElementById("city");

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
    if (cityName) {
        getCurrentCityWeather(cityName);
        getCityForcast(cityName);
        cityInputEl.value="";
    } else {
        alert("Please enter a City name");
    }
};

var displayWeather = function(weather, searchTerm) {
    //clearing the old data
    weatherContainer.textContent = "";
    cityName.textContent = searchTerm;
    console.log(weather);
    console.log(weather.main.temp);
    console.log(searchTerm);
}

weatherFormEl.addEventListener("submit", submitButton);


//getCurrentCityWeather("London");
//getCityForcast("London"); 
