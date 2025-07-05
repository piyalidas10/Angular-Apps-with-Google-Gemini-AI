import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GC_API_CONFIG } from './shared/tokens/gemini-api-config';
import { GCSupportedModels } from './shared/constants/ai-models';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: GC_API_CONFIG,
      useValue: {
        apiKey: environment.API_KEY,
        model: GCSupportedModels[1].name
      }
    },
    provideAnimations(),
  ]
};
