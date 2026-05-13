// CHATBOT LOGIC

const chatbotHTML = `
  <div id="jack-chatbot">
    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-avatar"></div>
          <div>
            <h3>Jack Sparrow</h3>
            <p>Captain</p>
          </div>
        </div>
        <button class="close-chat" id="close-chat">&times;</button>
      </div>
      <div class="chat-body" id="chat-body">
        <div class="message bot">
          Ahoy there, matey! I'm Captain Jack Sparrow. What brings ye to my ship?
        </div>
      </div>
      <div class="chat-footer">
        <input type="text" id="chat-input" placeholder="Speak your mind, savvy?" onkeypress="handleKeyPress(event)">
        <button id="send-msg-btn" onclick="sendChatMessage()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
    <div class="chat-toggle-btn" id="chat-toggle-btn" onclick="toggleChat()">
      🏴‍☠️
    </div>
  </div>
`;

// Append chatbot to body
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  
  document.getElementById('close-chat').addEventListener('click', toggleChat);
});

function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.classList.toggle('active');
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const inputField = document.getElementById('chat-input');
  const message = inputField.value.trim();
  
  if (message === '') return;
  
  // Add user message
  addMessage(message, 'user');
  inputField.value = '';
  
  // Bot typing effect
  setTimeout(() => {
    const response = getJackSparrowResponse(message);
    addMessage(response, 'bot');
  }, 1000 + Math.random() * 1000); // 1-2 seconds delay
}

function addMessage(text, sender) {
  const chatBody = document.getElementById('chat-body');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  
  chatBody.appendChild(msgDiv);
  
  // Scroll to bottom
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Simple Mock AI Logic for Jack Sparrow
function getJackSparrowResponse(input) {
  const text = input.toLowerCase();
  
  if (text.includes('rum')) {
    return "Why is the rum always gone? Oh wait, that's right... I drank it.";
  } else if (text.includes('ship') || text.includes('pearl')) {
    return "The Black Pearl is not just a ship, mate. She's freedom.";
  } else if (text.includes('hello') || text.includes('hi')) {
    return "Ahoy! Do you have a jar of dirt? No? Then what use are ye to me?";
  } else if (text.includes('name')) {
    return "There should be a 'Captain' in there somewhere. It's CAPTAIN Jack Sparrow, savvy?";
  } else if (text.includes('treasure') || text.includes('gold')) {
    return "Not all treasure is silver and gold, mate. Though, I wouldn't say no to a few shiny doubloons!";
  } else if (text.includes('barbossa')) {
    return "Hector Barbossa... a mutinous, double-crossing, scoundrel! Still, he has a certain... charm, I suppose.";
  } else if (text.includes('will') || text.includes('turner')) {
    return "Ah, William Turner. A strapping young lad, bit too obsessed with doing the 'right thing' if you ask me.";
  } else {
    const defaultResponses = [
      "Savvy?",
      "Take what you can, give nothing back!",
      "I'm Captain Jack Sparrow. The original. The only!",
      "Did everyone see that? Because I will not be doing it again.",
      "Me? I'm dishonest, and a dishonest man you can always trust to be dishonest.",
      "If you were waiting for the opportune moment, that was it.",
      "My compass doesn't point north, but we're not trying to find north, are we?"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}
