# Angular Apps with Google Gemini AI
Gemini is a multimodal AI model that can understand and generate text, as well as other types of information like audio, images, videos, and code. Gemini is Google's most capable AI model, and is the first to outperform human experts on MMLU (Massive Multitask Language).

## Gemini Models
https://ai.google.dev/gemini-api/docs/models

## Gemini Model Error
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent (POST) - 503 error
```
{
  "error": {
    "code": 503,
    "message": "The model is overloaded. Please try again later.",
    "status": "UNAVAILABLE"
  }
}
```
![Gemini_API_Error_1](./img/Gemini_API_Error_1.png)
![Gemini_API_Error_2](./img/Gemini_API_Error_2.png)

##  How to Generate a Google Gemini API Key: Step-by-Step Guide
Sign up for a Google Cloud developer account. Access Google AI Studio and generate a new API key. This key is essential for authenticating requests to the Gemini API. 
https://aistudio.google.com/app/apikey 
https://www.youtube.com/watch?v=o8iyrtQyrZM 

## Install the Google Generative AI SDK:
In your Angular project, install the official Google Generative AI SDK using npm:
Code
```
npm install @google/generative-ai
```
