import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if( !navigator.geolocation){
  alert('Dispositivo no soporta la Geolocalización');
  throw new Error('Dispositivo no soporta la Geolocalización');
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
