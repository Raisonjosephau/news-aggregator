import { HttpService } from 'util/services.js'


import { 
	FETCH_WEATHER,
	FETCH_WEATHER_FAILED
  } from './types'
  

const httpService = HttpService();

export const fetchWeather = data => dispatch => {
		data['APPID'] = 'c5777ded81048ee9a0dd2cac5144ee57'
		console.log(data);
		const promise = httpService.get(`http://api.openweathermap.org/data/2.5/weather`, data);
		promise.then(res => {
			if (!res.ok) res.text().then((text) =>{
			let message = text
			if(text === 'Failed to fetch'){
				message = 'Internet Disconnected'
			}
			dispatch({
				type:FETCH_WEATHER_FAILED,
				payload: {isOpen:true,message:message}
			});
			});
			return res.json();
		})
		.then(resData =>{
			console.log(resData);
				dispatch({
					type:FETCH_WEATHER,
					payload: resData
				});
		})
		.catch(err => {
				if (err.message !== undefined) {
				let message = err.message
				if(message === 'Failed to fetch') message = 'Internet Disconnected'
				dispatch({
					type:FETCH_WEATHER_FAILED,
					payload: {isOpen:true,message:message}
				});
			}
		})
  }