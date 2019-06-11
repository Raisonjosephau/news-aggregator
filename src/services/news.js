import axios from 'axios'

async function getWeather(lng, lat) {
    let data = { lat: lat, lon: lng, "APPID": "c5777ded81048ee9a0dd2cac5144ee57" };
    let params = '?';
    for (const key in data) {
        params += `${key}=${data[key]}&`;
    }
    params = params.slice(0, -1);
    let weather;
    await axios.get(`http://api.openweathermap.org/data/2.5/weather${params}`)
        .then(res => {
            weather = res.data;
            let temp = weather.main.temp - 273.15;

            weather = { temp: temp.toFixed(), weather: weather.weather[0].description };
        })
    return weather;
}

async function getSportsTopHeadlines() {
    let news;
    await axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=6&apiKey=8cf5a3d6ce014323aa781af50385aa9d`)
        .then(res => {
            news = { topheadlines: res.data.articles };
        });

    await axios.get(`https://newsapi.org/v2/top-headlines?country=in&pageSize=5&category=sports&apiKey=8cf5a3d6ce014323aa781af50385aa9d`)
        .then(res => {
            news["sports"] = res.data.articles;
        });
    return news;
}

export { getWeather, getSportsTopHeadlines }