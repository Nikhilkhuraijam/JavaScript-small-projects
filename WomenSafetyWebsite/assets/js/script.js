// ============================================
// WOMEN SAFETY WEBSITE - JAVASCRIPT FUNCTIONALITY
// ============================================

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Smooth scrolling function
function scrollTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        navMenu.classList.remove('active');
    }
}

// Active navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ============================================
// QUIZ FUNCTIONALITY
// ============================================

const quizAnswers = {
    yes: -1,          // Unsafe
    often: -1,        // Unsafe
    never: -1,        // Unsafe
    sometimes: 0,     // Neutral
    rarely: 0,        // Neutral
    respond: -1,      // Unsafe
    carefully: 0,     // Neutral
    no: 1,            // Safe
    regularly: 1,     // Safe
    block: 1,         // Safe
    never: 1          // Safe
};

function submitQuiz() {
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value,
    };

    if (!Object.values(answers).every(a => a)) {
        alert('Please answer all questions');
        return;
    }

    let score = 0;
    const scoreMap = {
        'yes': -1, 'often': -1, 'never': -1, 'respond': -1,
        'sometimes': 0, 'rarely': 0, 'carefully': 0,
        'no': 1, 'regularly': 1, 'block': 1
    };

    Object.values(answers).forEach(answer => {
        score += scoreMap[answer] || 0;
    });

    showQuizResults(score);
}

function showQuizResults(score) {
    let result = '';
    let recommendations = [];

    if (score <= -3) {
        result = '⚠️ Your Safety Level: Needs Improvement';
        recommendations = [
            'Start using unique passwords for each account',
            'Review and update all privacy settings immediately',
            'Stop sharing real-time location information',
            'Be cautious about strangers online',
            'Learn about phishing and scam tactics'
        ];
    } else if (score < 2) {
        result = '✓ Your Safety Level: Good';
        recommendations = [
            'Continue with current security practices',
            'Consider enabling two-factor authentication',
            'Review privacy settings twice a year',
            'Stay updated on new online threats',
            'Help others improve their online safety'
        ];
    } else {
        result = '⭐ Your Safety Level: Excellent';
        recommendations = [
            'You are practicing excellent online safety habits!',
            'Consider mentoring others on digital safety',
            'Stay informed about emerging threats',
            'Keep your security practices up to date',
            'Share your knowledge with friends and family'
        ];
    }

    const resultsHTML = `
        <div class="quiz-results">
            <h3>${result}</h3>
            <div class="score-bar">
                <div class="score-fill" style="width: ${((score + 5) / 10) * 100}%"></div>
            </div>
            <h4>Personalized Recommendations:</h4>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
            <button class="btn btn-secondary" onclick="location.reload()">Take Quiz Again</button>
        </div>
    `;

    document.getElementById('quizContent').innerHTML = resultsHTML;
}

// ============================================
// CHAT FUNCTIONALITY
// ============================================

const chatResponses = {
    'password': [
        'Strong passwords should have 12+ characters with uppercase, lowercase, numbers, and symbols. Use different passwords for each account. Consider using a password manager!',
        'Never share your passwords with anyone, including support staff. Use unique passwords for important accounts like email and banking.'
    ],
    'privacy': [
        'Check your privacy settings regularly on all social media. You can usually make accounts private, limit who sees your posts, and control friend requests.',
        'Review what information you\'re sharing - avoid posting real-time location, phone numbers, or personal details that could identify you.'
    ],
    'harassment': [
        'If you\'re being harassed: Screenshot evidence, block the person, report to the platform, and tell a trusted adult. Your safety matters!',
        'Never respond to harassment or trolls. Report it to the platform immediately. Keep records of everything for potential reporting to authorities.'
    ],
    'scam': [
        'Watch for red flags: unexpected messages asking for personal info, urgent requests for money, links from strangers, or fake profiles.',
        'Never click links from unknown sources. Verify sender identity before responding. If it seems too good to be true, it probably is!'
    ],
    'report': [
        'You can report incidents confidentially through our report tool. All reports are treated seriously and help protect the community.',
        'Most platforms have built-in reporting features. Use them! Your reports help remove harmful content and protect others.'
    ],
    'default': [
        'Great question! I\'m here to help with online safety topics like passwords, privacy, harassment, scams, and more. What would you like to know?',
        'I can help with questions about staying safe online. Ask me about passwords, privacy settings, recognizing scams, dealing with harassment, or anything else!'
    ]
};

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    input.value = '';

    // Get bot response
    setTimeout(() => {
        const response = getBotResponse(message);
        addChatMessage(response, 'bot');
    }, 500);
}

function addChatMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    
    document.getElementById('chatMessages').appendChild(messageDiv);
    document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response;

    for (const [key, responses] of Object.entries(chatResponses)) {
        if (key !== 'default' && lowerMessage.includes(key)) {
            response = responses[Math.floor(Math.random() * responses.length)];
            return response;
        }
    }

    return chatResponses.default[Math.floor(Math.random() * chatResponses.default.length)];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Allow sending message with Enter key
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// ============================================
// REPORT FORM FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, this would send data to a server
            alert('Thank you for your report. We take every report seriously. Your report has been logged confidentially. Support team will review it shortly.');
            
            // Reset form
            reportForm.reset();
        });
    }
});

// ============================================
// THEME CUSTOMIZATION
// ============================================

function updateTheme(primaryColor, secondaryColor) {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    localStorage.setItem('theme', JSON.stringify({ primary: primaryColor, secondary: secondaryColor }));
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const { primary, secondary } = JSON.parse(savedTheme);
        updateTheme(primary, secondary);
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Back to top button (if needed)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Form validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Local storage helpers
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                observer.unobserve(image);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for quiz
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.classList.contains('btn')) {
        document.activeElement.click();
    }
});

// Focus management
document.querySelectorAll('a, button, input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '3px solid #FF6B5B';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ============================================
// ADVANCED ANALYTICS (Optional)
// ============================================

function trackEvent(eventName, eventData = {}) {
    // This can be connected to Google Analytics or similar
    console.log(`Event: ${eventName}`, eventData);
}

// Track page views
trackEvent('page_view', {
    page: window.location.pathname,
    timestamp: new Date()
});

// ============================================
// DEBUG MODE (Remove in production)
// ============================================

const isDebugMode = false;

function debugLog(...args) {
    if (isDebugMode) {
        console.log('[DEBUG]', ...args);
    }
}

// Initialize app
window.addEventListener('load', () => {
    debugLog('Website loaded successfully');
});

// Export functions for external use if needed
window.womensafetyWebsite = {
    scrollTo,
    submitQuiz,
    sendMessage,
    updateTheme,
    validateEmail,
    saveData,
    getData,
    trackEvent
};
