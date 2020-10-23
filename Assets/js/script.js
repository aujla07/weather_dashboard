// document.querySelector(".btn").addEventListener("click",function(event){
//     console.log("clicked")
// })
const API_KEY ="8b267c19ed20a20ec0f113d0fe760b1b"


//current weather - this will make the API call - to get the current weather
async function currentWeather(city){
const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`

return await $.ajax({
    url: url, 
    method: "GET"
    });
}

// 5 day weather 
async function fiveDayforecast(city){
const url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`
return await $.ajax({
    url: url, 
    method: "GET"
    });
}

//uv index
async function uvIndex(lat,lon){
    const url= `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
    return await $.ajax({
        url: url, 
        method: "GET"
        });
    }

$(".btn").on("click", async function(event){
    var userinput= $("input").val()
    const currentWeatherResponse= await currentWeather(userinput)
    const fiveDayforecastResponse= await fiveDayforecast(userinput)
    const uvIndexResponse= await uvIndex(currentWeatherResponse.coord.lat,currentWeatherResponse.coord.lon)

    //display items
    $("#current-temp").text(currentWeatherResponse.main.temp)


    console.log(currentWeatherResponse)
    console.log(fiveDayforecastResponse)
    console.log(uvIndexResponse)
    

})
