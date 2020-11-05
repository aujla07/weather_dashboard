// document.querySelector(".btn").addEventListener("click",function(event){
//     console.log("clicked")
// })
const API_KEY = "8b267c19ed20a20ec0f113d0fe760b1b"


//current weather - this will make the API call - to get the current weather
async function currentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`

    return await $.ajax({
        url: url,
        method: "GET"
    });
}

// 5 day weather 
async function fiveDayforecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
    return await $.ajax({
        url: url,
        method: "GET"
    });
}

//uv index
async function uvIndex(lat, lon) {
    const url = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    return await $.ajax({
        url: url,
        method: "GET"
    });
}

$(".btn").on("click", async function (event) {
    var userinput = $("input").val()
    const currentWeatherResponse = await currentWeather(userinput)
    const fiveDayforecastResponse = await fiveDayforecast(userinput)
    const uvIndexResponse = await uvIndex(currentWeatherResponse.coord.lat, currentWeatherResponse.coord.lon)
    const currentWeatherIcon = `<img src="https://openweathermap.org/img/w/${currentWeatherResponse.weather[0].icon}.png" alt="${currentWeatherResponse.weather[0].icon}">`

    const fiveDays = fiveDayforecastResponse.list.filter(function (day) {
        const time3pm = day.dt_txt.split(" ")[1]
        return time3pm === "15:00:00"
    })
    const fiveDayCards = fiveDays.map(function (day) {
        const weatherIcon = `<img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].icon}">`

        return `
    <div class="col">
    <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${moment(day.dt * 1000).format("L")}</h5>
          ${weatherIcon}
          <p class="card-text">
              Temperature: ${day.main.temp + "°F"} 
              <br>
              Humidity: ${day.main.humidity + "%"}
          </p>
        </div>
      </div>
</div>
    `
    }).join(" ")

    //display items
    $("#city-date").html(`${currentWeatherResponse.name} (${moment(currentWeatherResponse.dt * 1000).format("L")})${currentWeatherIcon}`)
    $("#current-temp").text(currentWeatherResponse.main.temp + "°F")
    $("#humidity").text(currentWeatherResponse.main.humidity + "%")
    $("#windspeed").text(currentWeatherResponse.wind.speed + " MPH")
    $("#uvindex").text(uvIndexResponse.value)
    $("#5-day").html(fiveDayCards)


    // console.log(currentWeatherResponse)
    console.log(fiveDays)
    // console.log(uvIndexResponse)


})
