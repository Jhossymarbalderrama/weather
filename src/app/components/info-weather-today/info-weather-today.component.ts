import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-weather-today',
  templateUrl: './info-weather-today.component.html',
  styleUrls: ['./info-weather-today.component.css']
})
export class InfoWeatherTodayComponent {
  @Input() statistics: any;

  constructor(){    
  }
}
