// ========== STATE MANAGEMENT ==========
const state = {
    currentUser: null,
    messages: [],
    maxMessageLength: 500
};

// ========== DOM ELEMENTS ==========
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const changeUserBtn = document.getElementById('changeUserBtn');
const currentUserDisplay = document.getElementById('currentUser');
const userModal = document.getElementById('userModal');
const userNameInput = document.getElementById('userNameInput');
const confirmUserBtn = document.getElementById('confirmUserBtn');
const charCount = document.getElementById('charCount');

// ========== INITIALIZATION ==========
function init() {
    loadFromLocalStorage();
    
    if (!state.currentUser) {
        showUserModal();
    } else {
        updateUserDisplay();
    }

    setupEventListeners();
    renderMessages();
}

// ========== LOCAL STORAGE ==========
function saveToLocalStorage() {
    const data = {
        user: state.currentUser,
        messages: state.messages
    };
    localStorage.setItem('chatAppData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('chatAppData');
    if (savedData) {
        const data = JSON.parse(savedData);
        state.currentUser = data.user;
        state.messages = data.messages || [];
    }
}

// ========== USER MANAGEMENT ==========
function showUserModal() {
    userModal.style.display = 'block';
    userNameInput.focus();
}

function hideUserModal() {
    userModal.style.display = 'none';
}

function setUser(name) {
    if (name.trim().length === 0) {
        alert('Please enter a valid name!');
        return false;
    }
    
    const trimmedName = name.trim().substring(0, 20);
    state.currentUser = trimmedName;
    updateUserDisplay();
    saveToLocalStorage();
    return true;
}

function updateUserDisplay() {
    currentUserDisplay.textContent = state.currentUser || 'Guest';
}

// ========== MESSAGE MANAGEMENT ==========
function addMessage(text, user) {
    if (text.trim().length === 0) return;

    const message = {
        id: Date.now(),
        user: user,
        text: text.trim(),
        timestamp: new Date()
    };

    state.messages.push(message);
    saveToLocalStorage();
    renderMessages();
    scrollToBottom();
}

function renderMessages() {
    messagesContainer.innerHTML = '';

    if (state.messages.length === 0) {
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <p>Welcome to Chat App! 👋</p>
                <p>Start chatting now...</p>
            </div>
        `;
        return;
    }

    state.messages.forEach(message => {
        const messageEl = createMessageElement(message);
        messagesContainer.appendChild(messageEl);
    });

    scrollToBottom();
}

function createMessageElement(message) {
    const div = document.createElement('div');
    const isOwn = message.user === state.currentUser;
    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    div.className = `message ${isOwn ? 'own' : 'other'}`;
    div.innerHTML = `
        <div class="message-content">
            ${!isOwn ? `<div class="message-header">${escapeHtml(message.user)}</div>` : ''}
            <div class="message-text">${escapeHtml(message.text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

    return div;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ========== SEND MESSAGE ==========
function sendMessage() {
    const text = messageInput.value;

    if (text.trim().length === 0) {
        messageInput.focus();
        return;
    }

    addMessage(text, state.currentUser);
    messageInput.value = '';
    charCount.textContent = '0/500';
    messageInput.focus();
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    sendBtn.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    messageInput.addEventListener('input', (e) => {
        const length = e.target.value.length;
        charCount.textContent = `${length}/${state.maxMessageLength}`;

        if (length > state.maxMessageLength) {
            e.target.value = e.target.value.substring(0, state.maxMessageLength);
            charCount.textContent = `${state.maxMessageLength}/${state.maxMessageLength}`;
        }
    });

    changeUserBtn.addEventListener('click', () => {
        showUserModal();
        userNameInput.value = state.currentUser;
    });

    confirmUserBtn.addEventListener('click', () => {
        const name = userNameInput.value;
        if (setUser(name)) {
            hideUserModal();
            messageInput.focus();
        }
    });

    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            confirmUserBtn.click();
        }
    });

    // Close modal when clicking outside
    userModal.addEventListener('click', (e) => {
        if (e.target === userModal) {
            if (state.currentUser) {
                hideUserModal();
            }
        }
    });

    userNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.currentUser) {
            hideUserModal();
        }
    });
}

// ========== INITIALIZE APP ==========
init();
