// ============================================
// REAL-TIME FEATURES - SOCKET.IO CLIENT
// Handles chat, forum, and live notifications
// ============================================

// Configuration
const SERVER_URL = 'http://localhost:5000';
let socket = null;
let isConnected = false;

// Initialize Socket.io Connection
function initializeSocket() {
    console.log('🔌 Attempting to connect to backend...');
    
    socket = io(SERVER_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
    });

    socket.on('connect', () => {
        console.log('✅ Connected to server');
        isConnected = true;
        updateConnectionStatus(true);
        loadChatHistory();
        loadDiscussions();
    });

    socket.on('disconnect', () => {
        console.log('❌ Disconnected from server');
        isConnected = false;
        updateConnectionStatus(false);
    });

    socket.on('connect_error', (error) => {
        console.log('⚠️ Connection error:', error);
        console.log('💡 Make sure backend server is running: npm run dev');
    });

    setupChatListeners();
    setupForumListeners();
    setupReportListeners();
}

// ============================================
// CONNECTION STATUS INDICATOR
// ============================================

function updateConnectionStatus(connected) {
    let indicator = document.getElementById('connectionIndicator');
    
    if (!indicator) {
        // Create indicator if doesn't exist
        indicator = document.createElement('div');
        indicator.id = 'connectionIndicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        document.body.appendChild(indicator);
    }

    if (connected) {
        indicator.innerHTML = '<span style="color: #22c55e;">● Live</span>';
        indicator.style.background = '#f0fdf4';
        indicator.style.color = '#22c55e';
    } else {
        indicator.innerHTML = '<span style="color: #ef4444;">● Offline</span>';
        indicator.style.background = '#fef2f2';
        indicator.style.color = '#ef4444';
    }
}

// ============================================
// CHAT REAL-TIME FUNCTIONS
// ============================================

function setupChatListeners() {
    if (!socket) return;

    // Receive chat messages
    socket.on('messageReceived', (message) => {
        displayChatMessage(message);
    });

    // Receive chat history
    socket.on('chatHistory', (messages) => {
        console.log(`📬 Loaded ${messages.length} chat messages`);
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            messages.forEach(msg => displayChatMessage(msg));
        }
    });

    // Users online count
    socket.on('usersOnline', (count) => {
        const onlineIndicator = document.getElementById('onlineCount');
        if (onlineIndicator) {
            onlineIndicator.textContent = `${count} online`;
        }
    });
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    if (isConnected && socket) {
        // Send to server (will be broadcast to all)
        socket.emit('newMessage', {
            message: message,
            userName: 'User'
        });
    } else {
        // Fallback: local chat
        addChatMessage(message, 'user');
    }

    input.value = '';
}

function displayChatMessage(msg) {
    addChatMessage(msg.message, msg.userId === null ? 'bot' : 'user', msg.userName);
}

function loadChatHistory() {
    if (socket) {
        socket.emit('getChatHistory');
    }
}

// ============================================
// FORUM REAL-TIME FUNCTIONS
// ============================================

function setupForumListeners() {
    if (!socket) return;

    // New discussion created
    socket.on('discussionCreated', (discussion) => {
        console.log('📝 New discussion:', discussion.title);
        prependDiscussionToDOM(discussion);
    });

    // Discussion updated
    socket.on('discussionUpdated', (discussion) => {
        console.log('💬 Discussion updated:', discussion.title);
        updateDiscussionInDOM(discussion);
    });
}

function loadDiscussions() {
    if (socket) {
        socket.emit('getDiscussions', (discussions) => {
            console.log(`📚 Loaded ${discussions.length} discussions`);
            renderDiscussions(discussions);
        });
    }
}

function createDiscussion() {
    const title = document.querySelector('[data-discussion-title]')?.value;
    const description = document.querySelector('[data-discussion-desc]')?.value;

    if (!title || !description) {
        alert('Please enter title and description');
        return;
    }

    if (isConnected && socket) {
        socket.emit('newDiscussion', {
            title: title,
            description: description,
            author: 'User'
        });
        
        // Clear inputs
        if (document.querySelector('[data-discussion-title]')) {
            document.querySelector('[data-discussion-title]').value = '';
        }
        if (document.querySelector('[data-discussion-desc]')) {
            document.querySelector('[data-discussion-desc]').value = '';
        }
    }
}

function replyToDiscussion(discussionId) {
    const replyText = document.querySelector(`[data-reply-${discussionId}]`)?.value;

    if (!replyText) {
        alert('Please enter a reply');
        return;
    }

    if (isConnected && socket) {
        socket.emit('replyToDiscussion', {
            discussionId: discussionId,
            text: replyText,
            author: 'User'
        });
        
        // Clear input
        const input = document.querySelector(`[data-reply-${discussionId}]`);
        if (input) input.value = '';
    }
}

