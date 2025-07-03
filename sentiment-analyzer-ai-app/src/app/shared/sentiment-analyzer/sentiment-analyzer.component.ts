import {
  Component,
  effect,
  HostBinding,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GCAiModel, GCSentiment } from '../types';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'sentiment-analyzer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sentiment-analyzer.component.html',
  styleUrl: './sentiment-analyzer.component.scss',
})
export class SentimentAnalyzerComponent {
  geminiService = inject(GeminiService);
  text = input.required<string>();
  model = input<GCAiModel | null>(null);
  hideSentiment = input(false);
  additionalContext = input('');
  sentiment = signal<GCSentiment | null>(null);
  loading = signal(false);
  error = signal<Error | null>(null);
  sentimentUpdated = output<GCSentiment | null>();
  @HostBinding('attr.data-sentiment')
  get sentimentAttr() {
    if (this.loading()) {
      return 'loading';
    }
    return this.sentiment()?.category || null;
  }
  constructor() {
    effect(
      () => {
        const textVal = this.text().trim();
        if (!textVal) {
          this.loading.set(false);
          this.sentiment.set(null);
          this.sentimentUpdated.emit(null);
          return;
        }
        this.loading.set(true);
        this.sentiment.set(null);
        this.geminiService
          .analyze(this.text(), this.model(), this.additionalContext())
          .then((result: any) => {
            if (this.geminiService.geminiApiConfig.debug) {
              console.log(result);
            }
            this.sentiment.set(result);
            this.error.set(null);
            this.sentimentUpdated.emit(result);
          })
          .catch((err: Error) => {
            console.error(err);
            this.error.set(err);
            this.sentiment.set(null);
          })
          .finally(() => {
            this.loading.set(false);
          });
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}