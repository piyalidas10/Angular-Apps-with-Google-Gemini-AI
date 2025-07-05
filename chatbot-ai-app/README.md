# Chatbot using Google Gemini API (Gemini 2.5 Pro & Gemini 2.5 Flash)
https://aistudio.google.com/prompts/new_chat  
https://ai.google.dev/gemini-api/docs  
https://ai.google.dev/gemini-api/docs/models  
https://ai.google.dev/api/generate-content  
https://googleapis.github.io/js-genai/release_docs/index.html  

![Google Gemini API](./img/Gemini_AI_API.png)

The Gemini API key is free to obtain and use for testing and development purposes. You can get your API key by creating a free account on Google AI Studio and following the instructions to generate it. While there is a free tier with rate limits for testing, higher rate limits and more features are available in a paid tier. 

![Chatbot 1](./img/chatbot_1.png)
![Chatbot 2](./img/chatbot_2.png)
![Chatbot 3](./img/chatbot_3.png)

# How to Generate a Google Gemini API Key: Step-by-Step Guide
https://www.youtube.com/watch?v=o8iyrtQyrZM

# Integrating Gemini AI into an Angular 19 application involves several key steps to leverage its generative AI capabilities.

## Obtain a Gemini API Key:
Sign up for a Google Cloud developer account.
Access Google AI Studio and generate a new API key. This key is essential for authenticating requests to the Gemini API.

## Install the Google Generative AI SDK:
In your Angular project, install the official Google Generative AI SDK using npm:
Code

     npm install @google/generative-ai

## Create an Angular Service for Gemini API Interaction:
Generate a new service using the Angular CLI:
Code

     ng generate service gemini

In this service, import the GoogleGenerativeAI client and initialize it with your API key.
Implement methods within the service to handle different Gemini functionalities, such as:
Text generation: Sending text prompts to the model and receiving text responses.
Multimodal input: Sending text and image inputs for multimodal content generation.
Chat functionality: Managing multi-turn conversations with the Gemini model.
Streaming responses: Handling real-time streaming of AI-generated content.

## Integrate the Gemini Service into Angular Components:
Inject the GeminiService into your Angular components where you need to interact with the AI.
Call the appropriate methods from the GeminiService based on user interactions (e.g., submitting a chat message, uploading an image).
Display the AI-generated responses within your component's template, potentially using Angular's reactive programming features for real-time updates.

## Enhance User Experience:
Design a user-friendly interface for interacting with the AI, including input fields, chat bubbles, and potentially features like predefined questions or personality selection options.
Implement loading indicators or animations to provide feedback during AI processing.
Example of Service Initialization:
TypeScript

// src/app/gemini.service.ts
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../environments/environment'; // Assuming you store API key in environment

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any; // Or specify a more precise type if available

  /*
  Initialize your model
  -----------------------------------------------------------------------------------------------
  Before calling Gemini we need to go through the model initialization. This includes the following steps:

  1. Initializing GoogleGenerativeAI client with your API key.
  2. Choosing a Gemini model: gemini-pro or gemini-pro-vision.
  3. Setting up model parameters including safetySettings, temperature, top_p, top_k and maxOutputTokens.
  */
  constructor() {
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
    this.genAI = new GoogleGenerativeAI(environment.googleAiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' , ...generationConfig}); // Or 'gemini-pro-vision' for multimodal
  }

  async generateText(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  // Add methods for chat, multimodal input, etc.
}

