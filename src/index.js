
function dateChanger(city){
    let now = new Date();
    let weekDay = now.getDay();
    let week = [
     "Sunday",
     "Monday",
     "Tuesday",
        "Wednesday",
     "Thursday",
     "Friday",
     "Saturday"
];
    let min = now.getMinutes();
    let hour = now.getHours();
    let date = document.querySelector(".date");
    date.innerHTML = `${week[weekDay]} ${hour}:${min}`;
}

function searchEngine(event){
    event.preventDefault();
    let apiKey = "6643c7326a4c2a38838264a28531d97e";   
    let cityName = document.querySelector("#search-input");
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
    // console.log(cityName.value);
    axios.get(apiUrl).then(forcast);
    let h1 = document.querySelector("h1");
    h1.innerHTML = cityName.value;
    // dateChanger(cityName);
    
}
function forcast(response) {
    let temprature = response.data.main.temp;
    let temp = document.querySelector(".temprature");
    temp.innerHTML = Math.round(temprature);

    let humidity = response.data.main.humidity;
    console.log(humidity);
    let humid = document.querySelector(".humidity");
    humid.innerHTML = `Humidity: ${humidity}%`;

    let windSpeed = response.data.wind.speed;
    let wind = document.querySelector(".wind");
    wind.innerHTML = `Wind: ${windSpeed} km/h`;

    let descriptions = response.data.weather[0].description;
    let des = document.querySelector(".description");
    des.innerHTML = descriptions;
    dateChanger();
    
}
function currentWeather(lon , lat){
    let apiKey = "6643c7326a4c2a38838264a28531d97e";  
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(forcast);
}

function showPosition(position){
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let h1 = document.querySelector("h1");
    h1.innerHTML = `Your location is ${longitude}, ${latitude}`;
    currentWeather(longitude, latitude);

}
function currentValue(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

    dateChanger();
    let form = document.querySelector("#search-btn");
    form.addEventListener("click", searchEngine);

    let current = document.querySelector("#current-btn");
    current.addEventListener("click", currentValue);
    


 

 