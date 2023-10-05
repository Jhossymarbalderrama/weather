import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherTodayComponent } from './components/weather-today/weather-today.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { InfoWeatherTodayComponent } from './components/info-weather-today/info-weather-today.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherTodayComponent,
    WeatherListComponent,
    InfoWeatherTodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
