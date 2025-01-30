import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  humidity: number;
  wind: number;

  constructor(
    temperature: number, 
    humidity: number, 
    wind: number)
     {
    this.temperature = temperature;
    this.humidity = humidity;
    this.wind = wind;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = "https://api.openweathermap.org";
    this.apiKey = process.env.OPENWEATHER_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("API key is missing");
    }
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const geocodeQuery = this.buildGeocodeQuery(query);
    const response = await fetch(geocodeQuery);
   
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    return response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any[]): Coordinates {
    if (locationData.length === 0) {
      throw new Error("City not found");
    }
    const { lat, lon } = locationData[0];
    return {latitude: lat, longitude: lon }
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(city)}&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}&units=metric`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
    const locationData = await this.fetchLocationData(city);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    // console.log("🔍 Full API Response:", JSON.stringify(data, null, 2));

    const currentWeather = this.parseCurrentWeather(data);

    const weatherData = data.list;
    const fullForecast = this.buildForecastArray(currentWeather, weatherData);

    return fullForecast;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(data: any): Weather {
    if (!data.main || !data.main.temp) {
      console.error("Error: Weather data is incomplete or invalid.");
      throw new Error("Invalid weather data received from API");
  }

  return new Weather(data.main.temp, data.main.humidity, data.wind.speed);
}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    if (!weatherData || !Array.isArray(weatherData)) {
      console.error("Error: weatherData is missing or not an array.");
      return [currentWeather]; // Prevent crashes by returning at least the current weather
    }

    const forecast: Weather[] = weatherData.map((data: any) => 
      new Weather(data.main.temp, data.main.humidity, data.wind.speed)
    );

    return [currentWeather, ...forecast];
}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    return await this.fetchWeatherData(coordinates);
  }
}

export default new WeatherService();
