# faq-chatbot

A simple FAQ chatbot built using Node.js, Express, and Google Dialogflow ES
This chatbot answers user questions based on predefined intents created in Dialogflow.
_________________________________________________________________________________________________________________________
This project connects a Node.js backend to Google Dialogflow ES to process user queries and return intelligent responses.  
It includes:
- Express server
- Dialogflow integration
- REST API endpoint (/chat)
- Simple frontend interface
_________________________________________________________________________________________________________________________
Follow these steps to run the chatbot on your system.

1️⃣ Clone the Repository
git clone https://github.com/your-username/faq-chatbot.git
cd faq-chatbot/backend

2️⃣ Install Dependencies
npm install

3️⃣ Create Google Dialogflow Service Account
1.Go to Google Cloud Console
2.Create a Service Account
3.Generate a JSON key
4.Copy the entire JSON file content

4️⃣ Set Environment Variable
Set the downloaded JSON as an environment variable.
setx GOOGLE_CREDENTIALS "PASTE_FULL_JSON_HERE"

5️⃣ Start the Server
node server.js
Server will run at: http://localhost:3000



