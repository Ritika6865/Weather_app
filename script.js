const api = {
  key: "28bdc6ab998746a262cec7044a0fbfcd",
  base: "https://api.openweathermap.org/data/2.5/"
}
const key="28bdc6ab998746a262cec7044a0fbfcd";
let loc=document.getElementsByClassName(".location");
let tempvalue=document.getElementsByClassName(".temp");
let climate=document.getElementsByClassName(".weather");
const notificationElement=document.querySelector(".notification");
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
let tempo = document.querySelector('.current .temp');
const weather={};
weather.temperature={
  unit:"celsius"
}

if('geolocation' in navigator)
{
  navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
  notificationElement.style.display="block";
  notificationElement.innerHTML="<p>Brower</p>";
}

function setPosition(position)
{
  let latitude=position.coords.latitude;
  let longitude=position.coords.longitude;
   getWeather(latitude,longitude);
}
function showError(error)
{
  notificationElement.style.display="block";
  notificationElement.innerHTML=`<p> ${error.message} </p>`;
}
function getWeather(latitude,longitude)
{
  let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
     .then(function(response)
     {
       let data=response.json();
       return data;
     })
}




function setQuery(evt) {
  if (evt.keyCode == 13) {
      document.querySelector('.weather-body').style.display= "block";
    getWeather(searchbox.value);
    getResults(searchbox.value);

  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults (weather) {
  console.log(weather);
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
   let temp = document.querySelector('.current .temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let humid = document.querySelector('.humidity');
  humid.innerText = `Humidity: ${weather.main.humidity}%`;
  if(weather_el.textContent=='Sunny')
  {
    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')";
  }
  if(weather_el.textContent=='Clouds')
  {
    document.body.style.backgroundImage="url('https://turntable.kagiso.io/images/partly-cloudy-1173077-639x447.width-800.jpg')";
  }
  if(weather_el.textContent=='Haze')
  {
    document.body.style.backgroundImage="url('https://images.unsplash.com/photo-1559759748-029511daa8aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')";
  }
  if(weather_el.textContent=='Rain')
  {
    document.body.style.backgroundImage="url('https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg')";
  }
  if(weather_el.textContent=='Clear')
  {
    document.body.style.backgroundImage="url('https://torange.biz/photofxnew/1/HD/clear-sky-1049.jpg')";
  }
  if(weather_el.textContent=='Snow')
  {
    document.body.style.backgroundImage="url('https://cdn.images.express.co.uk/img/dynamic/153/590x/us-weather-snow-storm-California-mountains-flood-warnings1-1074760.jpg?r=1547914160147')";
  }
  if(weather_el.textContent=='Thunderstorm')
  {
    document.body.style.backgroundImage="url('https://wehco.media.clients.ellingtoncms.com/img/photos/2021/03/04/jonas-kaiser-ley4Kf2iG7Y-unsplash_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d')";
  }
  if(weather_el.textContent=='Drizzle')
  {
    document.body.style.backgroundImage="url('https://static.toiimg.com/photo/70241931/delhi-rain.jpg?width=748&resize=4')";
  }
  if(weather_el.textContent=='Mist')
  {
    document.body.style.backgroundImage="url('https://thumbs.dreamstime.com/b/foggy-forest-mountains-landscape-trees-mist-rain-view-background-nature-image-216044071.jpg')";
  }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var currentTime=new Date();
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
   let hr=d.getHours();
   let min=d.getMinutes();
  return ` ${date} ${month} ${year}  
           ${day}  
          
           
          ${hr}:${min} IST`;
}