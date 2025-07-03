import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgClass } from '@angular/common';
import { GCSentiment } from './shared/types';
import { SentimentAnalyzerComponent } from './shared/sentiment-analyzer/sentiment-analyzer.component';
import { GeminiService } from './shared/services/gemini.service';
import { GCSupportedModels } from './shared/constants/ai-models';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SentimentAnalyzerComponent,
    ReactiveFormsModule,
    JsonPipe,
    NgClass,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  fb = inject(FormBuilder);
  geminiService = inject(GeminiService);
  toastr = inject(ToastrService);
  form = this.fb.nonNullable.group({
    inputTextVal: ['', Validators.required],
    model: [GCSupportedModels[1].name, Validators.required],
    showSentiment: [true],
    showMessage: [true],
    additionalContext: [
      "And I want you to analyze the sentiment of the text written by a user for commenting. We're not going to allow posting comments over 'intensity' of 0.7.",
    ],
  });
  models = GCSupportedModels;
  sentimentsHistory = signal<{ text: string; sentiment: GCSentiment }[]>([]);
  lastSentimentInput = signal('');
  typing = signal(false);

  sentimentComp = viewChild.required(SentimentAnalyzerComponent);

  addToHistory(sentiment: GCSentiment | null) {
    if (!sentiment) {
      return;
    }
    const text = this.lastSentimentInput();
    console.log('sentiment: ', sentiment);
    this.sentimentsHistory.update((history) => {
      return [
        {
          text,
          sentiment,
        },
        ...history,
      ];
    });
  }

  inputTextValDebounced = toSignal(
    this.form.controls.inputTextVal.valueChanges.pipe(
      debounceTime(1000),
      tap((val) => {
        this.typing.set(false);
        if (val) {
          this.lastSentimentInput.set(val);
        }
      })
    ),
    {
      initialValue: '',
    }
  );

  postComment() {
    const inputValCtrl = this.form.controls.inputTextVal;
    inputValCtrl.reset();
    this.toastr.success('Comment posted');
  }
}