var weatherContainer = document.getElementById("weather-container");
//targetting the span to put the city name in
var cityName = document.querySelector("#city-search");
// targetting the form
var weatherFormEl = document.getElementById("city-form");
// targetting the input
var cityInputEl = document.getElementById("city");

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=da47b6e8a518f806d11e4e81cc84a11f";

// getting city weather
var getCurrentCityWeather = function(city) {


    //make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data.main.temp);
        }); 
    });
};

// getting forcast
var getCityForcast = function(city) {

 //   make request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {

            });
        } else {
            alert("Error: " + response.statusText);
        }
        })
        .catch(function(error) {
            alert("Unable to See Weather");
        });
};



var submitButton = function(event) {
    event.preventDefault();
    cityName.textContent = cityInputEl.value.trim();



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

//    console.log(searchTerm);
//    console.log(cityName);
//    console.log(cityName.textContent);
};

weatherFormEl.addEventListener("submit", submitButton);


//getCurrentCityWeather("London");
//getCityForcast("London");