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

//displaying the current date
currentDate.textContent = moment().format("M/DD/YYYY");

// targetting forecast dates
document.getElementById("1date").innerHTML = moment().add(1, "d").format("M/DD/YYYY");
document.getElementById("2date").innerHTML = moment().add(2, "d").format("M/DD/YYYY");
document.getElementById("3date").innerHTML = moment().add(3, "d").format("M/DD/YYYY");
document.getElementById("4date").innerHTML = moment().add(4, "d").format("M/DD/YYYY");
document.getElementById("5date").innerHTML = moment().add(5, "d").format("M/DD/YYYY");

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
        response.json().then(function(data) {
            displayWeather(data, city);
        }); 
    });
};
// getting forecast and uv index
var getCityForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=da47b6e8a518f806d11e4e81cc84a11f";
    //make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayForecast(data, city);
            // getting uv index
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;
             var getUV = function(city) {
                var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=da47b6e8a518f806d11e4e81cc84a11f";
                fetch(apiUrl).then(function(response) {
                    response.json().then(function(data) {
                        document.getElementById("uv").innerHTML = data.value;
                        if (data.value <= 2) {
                            document.getElementById("uv").setAttribute("class", "favorable");
                        } else if (data.value > 2 && data.value <= 5) {
                            document.getElementById("uv").setAttribute("class", "moderate");
                        } else {
                            document.getElementById("uv").setAttribute("class", "severe");
                        };
                    });
                }); 
             };
            getUV();
        });
    });
};



// function to execute when the city is submitted
var submitButton = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    var btn = document.createElement("button");
    btn.className =  "city-buttons col-12 btn btn-light";
    btn.innerHTML = cityName;
    buttons.appendChild(btn);
    loadCities();
    if (!cities.includes(cityName) && (cityName != "")) {
        cities.push(cityName);
    };
    localStorage.setItem("cities", JSON.stringify(cities));
    if (cityName) {
        getCurrentCityWeather(cityName);
        getCityForecast(cityName);
        cityInputEl.value="";
    } else {
        alert("Please enter a City name");
    }
};

// displaying the current weather
var displayWeather = function(weather, searchTerm) {
    cityName.textContent = searchTerm;
    iconCode = weather.weather[0].icon
    document.getElementById("current-img").src = "https://openweathermap.org/img/w/" + iconCode + ".png";
    document.getElementById("temp").innerHTML = weather.main.temp;
    document.getElementById("humidity").innerHTML = weather.main.humidity;
    document.getElementById("wind-speed").innerHTML = weather.wind.speed;
};

// displaying the forecast
var displayForecast = function(forecast, searchTerm) {
    cityName.textContent = searchTerm;
    // displaying the first day
    document.getElementById("1temp").innerHTML = forecast.list[1].main.temp;
    document.getElementById("1humidity").innerHTML = forecast.list[1].main.humidity;
    iconCode = forecast.list[1].weather[0].icon;
    document.getElementById("1img").src = "https://openweathermap.org/img/w/" + iconCode + ".png";
    document.getElementById("1img").setAttribute("alt", "weather-icon")
    // dislaying the second day
    document.getElementById("2temp").innerHTML = forecast.list[9].main.temp;
    document.getElementById("2humidity").innerHTML = forecast.list[9].main.humidity;
    iconCode = forecast.list[9].weather[0].icon;
    document.getElementById("2img").src = "https://openweathermap.org/img/w/" + iconCode + ".png";
    // dislaying the third day
    document.getElementById("3temp").innerHTML = forecast.list[17].main.temp;
    document.getElementById("3humidity").innerHTML = forecast.list[17].main.humidity;
    iconCode = forecast.list[17].weather[0].icon;
    document.getElementById("3img").src = "https://openweathermap.org/img/w/" + iconCode + ".png";
    // dislaying the fourth day
    document.getElementById("4temp").innerHTML = forecast.list[25].main.temp;
    document.getElementById("4humidity").innerHTML = forecast.list[25].main.humidity;
    iconCode = forecast.list[25].weather[0].icon;
    document.getElementById("4img").src = "https://openweathermap.org/img/w/" + iconCode + ".png";
    // dislaying the fifth day
    document.getElementById("5temp").innerHTML = forecast.list[33].main.temp;
    document.getElementById("5humidity").innerHTML = forecast.list[33].main.humidity;
    iconCode = forecast.list[33].weather[0].icon;
    document.getElementById("5img").src = "https://openweathermap.org/img/w/" + iconCode + ".png";
};

// creating buttons for saved cities
var createButtons = function() {
    for (var i = 0; i < cities.length; i++) {
        var btn = document.createElement("button");
        btn.className = "city-buttons col-12 btn btn-light"
        btn.innerHTML = cities[i];
        buttons.appendChild(btn);
    };
    // targetting the city buttons
    var cityButtons = document.querySelectorAll(".city-buttons");
    for (var i =0; i < cityButtons.length; i ++) {
        cityButtons[i].addEventListener("click", function(event) {
            getCurrentCityWeather(event.target.textContent);
            getCityForecast(event.target.textContent);
        })
    }
};

weatherFormEl.addEventListener("submit", submitButton);

loadCities();
createButtons();

//loading a city on the page so it looks nice
getCityForecast("Pacifica");
getCurrentCityWeather("Pacifica");