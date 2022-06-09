import {useState, useEffect} from 'react';
import axios from "axios";

const key = process.env.REACT_APP_API_KEY

const Weather = (props) => {
    /**
     * Sets a london as an initial rendering state,
     * then render the actual weather once the hook has loaded.
     */
    const [weather, setWeather] = useState({"location":{"name":"Oslo","region":"Oslo","country":"Norway","lat":59.92,"lon":10.75,"tz_id":"Europe/Oslo","localtime_epoch":1654672648,"localtime":"2022-06-08 9:17"},"current":{"last_updated_epoch":1654668000,"last_updated":"2022-06-08 08:00","temp_c":11.9,"temp_f":53.4,"is_day":1,"condition":{"text":"Overcast","icon":"//cdn.weatherapi.com/weather/64x64/day/122.png","code":1009},"wind_mph":33.6,"wind_kph":54.0,"wind_degree":30,"wind_dir":"NNE","pressure_mb":1003.0,"pressure_in":29.62,"precip_mm":1.0,"precip_in":0.04,"humidity":92,"cloud":100,"feelslike_c":12.0,"feelslike_f":53.6,"vis_km":10.0,"vis_miles":6.0,"uv":3.0,"gust_mph":4.5,"gust_kph":7.2,"air_quality":{"co":190.3000030517578,"no2":20.700000762939453,"o3":33.599998474121094,"so2":13.0,"pm2_5":6.900000095367432,"pm10":7.400000095367432,"us-epa-index":1,"gb-defra-index":1}}});

    const hook = () => {
        axios
            .get(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${props.capital}&aqi=yes`)
            .then(response => {
                setWeather(response.data)
            })
    }

    useEffect(hook, [])

    console.log(weather);

    return (
        <div>
            <li>Temperature: {weather['current']['temp_c']} celsius.</li>
            <img src={"http:" + weather['current']['condition']['icon']} alt="Weather Image"/>
            <li>Wind: {weather['current']['wind_kph']} km/h.</li>
        </div>
    );
}

export default Weather