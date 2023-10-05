import { Component, Output, EventEmitter } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.css']
})
export class WeatherTodayComponent {
  @Output() getTempMinMax = new EventEmitter<any>();
  @Output() getStatistics = new EventEmitter<any>();

  // Weather de hoy 
  weatherToday: any = {
    name: "",
    description: "",
    temp: "",
    temp_min: "",
    temp_max: "",
    icon: "",
    wind: {},
    pressure: 0,
    humidity: 0,
    visibility: 0
  }
  country: string = "AR";
  loc: string = "Avellaneda"
  constructor(
    private WeatherService: WeatherService,
    private PlacesService: PlacesService
    ) {       

    PlacesService.getUserLocation().then((data:any) =>{
      console.log(data);     
    });

    // Get Weather Today
    fetch(this.WeatherService.getTodayWeather(this.loc, this.country)).then(data => {
      return data.json();
    })
      .then(async dataJSON => {
        if (dataJSON.cod === 404) {
          alert('City not found');
        } else if (dataJSON.cod === 200) {
          this.weatherToday =  await this.getWeatherToday(dataJSON);
          this.getTempMinMax.emit({
            temp_max: this.weatherToday.temp_max, 
            temp_min: this.weatherToday.temp_min
          });

          this.getStatistics.emit({
            wind: this.weatherToday.wind,
            humidity: this.weatherToday.humidity,
            visibility: this.weatherToday.visibility,
            pressure: this.weatherToday.pressure
          });
        }
      });
  }


  // Get Weather Today
  async getWeatherToday(data: any): Promise<any> {
    let { name, main: { temp, temp_min, temp_max, pressure, humidity }, weather: [arr], wind: { speed }, visibility } = data;
    let auxObj: any;
        
    auxObj = {
      name: name,
      description: arr.description,
      temp: this.convertCentigrade(temp),
      temp_min: this.convertCentigrade(temp_min),
      temp_max: this.convertCentigrade(temp_max),
      icon: `https://openweathermap.org/img/wn/${arr.icon}@2x.png`,
      wind: {
        speed: speed
      },
      pressure: pressure,
      humidity: humidity,
      visibility: visibility / 1000,
      day: new Date().toLocaleDateString("es-ES",{ day:"numeric",year: "numeric", month:"short"})
    };  
    
    return auxObj;
  }


  convertCentigrade(temp: number) {
    return parseInt(Math.round(((temp - 273.15) * 100) / 100).toFixed(1));
  }
}
