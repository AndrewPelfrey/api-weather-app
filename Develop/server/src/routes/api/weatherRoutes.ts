import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// import historyService from '../../service/historyService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(city);
  // TODO: save city to search history
  await HistoryService.addCity(city);

  return res.status(200).json({weather: weatherData });
} catch (error) {
  console.error(error);
  return res.status(500).json({error: 'failed to get weather data'})
}
});

// TODO: GET search history
router.get('/history', async (_, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json({ history: cities });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "failed to get search history"});
  }
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
