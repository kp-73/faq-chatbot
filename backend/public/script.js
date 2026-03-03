async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const message = input.value.trim();
    
    if (!message) return;

    // 1. Add User Bubble
    chatWindow.innerHTML += `
        <div class="bubble user-msg">${message}</div>
    `;
    input.value = '';
    
    // Scroll to bottom
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // 2. Add Bot Bubble
        chatWindow.innerHTML += `
            <div class="bubble bot-msg">${data.reply}</div>
        `;
    } catch (err) {
        chatWindow.innerHTML += `<div class="bubble bot-msg">Error connecting to server.</div>`;
    }

    // Scroll to bottom again
    chatWindow.scrollTop = chatWindow.scrollHeight;
}