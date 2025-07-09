# Angular Apps with Google Gemini AI
Gemini is a multimodal AI model that can understand and generate text, as well as other types of information like audio, images, videos, and code. Gemini is Google's most capable AI model, and is the first to outperform human experts on MMLU (Massive Multitask Language).

# Types of Gemini Models

**Flash**
Flash is all about speed. Think of Usain Bolt, the fastest man ever. This is flash. Flash is built for tasks that need quick responses. Real time interaction and lightning fast results. Say, for example, you're working on something that needs instant feedback like customers, live chat, fast summarization, or troubleshooting an urgent problem. 
Flash is the one to call.
Our best model in terms of price-performance, offering well-rounded capabilities.
  -   Input audio, images, video, and text, and get text responses
  -   Model thinks as needed; or, you can configure a thinking budget
  -   Best for low latency, high volume tasks that require thinking

**Pro**
Pro is the powerhouse of the family. Pro is the marathon runner. It's made for those bigger, more complex tasks. Stuff like, uh, detailed research, analyzing big chunks of data, solving complex mathematical problems, going through the stock market graphs and then analyzing them. You name it, whatever thing that comes complex in the mind. This is for the pro.
Our most powerful thinking model with maximum response accuracy and state-of-the-art performance.
  -  Input audio, images, video, and text, get text responses
  -  Tackle difficult problems, analyze large databases, and more
  -  Best for complex coding, reasoning, and multimodal understanding

**Flash Light**
Then comes the flash thinking this is the strategist of the family. This model isn't just fast or powerful. It's smart. It can analyze reasons and even predict outcomes based on the information you give it. Let's say, for example, you are planning a business or brainstorming for a travel trip. Thinking. doesn't just give you answers. It connects the dots. It helps you strategize. Gets your old data and preferences and uses them as a reference to make decisions that feel thoughtful. It also gives you a backlog of how it thoughts about it, so you know exactly how it landed and how it ended with the responses it gave you. Flush thinking is having a friend with a very high IQ who thinks with you, and over time he understands you.
A Flash light model optimized for cost efficiency and low latency.
  -   Input audio, images, video, and text, and get text responses
  -   Most cost-efficient model supporting high throughput
  -   Best for real time, low latency use cases

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
