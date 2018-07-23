const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const apiKey = '2b4a7001e01e48e98dd4ca8718ff708c';
const weekdays = {
	0: 'Dom',
	1: 'Seg',
	2: 'Ter',
	3: 'Qua',
    4: 'Qui',
    5: 'Sex',
    6: 'Sáb'
}
$('#search').click(function(event) {
	event.preventDefault();
	const newCity = $('#city').val();
	console.log(newCity);
});
function getForecast(city) {
	$('#loader').css('display','');
	$('#forecast').css('display','none');
	clearFields();
}

$.ajax({
    url: baseURL,
    data:{
    	Key: apiKey,
    	city: 'Recife',
    	lang: 'pt'
    },
    success: function(result) {
    	$('#loader').css('display','none');
    	$('#forecast').css('display','');
    	const forecast = result.data;
    	const today = forecast[0];
    	displayToday(today);
    	const nextDays = forecast.slice(1);
    	displayNextDays(nextDays);
    },
    error: function(error) {
    	console.log(error.responseText);
    }
});

function displayToday(today) {
	const temperature = Math.round(today.temp);
	const windSpeed = today.wind_spd;
	const humidity = today.rh;
	const weather = today.weather.description;
	const icon = today.weather.icon;
	const iconURL = `https://www.weatherbit.io/static/img/icons/${icon}.png`;

	$('#current-temperature').text(temperature);
	$('#current-weather').text(weather);
	$('#current-wind').text(windSpeed);
	$('#current-humidity').text(humidity);
	$('#weather-icon').attr('src', iconURL);

	console.log(temperature);
	console.log(windSpeed);
	console.log(humidity);
	console.log(weather);
	console.log(iconURL);                                  
}
function displayNextDays(nextDays) {
    for(let i = 0; i < nextDays.length; i = i + 1) {
	const day = nextDays[i];
	const min = Math.round(day.min_temp);
	const max = Math.round(day.max_temp);
	const date = new Date(day.valid_date);
	const weekday = weekdays[date.getUTCDay()];
	const card = $(`<div class="day-card">
                    <div class="date">${date.getUTCDate()}/${date.getUTCMonth() + 1}</div>
                    <div class="weekday">${weekday}</div>
                    <div class="temperatures">
                        <span class="max">${max}°</span>
                        <span class="min">${min}°</span>
                    </div>
                </div>`);
	card.appendTo('#next-days');
	}

}
