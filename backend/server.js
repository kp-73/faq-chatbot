const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const { v4: uuidv4 } = require('uuid');

const app = express();

// ============================
// Middleware
// ============================
app.use(express.json());
app.use(express.static('public'));

// ============================
// Root Route (Test Deployment)
// ============================
app.get("/", (req, res) => {
    res.send("FAQ Chatbot Server Running 🚀");
});

// ============================
// Validate Environment Variable
// ============================
if (!process.env.GOOGLE_CREDENTIALS) {
    console.error("❌ GOOGLE_CREDENTIALS environment variable is missing!");
    process.exit(1);
}

let credentials;

try {
    credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
} catch (error) {
    console.error("❌ Invalid GOOGLE_CREDENTIALS JSON format:", error);
    process.exit(1);
}

// ============================
// Dialogflow Setup
// ============================
const projectId = credentials.project_id;

const sessionClient = new dialogflow.SessionsClient({
    credentials: credentials
});

// ============================
// Chat Route
// ============================
app.post('/chat', async (req, res) => {
    try {
        if (!req.body.message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const sessionId = uuidv4();
        const sessionPath = sessionClient.projectAgentSessionPath(
            projectId,
            sessionId
        );

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

        const result = responses[0].queryResult;

        const reply =
            result.fulfillmentText ||
            "Sorry, I didn't understand that.";

        res.json({ reply });

    } catch (error) {
        console.error("🔥 Dialogflow Error:", error);
        res.status(500).json({
            error: "Internal Server Error",
            details: error.message
        });
    }
});

// ============================
// Start Server (Render Compatible)
// ============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});