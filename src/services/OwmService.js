import axios from 'axios';

export default class OwmService {
  static _apiBase = `http://api.openweathermap.org/data/2.5/`;
  static _apiKey = `d9a22059b5dac3870e0bd05cf6377c90`;

  async getResource(url) {
    try {
      const resp = await axios.get(
        `${OwmService._apiBase}${url}&APPID=${OwmService._apiKey}`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }

  getWeather = async city => {
    const resp = await this.getResource(`weather?q=${city}&units=metric`);
    return OwmService._transformWeather(resp);
  };

  getThreeDaysWeather = async id => {
    const resp = await this.getResource(`forecast?id=${id}&units=metric`);
    return OwmService._transformThreeDaysWeather(resp);
  };

  static _transformWeather(city) {
    return {
      id: city.id,
      name: city.name,
      date: city.dt,
      icon: city.weather[0].icon,
      description: city.weather[0].description,
      temp: city.main.temp,
      humidity: city.main.humidity,
      wind: city.wind.speed,
      country: city.sys.country
    };
  }

  static _transformThreeDaysWeather(city) {
    return {
      id: city.city.id,
      name: city.city.name,
      country: city.city.country,
      threeDaysList: [city.list[7], city.list[14], city.list[21]]
    };
  }
}
