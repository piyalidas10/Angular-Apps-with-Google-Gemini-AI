import { InjectionToken } from '@angular/core';
import { GCConfig } from '../types';

export const GC_API_CONFIG = new InjectionToken<GCConfig>(
  'GC_API_CONFIG'
);