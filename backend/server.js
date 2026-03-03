const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.json({
        envExists: !!process.env.GOOGLE_CREDENTIALS,
        envPreview: process.env.GOOGLE_CREDENTIALS
            ? process.env.GOOGLE_CREDENTIALS.substring(0, 50)
            : "NOT FOUND"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});