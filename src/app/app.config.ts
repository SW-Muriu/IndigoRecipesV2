import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HeadersInterceptorsService } from './architecture/services/interceptors/headers-interceptors.service';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),

    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptorsService,
      multi: true
    }
  ]

};
