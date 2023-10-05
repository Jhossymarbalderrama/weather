import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent {
  @Input() todayMinMax: any;

  weatherOnlyNextFiveDays: any = new Array();

  weathers: any = {
    place: {
      name: "",
      country: "",
      lat: 0,
      lon: 0,
    },
    list: {
      main: {
        feelS_like: 0,
        grnd_level: 0,
        humidity: 0,
        pressure: 0,
        sea_level: 0,
        temp: 0,
        temp_kf: 0,
        temp_max: 0,
        temp_min: 0,
      },
      date: {
        day: "",
        hour: "",
      },
      weather: {
        main: "",
        description: "",
        icon: "",
      },
      wind: {
        deg: 0,
        gust: 0,
        speed: 0,
      }
      ,
      visibility: 0
    }
  }

  country: string = "AR";
  loc: string = "Avellaneda"

  constructor(private WeatherService: WeatherService) {
    fetch(this.WeatherService.getWeatherFiveDays(this.loc, this.country)).then(data => {
      return data.json();
    })
      .then(async dataJSON => {
        this.weathers.place = {
          name: dataJSON.city.name,
          country: dataJSON.city.country,
          lat: dataJSON.city.coord.lat,
          lon: dataJSON.city.coord.lon
        };

        this.weathers.list = await this.loadListWeather(dataJSON.list);
        this.weatherOnlyNextFiveDays = await this.getOnliFiveDays(this.weathers.list);

        this.updateMinMaxToday();
      });
  }

  updateMinMaxToday() {
    this.weatherOnlyNextFiveDays[0].temp_min_day = this.todayMinMax.temp_min;
    this.weatherOnlyNextFiveDays[0].temp_max_day = this.todayMinMax.temp_max;
  }

  async loadListWeather(list: any): Promise<Object> {
    let auxList: any = new Array();
    list.forEach((w: any) => {
      let iconOnlyDay: string = (w.weather[0].icon).substring(0, (w.weather[0].icon).length - 1);
      let urlIcon: string = "";

      if (new Date().getHours() > 6 && new Date().getHours() < 19) {
        urlIcon = `https://openweathermap.org/img/wn/${iconOnlyDay}d@2x.png`;
      } else {
        urlIcon = `https://openweathermap.org/img/wn/${iconOnlyDay}n@2x.png`;
      }

      auxList.push({
        main: {
          feels_like: w.main.feels_like,
          grnd_level: w.main.grnd_level,
          humidity: w.main.humidity,
          pressure: w.main.pressure,
          sea_level: w.main.sea_level,
          temp: this.convertCentigrade(w.main.temp),
          temp_kf: this.convertCentigrade(w.main.temp_kf),
          temp_max: this.convertCentigrade(w.main.temp_max),
          temp_min: this.convertCentigrade(w.main.temp_min),
        },
        date: {
          day: (w.dt_txt.split(" "))[0],
          hour: (w.dt_txt.split(" "))[1],
        },
        weather: {
          main: w.weather[0].main,
          description: w.weather[0].description,
          icon: urlIcon
        },
        wind: {
          deg: w.wind.deg,
          gust: w.wind.gust,
          speed: w.wind.speed
        },
        visibility: w.visibility
      });
    });

    return auxList;
  }

  convertCentigrade(temp: number) {
    return parseInt(Math.round(((temp - 273.15) * 100) / 100).toFixed(1));
  }

  async getOnliFiveDays(list: any): Promise<[]> {
    let listDays: any = new Array();
    let dateBefore: string = "";
    let today: string = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + ("0" + new Date().getDate()).slice(-2);
    today = new Date(today).toLocaleDateString("es-ES", { day: "numeric", year: "numeric", month: "short" });

    let temperaturasDay: any = new Array();

    list.forEach((w: any) => {
      let date: any = new Date(w.date.day).toLocaleDateString("es-ES", { day: "numeric", year: "numeric", month: "short" });

      if (date !== dateBefore && date !== today) {
        temperaturasDay.sort(function (a: number, b: number) {
          return a - b;
        });

        listDays.push(
          {
            main: w.main,
            date: {
              day: date,
              hour: w.date.hour
            },
            weather: w.weather,
            wind: w.wind,
            visibility: w.visibility,
            temp_min_day: temperaturasDay[0],
            temp_max_day: temperaturasDay.slice(-1)[0]
          }
        );
        dateBefore = date
        temperaturasDay = [];
      } else {
        temperaturasDay.push(w.main.temp);
      }
    });

    return listDays;
  }
}
