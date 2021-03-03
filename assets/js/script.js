// getting city weather
var getCityWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=da47b6e8a518f806d11e4e81cc84a11f";

    //make request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
        }); 
    });
};

getCityWeather("London");