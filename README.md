# Weather Forecast Application 🌤️

A responsive weather forecast web application built with JavaScript, HTML, and Tailwind CSS. Get current weather conditions and 5-day forecasts for any location worldwide.

## 🚀 Live Demo

**GitHub Repository:** [https://github.com/Chetannadig/Weather_WebAPP](https://github.com/Chetannadig/Weather_WebAPP)

## 📋 Features

### ✅ Core Functionality
- **Current Weather Display**: Real-time weather conditions including temperature, humidity, wind speed, and atmospheric pressure
- **5-Day Forecast**: Extended weather predictions with daily breakdowns
- **Location Search**: Search weather by city name with input validation
- **Current Location**: Get weather for your current geographical location using GPS
- **Recent Searches Dropdown**: Quick access to previously searched cities (stored locally)
- **Responsive Design**: Optimized for desktop, tablet (iPad Mini), and mobile (iPhone SE)

### 🎨 User Interface
- Modern gradient background design
- Glass-morphism weather cards
- Intuitive navigation and controls
- Weather-appropriate icons and graphics
- Smooth animations and transitions
- Mobile-first responsive layout

### 🛡️ Error Handling & Validation
- API error handling with user-friendly messages
- Input validation for empty/invalid searches
- Geolocation error handling
- Network connectivity error management
- Loading indicators for better user experience

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **API**: OpenWeatherMap API
- **Storage**: Local Storage for recent searches
- **Responsive**: Mobile-first design approach

## 📱 Responsive Breakpoints

- **Desktop**: Full feature layout with 4-column current weather grid
- **Tablet (iPad Mini)**: 2-column layout adaptation
- **Mobile (iPhone SE)**: Single column stacked layout

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Internet connection for API calls
- OpenWeatherMap API key (free registration required)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chetannadig/Weather_WebAPP.git
   cd Weather_WebAPP
   ```

2. **Get API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key

3. **Configure API Key**
   - Open `index.html` file
   - Find the line: `this.apiKey = 'YOUR_API_KEY_HERE';`
   - Replace `YOUR_API_KEY_HERE` with your actual API key

4. **Launch Application**
   - Open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

## 🎯 Usage Guide

### Search by City Name
1. Enter city name in the search input field
2. Click "Search" button or press Enter
3. View current weather and 5-day forecast

### Use Current Location
1. Click "Use Current Location" button
2. Allow location access when prompted
3. Weather data for your location will be displayed

### Recent Searches
1. Click on the search input to view recent searches dropdown
2. Click any city from the dropdown to quickly load its weather
3. Recent searches are automatically saved and persist between sessions

## 📊 Weather Data Displayed

### Current Weather
- **Temperature**: Current temperature and "feels like" temperature
- **Weather Condition**: Description with appropriate weather icons
- **Wind Information**: Speed and direction
- **Atmospheric Data**: Humidity and pressure
- **Location**: City name and country code

### 5-Day Forecast
- **Date**: Day name and date
- **Temperature**: Daily temperature
- **Weather Icon**: Visual representation of weather conditions
- **Wind Speed**: Daily wind speed
- **Humidity**: Daily humidity percentage

## 🗂️ Project Structure

```
Weather_WebAPP/
│
├── index.html          # Main HTML file with embedded CSS and JavaScript
├── README.md           # Project documentation
└── .gitignore         # Git ignore file
```

## 🔧 Code Structure

### HTML Structure
- Semantic HTML5 elements
- Responsive meta viewport
- Tailwind CSS integration
- Weather icons using emojis

### CSS Features
- Tailwind CSS utility classes
- Custom animations (fade-in, loading spinner)
- Glass-morphism effects
- Gradient backgrounds
- Responsive design utilities

### JavaScript Architecture
- **WeatherApp Class**: Main application controller
- **API Integration**: OpenWeatherMap API handling
- **Event Handling**: User interaction management
- **Local Storage**: Recent searches persistence
- **Error Handling**: Comprehensive error management
- **Responsive Updates**: Dynamic UI updates

## 🌐 API Integration

### OpenWeatherMap API Endpoints Used
- **Current Weather**: `/weather` - Real-time weather data
- **5-Day Forecast**: `/forecast` - Extended weather predictions
- **Geolocation Support**: Coordinate-based weather fetching

### API Features Implemented
- City name search
- Coordinate-based search (GPS)
- Metric units (Celsius, m/s)
- Error response handling

## 📱 Browser Compatibility

- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅
- **Mobile browsers**: iOS Safari, Chrome Mobile ✅

## 🚨 Error Handling

The application handles various error scenarios:
- Invalid city names
- Network connectivity issues
- API rate limiting
- Geolocation access denied
- Empty search queries
- API service unavailable

## 🔄 Version Control

This project uses Git for version control with:
- Meaningful commit messages
- Feature-based development
- Clean commit history
- Proper branching strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Chetan Nadig**
- GitHub: [@Chetannadig](https://github.com/Chetannadig)
- Repository: [Weather_WebAPP](https://github.com/Chetannadig/Weather_WebAPP)

## 🙏 Acknowledgments

- OpenWeatherMap for providing the weather API
- Tailwind CSS for the utility-first CSS framework
- Weather icons and emojis for visual representations

## 📈 Future Enhancements

- [ ] Hourly weather forecast
- [ ] Weather maps integration
- [ ] Multiple location comparison
- [ ] Weather alerts and notifications
- [ ] Dark/Light theme toggle
- [ ] Weather data export functionality
- [ ] Offline mode support

---

*Built with ❤️ using JavaScript, HTML, CSS, and Tailwind CSS*