# Weather Dashboard

A full-stack weather dashboard that allows users to search for weather forecasts for any city and view current and 5-day forecast conditions. The application connects to the OpenWeather API, stores search history server-side, and is deployed on Render.

---

## Table of Contents

- [User Story](#user-story)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Bonus Functionality](#bonus-functionality)
- [Screenshots](#screenshots)
- [Deployed Application](#deployed-application)
- [License](#license)

---

## User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly


---

## Features

- Search for a city to view current weather and a 5-day forecast
- View city name, date, temperature, wind speed, humidity, and weather icons
- Searched cities are saved in search history
- Click on a city in the search history to view its weather again
- Search history is stored server-side in a JSON file
- Clean and responsive user interface
- Deployed on Render for public access

---

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Data Storage: `fs` module with `searchHistory.json`
- API: OpenWeather 5-Day Forecast API
- Tools and Libraries: TypeScript, UUID, dotenv, Render, bcrypt, jsonwebtoken

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
Install dependencies:
npm install
Create a .env file and add your API key:
OPENWEATHER_API_KEY=your_api_key_here
Start the server:
npm start
API Routes

HTML Route
GET *
Returns the index.html file to the client.
Weather API
GET /api/weather/history
Returns all previously searched cities from searchHistory.json.
POST /api/weather
Accepts a city name in the request body, fetches weather data using the OpenWeather API, saves the city with a unique ID to searchHistory.json, and returns the weather data to the client.
Bonus Route
DELETE /api/weather/history/:id
Deletes a city from the history by its unique ID.
Bonus Functionality

Users can delete a city from the search history using a delete button next to each saved city.
The app updates the search history both in the UI and the JSON file without requiring a page refresh.