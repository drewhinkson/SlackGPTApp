# SlackGPTApp

## Introduction
 This is a Slack bot that integrates with the openAI API and will respond in thread to your questions. It has context awareness, so it's aware of past questions, and responses in the same thread.

## Features
- **Context Awareness**: Keeps track of conversations within a thread for coherent and relevant responses.
- **OpenAI Integration**: Leverages the power of OpenAI's advanced AI models for generating responses.
- **Slack Integration**: Designed to operate smoothly within the Slack environment.

## How It Works
1. **Message Classification**: Using natural language processing, the bot classifies incoming Slack messages to determine if they are Slack-related or not. See [`classifier.js`](https://github.com/drewhinkson/SlackGPTApp/blob/main/classifier.js) for implementation details.
2. **Database Interaction**: Messages are stored and retrieved from MongoDB for context tracking. Refer to [`database.js`](https://github.com/drewhinkson/SlackGPTApp/blob/main/database.js) for database operations.
3. **Event Handling**: The bot handles Slack events, especially messages, and interacts with the OpenAI API for generating responses. Check [`slackEventReceiver.js`](https://github.com/drewhinkson/SlackGPTApp/blob/main/slackEventReceiver.js) for more.
4. **Server Setup**: The application runs on an Express server, configured in [`server.js`](https://github.com/drewhinkson/SlackGPTApp/blob/main/server.js).

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up environment variables for MongoDB and OpenAI API keys.
4. Run the server: `npm start`.

