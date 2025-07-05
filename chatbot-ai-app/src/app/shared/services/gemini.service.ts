import { inject, Injectable, signal } from '@angular/core';
import { GC_API_CONFIG } from '../tokens/gemini-api-config';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { ChatModel } from '../constants/chat-model';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  geminiApiConfig = inject(GC_API_CONFIG);
  genAI!: GoogleGenerativeAI;
  chatHistorySignal = signal<ChatModel[]>([]);
  chatHistory = this.chatHistorySignal.asReadonly();
  // private chatHistory: BehaviorSubject<ChatModel> = new BehaviorSubject(null);
  chatId: number = 0;
  loadingService = inject(LoadingService);

  constructor() {
    this.checkConfig();
  }
  checkConfig() {
    if (this.genAI) {
      return;
    }
    if (!this.geminiApiConfig.apiKey) {
      throw new Error('Gemini Api Key not provided');
    }
    if (!this.geminiApiConfig.model) {
      throw new Error('Gemini model not provided');
    }
    // new GoogleGenerativeAI(environment.API_KEY)
    this.genAI = new GoogleGenerativeAI(this.geminiApiConfig.apiKey); 
  }

  async generateText(
    prompt: string
  ) {
    this.checkConfig();
    this.chatId = this.chatId + 1;
    const model = this.genAI.getGenerativeModel({
      model: this.geminiApiConfig.model
    });
    this.chatHistorySignal.update((elm) => [...elm, {
      id: this.chatId,
      from: 'user',
      message: prompt
    }]);
    // this.chatHistory.next({
    //   id: this.chatId,
    //   from: 'user',
    //   message: prompt
    // });
    const result = await model.generateContent([prompt]);
    const text = result.response.text();
    console.log(text);
    this.chatHistorySignal.update((elm) => [...elm, {
      id: this.chatId,
      from: 'bot',
      message: text
    }]);
    // this.chatHistory.next({
    //   id: this.chatId,
    //   from: 'bot',
    //   message: text
    // })
    this.loadingService.loadingOff();
  }

  // public getChatHistory(): Observable<any> {
  //   return this.chatHistory.asObservable();
  // }
}