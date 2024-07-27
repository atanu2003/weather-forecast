document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '2a29b857d3d85f6a5d698be7d7313104'; // Replace with your OpenWeatherMap API key
    const forecastDiv = document.getElementById('forecast');
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');

    const fetchWeather = (city) => {//fetch the data
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));
                forecastDiv.innerHTML = ''; // Clear previous forecast
                forecastList.forEach(forecast => {
                    const forecastElement = document.createElement('div');
                    forecastElement.classList.add('forecast-day', 'p-4', 'bg-gray-100', 'rounded-lg', 'flex', 'justify-between', 'items-center');

                    const date = new Date(forecast.dt * 1000).toLocaleDateString();//get the local date
                    const temp = forecast.main.temp.toFixed(1);
                    const description = forecast.weather[0].description;
                    const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
//it is the information part
                    forecastElement.innerHTML = `
                        <div>${date}</div>
                        <div><img src="${icon}" alt="${description}" class="w-12 h-12"></div>
                        <div>${temp}°C</div>
                        <div>${description}</div>
                    `;

                    forecastDiv.appendChild(forecastElement);
                });
            })
            .catch(error => {
                forecastDiv.innerHTML = `<p class="text-red-500">Error fetching weather data: ${error.message}</p>`;
            });
    };

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    // Fetch default weather on load
    fetchWeather('London');
});