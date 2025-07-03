import { inject, Injectable } from '@angular/core';
import { GC_API_CONFIG } from '../tokens/gemini-api-config';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { GCAiModel, GCSentiment } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  /*
  const genAI = new GoogleGenerativeAI(environment.API_KEY);
  const generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };
  const model = genAI.getGenerativeModel({
    model: 'gemini-pro', // or 'gemini-pro-vision'
    ...generationConfig,
  });
  */

  geminiApiConfig = inject(GC_API_CONFIG);
  genAI!: GoogleGenerativeAI;

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

  async analyze(
    text: string,
    configModel: GCAiModel | null,
    additionalContext = ''
  ) {
    this.checkConfig();
    const model = this.genAI.getGenerativeModel({
      model: configModel || this.geminiApiConfig.model,
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            response: {
              type: SchemaType.OBJECT,
              properties: {
                sentiment: {
                  type: SchemaType.STRING,
                  enum: [
                    'Toxic',
                    'Vulgar',
                    'Offensive',
                    'Harassment',
                    'Angry',
                    'Sad',
                    'Spam',
                    'Neutral',
                    'Sarcastic',
                    'Positive',
                    'Happy',
                    'Supportive',
                    'Constructive',
                    'Funny',
                    'Grateful',
                  ],
                },
                intensity: {
                  type: SchemaType.NUMBER,
                },
                emoji: {
                  type: SchemaType.STRING,
                },
                category: {
                  type: SchemaType.STRING,
                  enum: ['negative', 'positive', 'neutral'],
                },
                suggested_action: {
                  type: SchemaType.STRING,
                  enum: ['block', 'allow'],
                },
                reason: {
                  type: SchemaType.STRING,
                },
                message: {
                  type: SchemaType.STRING,
                },
              },
              required: [
                'sentiment',
                'intensity',
                'emoji',
                'category',
                'suggested_action',
                'reason',
              ],
            },
          },
          required: ['response'],
        },
      },
    });
    const prompt = `
      You are an expert sentiment analyst. ${additionalContext}
      The 'intensity' can be from 0 to 1. Give an emoji for the particular sentiment & intensity.
      Also include the message to show to the user typing that text

      Text:
      ${text}
    `;
    const result = await model.generateContent([prompt]);
    return JSON.parse(result.response.text()).response as GCSentiment;
  }
}