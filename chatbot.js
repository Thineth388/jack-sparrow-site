// CHATBOT LOGIC - NEXT LEVEL

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
        <div class="chat-header-actions">
           <button class="clear-chat" id="clear-chat" title="Clear Chat History">&#128465;</button>
           <button class="close-chat" id="close-chat">&times;</button>
        </div>
      </div>
      <div class="chat-body" id="chat-body">
        <!-- Messages will be injected here -->
      </div>
      <div class="chat-suggestions" id="chat-suggestions">
        <button class="suggestion-chip" onclick="sendSuggestion('Where is the rum?')">Where is the rum?</button>
        <button class="suggestion-chip" onclick="sendSuggestion('Tell me about the Black Pearl')">The Black Pearl</button>
        <button class="suggestion-chip" onclick="sendSuggestion('Who is Hector Barbossa?')">Barbossa</button>
        <button class="suggestion-chip" onclick="sendSuggestion('Do you fear Davy Jones?')">Davy Jones</button>
      </div>
      <div class="chat-footer">
        <input type="text" id="chat-input" placeholder="Speak your mind, savvy?" onkeypress="handleKeyPress(event)" autocomplete="off">
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
  document.getElementById('clear-chat').addEventListener('click', clearChatHistory);
  
  loadChatHistory();
});

function toggleChat() {
  const chatWindow = document.getElementById('chat-window');
  const chatInput = document.getElementById('chat-input');
  chatWindow.classList.toggle('active');
  
  if (chatWindow.classList.contains('active')) {
    setTimeout(() => {
        chatInput.focus();
        scrollToBottom();
    }, 400);
  }
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

function sendSuggestion(text) {
  const inputField = document.getElementById('chat-input');
  inputField.value = text;
  sendChatMessage();
}

function sendChatMessage() {
  const inputField = document.getElementById('chat-input');
  const message = inputField.value.trim();
  
  if (message === '') return;
  
  // Add user message
  addMessage(message, 'user');
  saveMessageToHistory(message, 'user');
  inputField.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Bot typing effect
  setTimeout(() => {
    removeTypingIndicator();
    const response = getJackSparrowResponse(message);
    addMessage(response, 'bot');
    saveMessageToHistory(response, 'bot');
  }, 1200 + Math.random() * 1000); // 1.2 - 2.2 seconds delay
}

function addMessage(text, sender, animate = true) {
  const chatBody = document.getElementById('chat-body');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  if (animate) msgDiv.classList.add('animate-msg');
  msgDiv.textContent = text;
  
  chatBody.appendChild(msgDiv);
  scrollToBottom();
}

function showTypingIndicator() {
  const chatBody = document.getElementById('chat-body');
  const typingDiv = document.createElement('div');
  typingDiv.classList.add('message', 'bot', 'typing-indicator');
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(typingDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  const typingDiv = document.getElementById('typing-indicator');
  if (typingDiv) {
    typingDiv.remove();
  }
}

function scrollToBottom() {
  const chatBody = document.getElementById('chat-body');
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Local Storage Logic
function saveMessageToHistory(text, sender) {
  let history = JSON.parse(localStorage.getItem('jackSparrowChat') || '[]');
  history.push({ text, sender });
  localStorage.setItem('jackSparrowChat', JSON.stringify(history));
}

function loadChatHistory() {
  const history = JSON.parse(localStorage.getItem('jackSparrowChat') || '[]');
  const chatBody = document.getElementById('chat-body');
  chatBody.innerHTML = ''; // clear

  if (history.length === 0) {
    // Initial greeting
    const greeting = "Ahoy there, matey! I'm Captain Jack Sparrow. What brings ye to my ship?";
    addMessage(greeting, 'bot', false);
    saveMessageToHistory(greeting, 'bot');
  } else {
    history.forEach(msg => {
      addMessage(msg.text, msg.sender, false);
    });
  }
  scrollToBottom();
}

function clearChatHistory() {
  if(confirm("Are ye sure ye want to toss our history overboard?")) {
    localStorage.removeItem('jackSparrowChat');
    loadChatHistory();
  }
}

// Next-Level Mock AI Logic for Jack Sparrow
function getJackSparrowResponse(input) {
  const text = input.toLowerCase();
  
  const rules = [
    { match: /(rum|drink|bottle)/i, response: "Why is the rum always gone? Oh wait, that's right... I drank it." },
    { match: /(ship|pearl|black pearl)/i, response: "The Black Pearl is not just a ship, mate. She's freedom. Real freedom!" },
    { match: /(hello|hi|ahoy|greetings|hey)/i, response: "Ahoy! Do you have a jar of dirt? No? Then what use are ye to me?" },
    { match: /(name|who are you)/i, response: "There should be a 'Captain' in there somewhere. It's CAPTAIN Jack Sparrow, savvy?" },
    { match: /(treasure|gold|money|coins|doubloon)/i, response: "Not all treasure is silver and gold, mate. Though, I wouldn't say no to a few shiny doubloons!" },
    { match: /(barbossa|hector)/i, response: "Hector Barbossa... a mutinous, double-crossing, scoundrel! Still, he has a certain... charm, I suppose." },
    { match: /(will|turner|william)/i, response: "Ah, William Turner. A strapping young lad, bit too obsessed with doing the 'right thing' if you ask me." },
    { match: /(elizabeth|swann)/i, response: "Elizabeth... a fierce pirate king she turned out to be! Hide the rum when she's around, though." },
    { match: /(davy jones|kraken|locker)/i, response: "Do ye fear death? I certainly do when it comes with tentacles and a bad temper!" },
    { match: /(compass)/i, response: "My compass doesn't point north. It points to the thing you want most in this world." },
    { match: /(pirate|thief|scoundrel)/i, response: "Me? I'm dishonest, and a dishonest man you can always trust to be dishonest." },
    { match: /(bye|goodbye|farewell)/i, response: "Farewell! And remember this as the day you almost caught Captain Jack Sparrow!" },
    { match: /(love|marry|kiss)/i, response: "I am already married, mate. To the sea!" },
    { match: /(yes|yeah|yep|sure)/i, response: "Aye, that's the spirit!" },
    { match: /(no|nope|nah)/i, response: "No? Well, beggars can't be choosers, can they?" },
    { match: /(how are you|how do you do)/i, response: "I'm doing brilliantly, mate. Assuming you're not here to arrest me." },
    { match: /(joke|laugh|funny)/i, response: "A joke? Look at my face... do I look like a jester? Actually, don't answer that." },
  ];

  for (let rule of rules) {
    if (rule.match.test(text)) {
      return rule.response;
    }
  }

  const defaultResponses = [
    "Savvy?",
    "Take what you can, give nothing back!",
    "I'm Captain Jack Sparrow. The original. The only!",
    "Did everyone see that? Because I will not be doing it again.",
    "If you were waiting for the opportune moment, that was it.",
    "The seas may be rough, but I am the Captain!",
    "You seem familiar... have I threatened you before?",
    "Close your eyes and pretend it's all a bad dream. That's how I get by."
  ];
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
