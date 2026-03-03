const express = require('express');
const bodyParser = require('body-parser');
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serves your HTML/CSS

// Replace with your Project ID from the JSON file
const projectId = 'faq-bot-lldi'; 
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./credentials.json"
});

app.post('/chat', async (req, res) => {
    const sessionId = uuidv4();
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: { text: { text: req.body.message, languageCode: 'en-US' } },
    };

    const responses = await sessionClient.detectIntent(request);
    res.send({ reply: responses[0].queryResult.fulfillmentText });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));