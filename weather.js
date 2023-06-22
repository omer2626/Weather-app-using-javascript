document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = "7a8600cceba1f571def18a55e13d6113"
  
    let GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?`
    let BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`
  
    const city_name = document.getElementById("city-input")
    let loc = document.getElementById("city-name")
    let temp_msg = document.getElementById("weather-type")
    let temp = document.getElementById("temp")
    let min_temp = document.getElementById("min-temp")
    let max_temp = document.getElementById("max-temp")
    let searchBtn = document.getElementById("search-btn")
  
    const getLatLong = async() =>{
        let lat,long;
        try{
            const response = await fetch(`${GEO_URL}q=${city_name.value}&appid=${API_KEY}`)   
            const data = await response.json()
            lat = data[0].lat
            long = data[0].lon
            return {lat,long};
  
        }catch(err){
            console.log(err)
            return null
        }
    }
  
    const getWeatherData = async() =>{
        try{
            const latLong = await getLatLong()
            if(latLong === null) throw new Error("Error getting location")
            const {lat, long} = latLong
            const response = await fetch(`${BASE_URL}lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
            const data = await response.json()
            loc.innerText = data.name
            temp_msg.innerText = data.weather[0].main
            temp.innerText = data.main.temp
            min_temp.innerText = data.main.temp_min
            max_temp.innerText = data.main.temp_max
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }
    
    searchBtn.addEventListener("click", getWeatherData)
  })