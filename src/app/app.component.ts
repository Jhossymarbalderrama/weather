import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todayMinMax: any;
  statistics: any;
  
  constructor() {
  }

  updateToday(data: any){ 
    this.todayMinMax = data;
  }

  viewStatistics(data: any){
    this.statistics = data;
  }
}
