import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  useLocation?: [number,number];
  
  get isUserLocationReady(): boolean{
    return !!this.useLocation;
  }

  constructor() { 
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve, reject) =>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) =>{
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        ( err ) => {
          let txt = "Error. Geolocalización. "
          alert(txt + err);
          console.log(txt + err);  
          reject();        
        }
      );
    });
  }
}
