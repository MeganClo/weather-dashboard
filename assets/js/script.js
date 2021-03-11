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
            displayForcast(data, city);
        });
    });
};

var submitButton = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    var btn = document.createElement("button");
    btn.className =  "city-buttons";
    btn.innerHTML = cityName;
    buttons.appendChild(btn);
    loadCities();
    if (!cities.includes(cityName) && (cityName != "")) {
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

var displayForcast = function(forcast, searchTerm) {
    cityName.textContent = searchTerm;
    console.log(forcast);
    console.log(forcast.city.name);
    console.log(forcast.list[1].main.temp);
    console.log(forcast.list[1].main.humidity);
    console.log(forcast.list[1].dt_txt);
    console.log(forcast.list[1].weather[0].icon);

};

var createButtons = function() {
    for (var i = 0; i < cities.length; i++) {
        console.log(cities[i]);
        var btn = document.createElement("button");
        btn.className = "city-buttons"
        btn.innerHTML = cities[i];
        buttons.appendChild(btn);
    };
    // targetting the city buttons
    var cityButtons = document.querySelectorAll(".city-buttons");
    console.log(cityButtons);
    for (var i =0; i < cityButtons.length; i ++) {
        cityButtons[i].addEventListener("click", function(event) {
            getCurrentCityWeather(event.target.textContent);
            getCityForcast(event.target.textContent);
        })
    }
};


weatherFormEl.addEventListener("submit", submitButton);

loadCities();
createButtons();


console.log(cities);
//getCurrentCityWeather("London");
//getCityForcast("London"); 
// var iconurl = https://openweathermap.org/img/w/ + iconcode + .png;