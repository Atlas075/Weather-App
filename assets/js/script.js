var userFormEl = document.querySelector("#user-form")
var cityInputEl = document.querySelector("#city")
var currentDate =  document.querySelector("#current-date")
var currentCity = document.querySelector("current-city")
var apiKey = "26bf7cdec78804f3934631aa597f6ac7"



var formSubmitHandler = function(event) 
{
event.preventDefault()

var cityEL = cityInputEl.value.trim();
console.log(cityEL);

if (cityEL)
{
  getWeather(cityEL);
}

};


userFormEl.addEventListener("submit", formSubmitHandler);

var displayCity = function ()
{
    currentDate.textContent = moment().format("L");
    currentCity.textContent = cityEL
}


var getWeather = function (name)
{
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&appid=" + apiKey;
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=durham&units=imperial&appid=26bf7cdec78804f3934631aa597f6ac7"
    
    
   // make a get request to url
   fetch(apiUrl)
   .then(function(response) {
     // request was successful
     if (response.ok) {
       console.log(response);
       response.json().then(function(data) {
         console.log(data);
        //  displayWeather(data, user);
       });
     } else {
       alert('Error: GitHub User Not Found');
     }
   })
   .catch(function(error) {
     alert("Unable to connect to GitHub");
   });
}



var displayWeather = function (data)
{


}

getWeather()
displayCity()
