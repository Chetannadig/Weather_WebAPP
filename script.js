// Weather App JavaScript - script.js
// This file contains all the JavaScript functionality for the Weather Forecast Application

class WeatherApp {
    constructor() {
        // OpenWeatherMap API configuration
        this.apiKey = '12ea4c6ee7fb8fb41e3de90b918f8930'; // Replace with your actual API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        
        // Initialize the application
        this.init();
    }

    // Initialize the application
    init() {
        console.log('Weather App initializing...');
        this.setupEventListeners();
        this.loadRecentSearches();
        console.log('Weather App initialized successfully!');
    }

    // Set up all event listeners for user interactions
    setupEventListeners() {
        // Search button click event
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                console.log('Search button clicked');
                this.searchWeather();
            });
        }

        // Enter key press on search input
        const cityInput = document.getElementById('cityInput');
        if (cityInput) {
            cityInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log('Enter key pressed on city input');
                    this.searchWeather();
                }
            });

            // Show recent searches on input focus
            cityInput.addEventListener('focus', () => {
                console.log('City input focused');
                this.showRecentSearches();
            });
        }

        // Current location button click event
        const currentLocationBtn = document.getElementById('currentLocationBtn');
        if (currentLocationBtn) {
            currentLocationBtn.addEventListener('click', () => {
                console.log('Current location button clicked');
                this.getCurrentLocationWeather();
            });
        }

        // Hide recent searches when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#cityInput') && !e.target.closest('#recentSearches')) {
                this.hideRecentSearches();
            }
        });
    }

    // Main search function for city-based weather
    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value.trim();
        
        console.log('Searching weather for:', cityName);
        
        // Input validation
        if (!cityName) {
            console.log('Empty city name provided');
            this.showError('Please enter a city name');
            return;
        }

        // Show loading and hide previous errors
        this.showLoading(true);
        this.hideError();

        try {
            console.log('Fetching weather data for:', cityName);
            
            // Fetch current weather and forecast data
            const currentWeather = await this.fetchCurrentWeather(cityName);
            const forecast = await this.fetchForecast(cityName);
            
            console.log('Weather data fetched successfully');
            
            // Display the weather data
            this.displayCurrentWeather(currentWeather);
            this.displayForecast(forecast);
            
            // Save to recent searches
            this.saveRecentSearch(cityName);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('Failed to fetch weather data. Please check the city name and try again.');
        } finally {
            this.showLoading(false);
        }
    }

    // Get weather for user's current location using GPS
    async getCurrentLocationWeather() {
        console.log('Getting current location weather');
        
        // Check if geolocation is supported
        if (!navigator.geolocation) {
            console.log('Geolocation not supported');
            this.showError('Geolocation is not supported by your browser');
            return;
        }

        this.showLoading(true);
        this.hideError();

        // Get user's current position
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    console.log('Current coordinates:', lat, lon);
                    
                    // Fetch weather data using coordinates
                    const currentWeather = await this.fetchCurrentWeatherByCoords(lat, lon);
                    const forecast = await this.fetchForecastByCoords(lat, lon);
                    
                    console.log('Location-based weather data fetched successfully');
                    
                    // Display the weather data
                    this.displayCurrentWeather(currentWeather);
                    this.displayForecast(forecast);
                    
                } catch (error) {
                    console.error('Error fetching location-based weather:', error);
                    this.showError('Failed to fetch weather data for your location');
                } finally {
                    this.showLoading(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                this.showError('Unable to get your location. Please allow location access or search manually.');
                this.showLoading(false);
            }
        );
    }

    // Fetch current weather data by city name
    async fetchCurrentWeather(cityName) {
        console.log('Fetching current weather for:', cityName);
        
        const url = `${this.baseUrl}/weather?q=${cityName}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Current weather data received:', data);
        return data;
    }

    // Fetch current weather data by coordinates
    async fetchCurrentWeatherByCoords(lat, lon) {
        console.log('Fetching current weather for coordinates:', lat, lon);
        
        const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Current weather data received for coordinates:', data);
        return data;
    }

    // Fetch 5-day forecast data by city name
    async fetchForecast(cityName) {
        console.log('Fetching forecast for:', cityName);
        
        const url = `${this.baseUrl}/forecast?q=${cityName}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Forecast data received:', data);
        return data;
    }

    // Fetch 5-day forecast data by coordinates
    async fetchForecastByCoords(lat, lon) {
        console.log('Fetching forecast for coordinates:', lat, lon);
        
        const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Forecast data received for coordinates:', data);
        return data;
    }

    // Display current weather information on the UI
    displayCurrentWeather(data) {
        console.log('Displaying current weather data');
        
        // Show the current weather section
        const currentWeatherSection = document.getElementById('currentWeather');
        if (currentWeatherSection) {
            currentWeatherSection.classList.remove('hidden');
            currentWeatherSection.classList.add('fade-in');
        }

        // Update temperature
        const tempElement = document.getElementById('currentTemp');
        if (tempElement) {
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        }

        // Update location
        const locationElement = document.getElementById('currentLocation');
        if (locationElement) {
            locationElement.textContent = `${data.name}, ${data.sys.country}`;
        }

        // Update weather description
        const descElement = document.getElementById('currentDescription');
        if (descElement) {
            descElement.textContent = this.capitalizeWords(data.weather[0].description);
        }

        // Update feels like temperature
        const feelsLikeElement = document.getElementById('feelsLike');
        if (feelsLikeElement) {
            feelsLikeElement.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        }

        // Update wind information
        const windSpeedElement = document.getElementById('windSpeed');
        if (windSpeedElement) {
            windSpeedElement.textContent = `Speed: ${data.wind.speed} m/s`;
        }

        const windDirectionElement = document.getElementById('windDirection');
        if (windDirectionElement) {
            windDirectionElement.textContent = `Direction: ${data.wind.deg}°`;
        }

        // Update atmospheric information
        const humidityElement = document.getElementById('humidity');
        if (humidityElement) {
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        }

        const pressureElement = document.getElementById('pressure');
        if (pressureElement) {
            pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
        }

        // Update weather icon
        const iconElement = document.getElementById('currentIcon');
        if (iconElement) {
            const weatherIcon = this.getWeatherIcon(data.weather[0].main);
            iconElement.textContent = weatherIcon;
        }

        console.log('Current weather display updated');
    }

    // Display 5-day forecast information on the UI
    displayForecast(data) {
        console.log('Displaying forecast data');
        
        // Show the forecast section
        const forecastSection = document.getElementById('forecastSection');
        if (forecastSection) {
            forecastSection.classList.remove('hidden');
            forecastSection.classList.add('fade-in');
        }

        const forecastContainer = document.getElementById('forecastContainer');
        if (!forecastContainer) {
            console.error('Forecast container not found');
            return;
        }

        // Clear previous forecast data
        forecastContainer.innerHTML = '';

        // Process forecast data - get one forecast per day (every 8th item for 3-hour intervals)
        const dailyForecasts = [];
        for (let i = 0; i < data.list.length; i += 8) {
            if (dailyForecasts.length < 5) {
                dailyForecasts.push(data.list[i]);
            }
        }

        console.log('Processing', dailyForecasts.length, 'daily forecasts');

        // Create and append forecast cards
        dailyForecasts.forEach((forecast, index) => {
            const forecastCard = this.createForecastCard(forecast);
            forecastContainer.appendChild(forecastCard);
            console.log(`Forecast card ${index + 1} created`);
        });

        console.log('Forecast display updated');
    }

    // Create individual forecast card element
    createForecastCard(forecast) {
        const card = document.createElement('div');
        card.className = 'bg-white bg-opacity-20 rounded-lg p-4 text-center';

        // Format date information
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        // Get appropriate weather icon
        const weatherIcon = this.getWeatherIcon(forecast.weather[0].main);
        
        // Build card HTML structure
        card.innerHTML = `
            <div class="font-semibold mb-2">${dayName}</div>
            <div class="text-sm text-gray-200 mb-3">${dateStr}</div>
            <div class="text-3xl mb-3">${weatherIcon}</div>
            <div class="font-bold text-lg mb-2">${Math.round(forecast.main.temp)}°C</div>
            <div class="text-sm text-gray-200 mb-1">💨 ${forecast.wind.speed} m/s</div>
            <div class="text-sm text-gray-200">💧 ${forecast.main.humidity}%</div>
        `;

        return card;
    }

    // Get appropriate weather icon based on weather condition
    getWeatherIcon(weatherMain) {
        const weatherIcons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Fog': '🌫️',
            'Haze': '🌫️',
            'Smoke': '🌫️',
            'Dust': '🌫️',
            'Sand': '🌫️',
            'Ash': '🌫️',
            'Squall': '💨',
            'Tornado': '🌪️'
        };
        
        return weatherIcons[weatherMain] || '🌤️';
    }

    // Utility function to capitalize words in a string
    capitalizeWords(str) {
        return str.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }

    // Save searched city to recent searches in localStorage
    saveRecentSearch(cityName) {
        console.log('Saving recent search:', cityName);
        
        try {
            // Get existing recent searches
            let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            
            // Remove city if it already exists (to avoid duplicates)
            recentSearches = recentSearches.filter(city => 
                city.toLowerCase() !== cityName.toLowerCase()
            );
            
            // Add new city to the beginning of the array
            recentSearches.unshift(cityName);
            
            // Keep only the last 5 searches
            recentSearches = recentSearches.slice(0, 5);
            
            // Save back to localStorage
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            
            // Update the dropdown
            this.loadRecentSearches();
            
            console.log('Recent searches updated:', recentSearches);
        } catch (error) {
            console.error('Error saving recent search:', error);
        }
    }

    // Load recent searches from localStorage and populate dropdown
    loadRecentSearches() {
        console.log('Loading recent searches');
        
        try {
            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            const dropdown = document.getElementById('recentSearches');
            
            if (!dropdown) {
                console.error('Recent searches dropdown not found');
                return;
            }

            // Clear existing dropdown content
            dropdown.innerHTML = '';
            
            if (recentSearches.length === 0) {
                console.log('No recent searches found');
                return;
            }

            // Create dropdown items for each recent search
            recentSearches.forEach(city => {
                const item = document.createElement('div');
                item.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer recent-search-item';
                item.setAttribute('data-city', city);
                item.textContent = city;
                dropdown.appendChild(item);
            });

            // Add click event listeners to dropdown items
            dropdown.querySelectorAll('.recent-search-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    const cityName = e.target.getAttribute('data-city');
                    console.log('Recent search item clicked:', cityName);
                    
                    // Update input field
                    const cityInput = document.getElementById('cityInput');
                    if (cityInput) {
                        cityInput.value = cityName;
                    }
                    
                    // Hide dropdown and search
                    this.hideRecentSearches();
                    this.searchWeather();
                });
            });

            console.log('Recent searches loaded:', recentSearches.length, 'items');
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    }

    // Show recent searches dropdown
    showRecentSearches() {
        try {
            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            const dropdown = document.getElementById('recentSearches');
            
            if (dropdown && recentSearches.length > 0) {
                dropdown.classList.remove('hidden');
                console.log('Recent searches dropdown shown');
            }
        } catch (error) {
            console.error('Error showing recent searches:', error);
        }
    }

    // Hide recent searches dropdown
    hideRecentSearches() {
        const dropdown = document.getElementById('recentSearches');
        if (dropdown) {
            dropdown.classList.add('hidden');
            console.log('Recent searches dropdown hidden');
        }
    }

    // Show or hide loading indicator
    showLoading(show) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        if (loadingIndicator) {
            if (show) {
                loadingIndicator.classList.remove('hidden');
                console.log('Loading indicator shown');
            } else {
                loadingIndicator.classList.add('hidden');
                console.log('Loading indicator hidden');
            }
        }
    }

    // Show error message to user
    showError(message) {
        console.log('Showing error:', message);
        
        const errorElement = document.getElementById('errorMessage');
        const errorText = document.getElementById('errorText');
        
        if (errorElement && errorText) {
            errorText.textContent = message;
            errorElement.classList.remove('hidden');
        }
    }

    // Hide error message
    hideError() {
        const errorElement = document.getElementById('errorMessage');
        if (errorElement) {
            errorElement.classList.add('hidden');
            console.log('Error message hidden');
        }
    }
}

// Initialize the weather application when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing Weather App');
    new WeatherApp();
});

// End of script.js