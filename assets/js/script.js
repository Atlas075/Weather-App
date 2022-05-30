var headerFormEl = document.querySelector("#header")
var userFormEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city")
var currentDate =  document.querySelector("#current-date")
var currentCity = document.querySelector("#current-city")
var futureDayForcast =document.querySelector("#future-weather-forcast")
var displayForcast = document.querySelector("#card-1")
var HistoryEl = document.querySelector("#history")
var uvIndexEl = document.querySelector("#current-uvi")
var apiKey = "26bf7cdec78804f3934631aa597f6ac7"

//displays the current date
// taking input from from element and placing it in the display area
var formSubmitHandler = function(event) 
{
  event.preventDefault();

var cityEL = cityInputEl.value.trim();
currentCity.innerHTML = cityEL;
var oldSearchedCity = localStorage.getItem("city")
localStorage.setItem("city", cityEL); 



currentDate.textContent = "(" + moment().format("L") + ")";



if (cityEL)
{
  getWeather(cityEL);
}

displaySearchHistory(oldSearchedCity)
};


// takes the input given and runs several openweather apis and get fetches the needed data
var getWeather = function (name)
{
    var apiUrl ="https://api.openweathermap.org/geo/1.0/direct?q=" + name + ",us&limit=3&appid=" + apiKey
  
    
   // make a get request to url
   fetch(apiUrl)
   .then(function(response) {
     // request was successful
     if (response.ok) {
       response.json().then(function(data) {
         var lat = data['0']['lat'];
         var lon = data['0']['lon'];
         var finalCity = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&units=imperial&exclude=hourly,minutely&appid=" + apiKey
         fetch(finalCity)
         .then(function(response2)
         {
           if (response2.ok)
           {
             response2.json().then(function(data2)
             {

              //extract icon from data
              var CurrentIcon =data2.current.weather[0].icon
              var currentIconEl = document.querySelector("#current-icon")
              currentIconEl.innerHTML = "<img src=http://openweathermap.org/img/wn/" + CurrentIcon + "@2x.png>";

              //extract temp from data
              var currentTemp = data2.current.temp
              var currentTempEL = document.querySelector("#current-temp")
              currentTempEL.innerHTML = "Temp: " + currentTemp + " deg"
              
              //extract wind from data
              var currentWind = data2.current.wind_speed
              var currentWindEL = document.querySelector("#current-wind")
              currentWindEL.innerHTML = "Wind: "+ currentWind + " MPH"
              
              //extract humidity from data
              var currentHumidity = data2.current.humidity
              var currentHumidityEL = document.querySelector("#current-humidity")
              currentHumidityEL.innerHTML = "Humidity: " + currentHumidity + " %"
              
              //extract UV Index from data
              var currentUvindex = data2.current.uvi
              var currentUvindexEL = document.querySelector("#current-uvi")
              currentUvindexEL.innerHTML = "UV Index: " + currentUvindex
              changeUV(currentUvindex)

              displayForcast(data2)

             })
           }  
            
         })

        // displayWeather(data, user);
       });
     } else {
       alert('Error: City Not Found');
     }
   })
   .catch(function(error) {
     alert("Unable to connect to Weather App");
   });

 }

// displayes the 5 days forcast using the data from get weathr function
var displayForcast = function (data2)
{
  
  futureDayForcast.textContent = "";
  var dailyArray = data2.daily;
  for (var i = 0; i < 5; i++)
  {
    var temp = dailyArray[i].temp.daily
    var wind = dailyArray[i].wind_speed
    var humidity = dailyArray[i].humidity
    var date = moment(date).add(1,"d")
    var dateFormat = moment(date).format("ddd, MMM DD, YYYY")
    var icon = dailyArray[i].weather[0].icon

    var divEl = document.createElement("div")
    divEl.classList = "future-title btn"
    futureDayForcast.appendChild(divEl)

    var dateEl = document.createElement("h3")
  
    dateEl.textContent = dateFormat
    divEl.appendChild(dateEl)

    var iconEl = document.createElement("div")
    iconEl.innerHTML = 
      "<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png>";
      divEl.appendChild(iconEl);

    var tempEl = document.createElement("p");
      tempEl.textContent = "Temp: " + Math.floor(temp) + " deg";
      divEl.appendChild(tempEl);

    var windEl = document.createElement("p")
    windEl.textContent = "Wind Speed: " + Math.floor(wind) + " MPH"
    divEl.appendChild(windEl);

    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + humidity + "%";
    divEl.appendChild(humidityEl);


};
}

//changes the uv color(p element) based on sever moderate and great index
var changeUV = function (currentUvindex)
{

              if(currentUvindex === 0)
              {
                uvIndexEl.classList.add("uv-great") 
              }
              if(currentUvindex <= 3)

              {
                uvIndexEl.classList.add("uv-great") 
              }
            
              if (currentUvindex >= 7)
              {
                uvIndexEl.classList.add("uv-severe") 
              }
            
              if (currentUvindex > 3 && currentUvindex < 7)
              {
                uvIndexEl.classList.add("uv-moderate") 
              }
           
}

//display search history from (cityEl) 
var displaySearchHistory = function (cityEL, name)
{
  var searchArray = cityEL.split(";")
for (var i = 0; i < searchArray.length; i++)
{
if (searchArray[i] != "")
{
var searchEL = document.createElement("button")
searchEL.onclick = getWeather(searchArray[i])
searchEL.className = "search-history btn"
searchEL.textContent = searchArray[i]
HistoryEl.appendChild(searchEL)

}

}
}

//on buton click runs app
headerFormEl.addEventListener("submit", formSubmitHandler);