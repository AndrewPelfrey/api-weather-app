import fs from 'fs/promises'; 
import { fileURLToPath } from 'node:url';
import path from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(
    name: string,
    id: string
  ) {
    this.id = id;
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(__dirname, 'searchHistory.json');
  }

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const data = JSON.stringify(cities, null, 2);
    await fs.writeFile(this.filePath, data, 'utf-8');
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string) {
    const cities = await this.read();

    const id = Date.now().toString();
    const city = new City(cityName, id);

    if (!cities.some(c => c.name.toLowerCase() === cityName.toLowerCase())) {
      cities.push(city);
      await this.write(cities);
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.read();
    const updatedCities = cities.filter(city => city.id !== id);

    await this.write(updatedCities);
  }
}

export default new HistoryService();