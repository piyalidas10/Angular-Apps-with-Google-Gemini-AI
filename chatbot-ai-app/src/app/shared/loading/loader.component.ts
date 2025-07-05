import {
  Component,
  effect,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoaderComponent {
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
  constructor() {
    effect(() => {
      console.log('loading => ', this.loading());
    });
  }
}