import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // https://api.openweathermap.org/data/2.5/forecast?q=Avellaneda,AR&id=524901&appid=0760a619b387387536f1ad54b77ef912&lang=es
  
  private urlAPI16Days: string = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=";
  
  private apiId: string = "0760a619b387387536f1ad54b77ef912";
  private lang = "es";

  constructor() { }
  
  getTodayWeather(city: string, country: string): string{
    return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${this.apiId}&lang=${this.lang}`;
  }

  getWeatherFiveDays(city: string, country: string){
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&id=524901&appid=${this.apiId}&lang=${this.lang}`;
  }

  //GeoLocalizacion
  // https://api.openweathermap.org/data/2.5/weather?lat=-58.3586&lon=-34.6748&appid=0760a619b387387536f1ad54b77ef912&lang=es
  getTodayWeatherGEO(lon: any, lat: any){
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${this.apiId}&lang=${this.lang}`
  }

  getWeatherFiveDaysGEO(lon: any, lat: any){
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&id=524901&appid=${this.apiId}&lang=${this.lang}`
  }
}

