import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { GeminiService } from './shared/services/gemini.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './shared/loading/loader.component';
import { LoadingService } from './shared/loading/loading.service';
import { ChatModel } from './shared/constants/chat-model';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    NgClass,
    FormsModule,
    CommonModule,
    LoaderComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  prompt: string = '';
  geminiService = inject(GeminiService);
  loadingService = inject(LoadingService);
  loading = this.loadingService.loading;

  // chatHistory: ChatModel[] = [];
  chatHistory: ChatModel[] = [];
  constructor() {
    // this.geminiService.getChatHistory().subscribe((res) => {
    //   if(res) {
    //     this.chatHistory.push(res);
    //   }
    // })
    effect(() => {
      this.chatHistory = this.geminiService.chatHistory();
    });
  }

  async sendChat() {
    if(this.prompt && !this.loading()) {
      this.loadingService.loadingOn();
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
    }
  }

  formatChatMsg(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }
}