function prependDiscussionToDOM(discussion) {
    const threadsContainer = document.querySelector('.discussion-threads');
    if (!threadsContainer) return;

    const threadHTML = `
        <div class="thread" data-discussion-id="${discussion._id}">
            <h3>${escapeHtml(discussion.title)}</h3>
            <p class="thread-meta">by ${escapeHtml(discussion.author)} • ${discussion.replies.length} replies • just now</p>
            <p>${escapeHtml(discussion.description)}</p>
            <button class="btn btn-secondary btn-small" onclick="toggleReply('${discussion._id}')">Reply</button>
            <div class="reply-section" id="reply-${discussion._id}" style="display:none; margin-top: 10px;">
                <textarea placeholder="Your reply..." data-reply-${discussion._id} style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"></textarea>
                <button class="btn btn-primary btn-small" style="margin-top: 8px;" onclick="replyToDiscussion('${discussion._id}')">Submit Reply</button>
            </div>
        </div>
    `;

    threadsContainer.insertAdjacentHTML('afterbegin', threadHTML);
}

function updateDiscussionInDOM(discussion) {
    const thread = document.querySelector(`[data-discussion-id="${discussion._id}"]`);
    if (thread) {
        thread.querySelector('.thread-meta').innerHTML = 
            `by ${escapeHtml(discussion.author)} • ${discussion.replies.length} replies`;
    }
}

function renderDiscussions(discussions) {
    const threadsContainer = document.querySelector('.discussion-threads');
    if (!threadsContainer) return;

    threadsContainer.innerHTML = discussions.map(d => `
        <div class="thread" data-discussion-id="${d._id}">
            <h3>${escapeHtml(d.title)}</h3>
            <p class="thread-meta">by ${escapeHtml(d.author)} • ${d.replies.length} replies</p>
            <p>${escapeHtml(d.description)}</p>
            <button class="btn btn-secondary btn-small" onclick="toggleReply('${d._id}')">Reply</button>
            <div class="reply-section" id="reply-${d._id}" style="display:none; margin-top: 10px;">
                <textarea placeholder="Your reply..." data-reply-${d._id} style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;"></textarea>
                <button class="btn btn-primary btn-small" style="margin-top: 8px;" onclick="replyToDiscussion('${d._id}')">Submit Reply</button>
            </div>
        </div>
    `).join('');
}

function toggleReply(discussionId) {
    const replySection = document.getElementById(`reply-${discussionId}`);
    if (replySection) {
        replySection.style.display = replySection.style.display === 'none' ? 'block' : 'none';
    }
}

// ============================================
// REPORT REAL-TIME FUNCTIONS
// ============================================

function setupReportListeners() {
    if (!socket) return;

    socket.on('reportSubmitted', (response) => {
        console.log('✅ Report submitted:', response.message);
        alert(response.message);
    });

    socket.on('newReportSubmitted', (data) => {
        console.log('🚨 New report received:', data.type);
    });
}

function submitReportRealTime() {
    const form = document.getElementById('reportForm');
    if (!form) return;

    const formData = {
        incidentType: form.querySelector('select').value,
        platform: form.querySelectorAll('select')[1]?.value || 'unknown',
        description: form.querySelector('textarea')?.value || '',
        reporterName: 'Anonymous'
    };

    if (!formData.incidentType || !formData.platform) {
        alert('Please select incident type and platform');
        return;
    }

    if (isConnected && socket) {
        socket.emit('submitReport', formData);
        form.reset();
    } else {
        alert('Backend connection unavailable. Report will be submitted locally.');
        // Fallback: submit via fetch
        submitReportToServer(formData);
    }
}

async function submitReportToServer(data) {
    try {
        const response = await fetch('http://localhost:5000/api/reports', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            alert('Thank you for your report. We take every report seriously.');
        }
    } catch (err) {
        alert('Report submitted locally (backend unavailable)');
        console.log('Fallback: Report stored locally');
    }
}

// ============================================
// TYPING INDICATORS
// ============================================

let typingTimeout;

function handleTyping() {
    if (socket && isConnected) {
        socket.emit('userTyping', 'User');
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit('stopTyping');
        }, 1000);
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing real-time features...');
    initializeSocket();
    
    // Modify report form to use real-time submission
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.querySelector('button[type="submit"]').addEventListener('click', (e) => {
            e.preventDefault();
            submitReportRealTime();
        });
    }

    // Add typing event to chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('input', handleTyping);
    }

    // Update connection status
    setInterval(() => {
        if (socket && !socket.connected) {
            updateConnectionStatus(false);
        }
    }, 5000);
});

// Export functions for global use
window.realtime = {
    sendMessage,
    createDiscussion,
    replyToDiscussion,
    submitReportRealTime,
    toggleReply,
    isConnected: () => isConnected
};

console.log('✨ Real-time module loaded');
