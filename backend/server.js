const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Use modern JSON parser
app.use(express.json());
app.use(express.static('public'));

// Root route (for testing deployment)
app.get("/", (req, res) => {
    res.send("FAQ Chatbot Server Running 🚀");
});

// ===== Dialogflow Setup =====
const projectId = 'faq-bot-lldi';

let sessionClient;

try {
    sessionClient = new dialogflow.SessionsClient({
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS)
    });
} catch (error) {
    console.error("Failed to load Google credentials:", error);
}

// ===== Chat Route =====
app.post('/chat', async (req, res) => {
    try {
        if (!req.body.message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const sessionId = uuidv4();
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: req.body.message,
                    languageCode: 'en-US'
                }
            }
        };

        const responses = await sessionClient.detectIntent(request);

        const reply =
            responses[0].queryResult.fulfillmentText ||
            "Sorry, I didn't understand that.";

        res.json({ reply });

    } catch (error) {
        console.error("Dialogflow Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});