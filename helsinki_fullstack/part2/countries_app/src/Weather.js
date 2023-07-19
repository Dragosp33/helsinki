import axios from "axios";
import { useState, useEffect } from "react";


const Weather = ({capitalLatLong}) => {
    const [weather, setWeather] = useState(null)
    const [icon, setIcon] = useState(null)

    const api_key  = process.env.REACT_APP_API_KEY;
  

    const api_call = (lat, long, exclude, key) => {
        
        return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&appid=${key}`
    }

    const getIcon = (id) => {
        const url = `https://openweathermap.org/img/wn/${id}@2x.png`
        console.log(`PT ID UL ${id} avem: urlul: `, url)
        return url;
       // const request = axios.get(url)
        //return request.then(response => response.data)
        

    }

    const getCall = (k) => {
        const request = axios.get(k)
        return request.then(response => response.data)
    }
    //const k = api_call(capitalLatLong[0], capitalLatLong[1], ['minutely','alerts','daily','hourly'], api_key)
    //console.log("api_call =", k)

    useEffect(() => { 
        const k = api_call(capitalLatLong[0], capitalLatLong[1], ['minutely','alerts','daily','hourly'], api_key)
        console.log("api_call =", k)
        getCall(k).then(weatherdata => {
            console.log("weatherdata: ", weatherdata)
            setWeather(weatherdata.current)
            console.log("usestate weather ", weather);
           
           
           })

    }, [capitalLatLong, weather])

    //const getWeather = axios.get(api_call())
   // console.log(weather.current);
   
    return (
        <div>
       
        {weather ? <> <p> Weather forecast: </p>
        
        <p> {capitalLatLong}</p>
        <p>Temperature: {weather.temp} Celcius</p>
        <img src={getIcon(weather.weather[0].icon)} alt="icon"/>
        <p> Wind: {weather.wind_speed} m/s (meters per second)</p>
        </> : <p> Loading Weather data... </p>
        
        }
           
        
        </div>
    )
   


   


  
  
  }

export default Weather;