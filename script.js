const apiKey = 'c82947ebe78e4dcdab9192047243006';
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

const locationInput = document.getElementById('locationInput');
const submitBtn = document.getElementById('submitBtn');
const locationElement = document.getElementById('location');
const weatherIconElement = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');

submitBtn.addEventListener('click', function() {
    const location = locationInput.value;
    if (location.trim() === '') {
        alert('Please enter a location.');
        return;
    }
    getWeather(location);
});

function getWeather(location) {
    const params = {
        key: apiKey,
        q: location
    };

    const queryString = new URLSearchParams(params).toString();
    const url = `${apiUrl}?${queryString}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            updateWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again.');
        });
}

function updateWeather(data) {
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    temperatureElement.textContent = `${data.current.temp_c}°C`;
    descriptionElement.textContent = data.current.condition.text;
    humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;

    const iconCode = data.current.condition.icon.split('/').pop();
    const iconUrl = `https:${data.current.condition.icon}`;
    weatherIconElement.src = iconUrl;
    weatherIconElement.alt = data.current.condition.text;
}
