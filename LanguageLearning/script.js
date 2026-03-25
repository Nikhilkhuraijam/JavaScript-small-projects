// Nilo Language Learning App - Main Script

// App State
const appState = {
    currentLanguage: null,
    userName: 'Learner',
    level: 'A1',
    streak: 0,
    totalXP: 0,
    lessonsTodayCount: 0,
    wordsLearned: 0,
    isPremium: false,
    recordingActive: false
};

// Vocabulary Database
const vocabularyDatabase = {
    spanish: {
        food: [
            { word: 'manzana', translation: 'apple', pronunciation: 'ah-mahn-sah-nah' },
            { word: 'pan', translation: 'bread', pronunciation: 'pahn' },
            { word: 'agua', translation: 'water', pronunciation: 'ah-gwah' },
            { word: 'café', translation: 'coffee', pronunciation: 'kah-feh' },
            { word: 'leche', translation: 'milk', pronunciation: 'leh-cheh' },
        ],
        everyday: [
            { word: 'hola', translation: 'hello', pronunciation: 'oh-lah' },
            { word: 'adiós', translation: 'goodbye', pronunciation: 'ah-dee-yos' },
            { word: 'por favor', translation: 'please', pronunciation: 'por fah-vor' },
            { word: 'gracias', translation: 'thank you', pronunciation: 'grah-see-ahs' },
        ]
    },
    french: {
        food: [
            { word: 'pomme', translation: 'apple', pronunciation: 'pohm' },
            { word: 'pain', translation: 'bread', pronunciation: 'pahn' },
            { word: 'eau', translation: 'water', pronunciation: 'oh' },
            { word: 'café', translation: 'coffee', pronunciation: 'kah-feh' },
            { word: 'lait', translation: 'milk', pronunciation: 'leh' },
        ],
        everyday: [
            { word: 'bonjour', translation: 'hello', pronunciation: 'bohn-zhoor' },
            { word: 'au revoir', translation: 'goodbye', pronunciation: 'oh ruh-vwahr' },
            { word: 's\'il vous plaît', translation: 'please', pronunciation: 'see voo pleh' },
            { word: 'merci', translation: 'thank you', pronunciation: 'mehr-see' },
        ]
    },
    german: {
        food: [
            { word: 'Apfel', translation: 'apple', pronunciation: 'AHp-fell' },
            { word: 'Brot', translation: 'bread', pronunciation: 'broht' },
            { word: 'Wasser', translation: 'water', pronunciation: 'VAH-ser' },
            { word: 'Kaffee', translation: 'coffee', pronunciation: 'KAH-feh' },
            { word: 'Milch', translation: 'milk', pronunciation: 'MILH' },
        ],
        everyday: [
            { word: 'Hallo', translation: 'hello', pronunciation: 'HAH-lo' },
            { word: 'Auf Wiedersehen', translation: 'goodbye', pronunciation: 'owf VEE-der-zay-en' },
            { word: 'Bitte', translation: 'please', pronunciation: 'BIT-tuh' },
            { word: 'Danke', translation: 'thank you', pronunciation: 'DAHN-kuh' },
        ]
    }
};

// Vocabulary Flashcard System
const vocabularyFlashcards = (language, category = 'all') => {
    const container = document.getElementById('vocabCards');
    container.innerHTML = '';

    let words = [];
    if (category === 'all') {
        Object.values(vocabularyDatabase[language]).forEach(cat => {
            words.push(...cat);
        });
    } else if (vocabularyDatabase[language][category]) {
        words = vocabularyDatabase[language][category];
    }

    words.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        card.innerHTML = `
            <div class="vocab-card-inner">
                <div class="vocab-word">${item.word}</div>
                <div class="vocab-translation">${item.translation}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            speakWord(item.word, language);
            card.style.transform = 'rotateY(180deg)';
        });
        container.appendChild(card);
    });
};

// Text-to-Speech Function
const speakWord = (word, language) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = getLanguageCode(language);
        utterance.rate = 0.8;
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }
};

const getLanguageCode = (lang) => {
    const codes = {
        spanish: 'es-ES',
        french: 'fr-FR',
        german: 'de-DE',
        chinese: 'zh-CN',
        japanese: 'ja-JP',
        polish: 'pl-PL',
        russian: 'ru-RU',
        dutch: 'nl-NL'
    };
    return codes[lang] || 'en-US';
};

// Initialize App
const initApp = () => {
    const language = document.getElementById('languageSelect').value;
    
    if (!language) {
        alert('Please select a language');
        return;
    }

    appState.currentLanguage = language;
    document.getElementById('heroSection').style.display = 'none';
    document.getElementById('appSection').classList.remove('hidden');
    document.getElementById('pricingSection').style.display = 'none';

    updateStats();
    vocabularyFlashcards(language, 'all');
};

// Update Statistics
const updateStats = () => {
    document.getElementById('streakCount').textContent = appState.streak;
    document.getElementById('xpCount').textContent = appState.totalXP;
    document.getElementById('currentStreak').textContent = appState.streak;
    document.getElementById('totalXP').textContent = appState.totalXP;
    document.getElementById('wordsLearned').textContent = appState.wordsLearned;
    document.getElementById('levelBadge').textContent = appState.level;
    
    const progress = (appState.lessonsTodayCount / 5) * 100;
    document.getElementById('dailyProgress').style.width = progress + '%';
    document.getElementById('lessonProgress').textContent = appState.lessonsTodayCount;
    document.getElementById('todayLessons').textContent = appState.lessonsTodayCount;
};

// Start Lesson
const startLesson = (type) => {
    const modal = document.getElementById('lessonModal');
    const player = document.getElementById('lessonPlayer');
    
    const lessons = {
        vocabulary: {
            title: 'Vocabulary Building',
            content: 'Learn 10 new vocabulary words from the ' + appState.currentLanguage + ' language.',
            reward: 10
        },
        grammar: {
            title: 'Grammar Mastery',
            content: 'Master essential grammar rules and verb conjugation.',
            reward: 15
        },
        listening: {
            title: 'Listening Practice',
            content: 'Listen to native speakers and improve your comprehension.',
            reward: 15
        },
        speaking: {
            title: 'Speaking Challenge',
            content: 'Practice pronunciation with AI feedback.',
            reward: 20
        }
    };

    const lesson = lessons[type] || lessons.vocabulary;
    player.innerHTML = `
        <h2>${lesson.title}</h2>
        <p>${lesson.content}</p>
        <button class="start-lesson-btn" onclick="completeLesson(${lesson.reward})">Complete Lesson</button>
    `;
    
    modal.classList.remove('hidden');
};

// Complete Lesson
const completeLesson = (xpReward) => {
    appState.totalXP += xpReward;
    appState.lessonsTodayCount = Math.min(appState.lessonsTodayCount + 1, 5);
    appState.streak = Math.max(appState.streak, 1);
    appState.wordsLearned += 10;
    
    updateStats();
    closeLessonModal();
    
    showNotification(`🎉 Great job! You earned ${xpReward} XP!`, 'success');
};

// Play Lesson
const playLesson = (lessonName) => {
    startLesson('vocabulary');
};

// Quiz System
const startQuiz = () => {
    const container = document.getElementById('quizContainer');
    
    const quizQuestions = [
        {
            question: 'How do you say "hello" in ' + appState.currentLanguage + '?',
            options: ['Hola', 'Bonjour', 'Guten Tag', 'Konnichiwa'],
            correct: 0
        },
        {
            question: 'What does "gracias" mean?',
            options: ['Please', 'Thank you', 'Goodbye', 'Welcome'],
            correct: 1
        },
        {
            question: 'Which is a greeting?',
            options: ['Café', 'Agua', 'Hola', 'Pan'],
            correct: 2
        }
    ];

    container.innerHTML = '';
    let currentQuestion = 0;
    let score = 0;

    const showQuestion = () => {
        if (currentQuestion >= quizQuestions.length) {
            const xpReward = score * 10;
            appState.totalXP += xpReward;
            appState.streak += 1;
            updateStats();
            
            container.innerHTML = `
                <div class="quiz-start">
                    <h3>Quiz Complete! 🎉</h3>
                    <p>You scored: ${score}/${quizQuestions.length}</p>
                    <p>You earned ${xpReward} XP!</p>
                    <button class="start-quiz-btn" onclick="location.reload()">Take Another Quiz</button>
                </div>
            `;
            return;
        }

        const q = quizQuestions[currentQuestion];
        container.innerHTML = `
            <div class="quiz-question">
                <h4>Question ${currentQuestion + 1}/${quizQuestions.length}</h4>
                <p>${q.question}</p>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `
                        <button class="quiz-option" onclick="selectAnswer(${idx}, ${q.correct}, ${currentQuestion})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    };

    window.selectAnswer = (selected, correct, questionIndex) => {
        if (selected === correct) {
            score++;
            showNotification('✓ Correct!', 'success');
        } else {
            showNotification('✗ Try again', 'error');
        }
        currentQuestion++;
        setTimeout(showQuestion, 800);
    };

    showQuestion();
};

// Speaking Practice
const toggleMic = () => {
    const btn = document.getElementById('micBtn');
    const feedback = document.getElementById('recordingFeedback');
    
    if (!appState.recordingActive) {
        startRecording();
    } else {
        stopRecording();
    }
};

const startRecording = () => {
    const btn = document.getElementById('micBtn');
    appState.recordingActive = true;
    btn.classList.add('recording');
    btn.innerHTML = '<span class="mic-icon">⏹️</span><span>Stop Recording</span>';
};

const stopRecording = () => {
    const btn = document.getElementById('micBtn');
    const feedback = document.getElementById('recordingFeedback');
    appState.recordingActive = false;
    btn.classList.remove('recording');
    btn.innerHTML = '<span class="mic-icon">🎙️</span><span>Start Recording</span>';
    
    // Simulate speech recognition
    feedback.innerHTML = `
        <h4>✅ Great Pronunciation!</h4>
        <p>Your accent is improving! Keep practicing.</p>
        <p>+20 XP earned</p>
    `;
    feedback.classList.add('show');
    appState.totalXP += 20;
    updateStats();
};

// Study Mode System
const startStudyMode = (mode) => {
    const studyContent = document.getElementById('studyContent');
    const container = document.getElementById('studyModeContainer');
    
    studyContent.classList.remove('hidden');
    
    if (mode === 'flashcards') {
        loadFlashcards(container);
    } else if (mode === 'spaced-repetition') {
        loadSpacedRepetition(container);
    } else if (mode === 'sentence-builder') {
        loadSentenceBuilder(container);
    } else if (mode === 'listening-comprehension') {
        loadListeningComprehension(container);
    }
};

const closeStudyMode = () => {
    document.getElementById('studyContent').classList.add('hidden');
};

// Flashcards Study Mode
const loadFlashcards = (container) => {
    const vocab = vocabularyDatabase[appState.currentLanguage]?.everyday || [];
    let currentCardIndex = 0;
    let cardStats = { easy: 0, hard: 0, skip: 0 };

    const renderCard = () => {
        if (currentCardIndex >= vocab.length) {
            const totalXP = (cardStats.easy * 10) + (cardStats.hard * 5);
            appState.totalXP += totalXP;
            appState.streak += 1;
            updateStats();
            
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h3>✅ Flashcard Session Complete!</h3>
                    <p>Easy: ${cardStats.easy} | Hard: ${cardStats.hard} | Skipped: ${cardStats.skip}</p>
                    <p>You earned ${totalXP} XP!</p>
                    <button class="start-quiz-btn" onclick="closeStudyMode()">Back to Study Menu</button>
                </div>
            `;
            return;
        }

        const card = vocab[currentCardIndex];
        container.innerHTML = `
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <span>${card.word}</span>
                    </div>
                    <div class="flashcard-back">
                        <span>${card.translation}</span>
                    </div>
                </div>
            </div>
            <div class="flashcard-controls">
                <button class="control-btn skip" onclick="updateFlashcardStats('skip', ${currentCardIndex})">⏭️ Skip</button>
                <button class="control-btn hard" onclick="updateFlashcardStats('hard', ${currentCardIndex})">😕 Hard</button>
                <button class="control-btn easy" onclick="updateFlashcardStats('easy', ${currentCardIndex})">✓ Easy</button>
            </div>
            <p style="text-align: center; margin-top: 2rem; color: var(--text-lighter);">Card ${currentCardIndex + 1} of ${vocab.length}</p>
        `;
    };

    window.updateFlashcardStats = (rating, idx) => {
        cardStats[rating]++;
        currentCardIndex++;
        renderCard();
    };

    renderCard();
};

// Spaced Repetition Study Mode
const loadSpacedRepetition = (container) => {
    const vocab = vocabularyDatabase[appState.currentLanguage]?.everyday || [];
    let reviewedCount = 0;

    const renderSRCard = () => {
        if (reviewedCount >= vocab.length) {
            appState.totalXP += vocab.length * 8;
            appState.streak += 1;
            updateStats();
            
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h3>✅ Spaced Repetition Session Complete!</h3>
                    <p>You reviewed ${vocab.length} words</p>
                    <p>You earned ${vocab.length * 8} XP!</p>
                    <button class="start-quiz-btn" onclick="closeStudyMode()">Back to Study Menu</button>
                </div>
            `;
            return;
        }

        const word = vocab[reviewedCount];
        const intervals = ['1 day', '3 days', '1 week', '2 weeks'];
        
        container.innerHTML = `
            <div class="spaced-repetition">
                <div class="sr-card">
                    <div class="sr-card-header">
                        <span>${word.word}</span>
                        <span class="sr-interval">Due Next</span>
                    </div>
                    <h4 style="text-align: center; font-size: 1.3rem; margin: 1rem 0;">${word.translation}</h4>
                    <p style="text-align: center; opacity: 0.8;">${word.pronunciation}</p>
                    <div class="sr-buttons">
                        <button class="sr-btn" onclick="advanceSR('again', ${reviewedCount})">Again</button>
                        <button class="sr-btn" onclick="advanceSR('hard', ${reviewedCount})">Hard</button>
                        <button class="sr-btn" onclick="advanceSR('ok', ${reviewedCount})">OK</button>
                        <button class="sr-btn" onclick="advanceSR('easy', ${reviewedCount})">Easy</button>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 2rem; color: var(--text-lighter);">Word ${reviewedCount + 1} of ${vocab.length}</p>
            </div>
        `;
    };

    window.advanceSR = (quality, idx) => {
        reviewedCount++;
        renderSRCard();
    };

    renderSRCard();
};

// Sentence Builder Study Mode
const loadSentenceBuilder = (container) => {
    const sentences = [
        { words: ['I', 'love', 'learning', 'languages'], answer: 'I love learning languages' },
        { words: ['She', 'speaks', 'three', 'languages'], answer: 'She speaks three languages' },
        { words: ['We', 'study', 'every', 'day'], answer: 'We study every day' }
    ];
    
    let sentenceIndex = 0;
    let correctBuilt = 0;

    const renderSentenceBuilder = () => {
        if (sentenceIndex >= sentences.length) {
            const totalXP = correctBuilt * 15;
            appState.totalXP += totalXP;
            appState.streak += 1;
            updateStats();
            
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h3>✅ Sentence Builder Complete!</h3>
                    <p>Correct sentences: ${correctBuilt}/${sentences.length}</p>
                    <p>You earned ${totalXP} XP!</p>
                    <button class="start-quiz-btn" onclick="closeStudyMode()">Back to Study Menu</button>
                </div>
            `;
            return;
        }

        const sentence = sentences[sentenceIndex];
        const shuffled = [...sentence.words].sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <div class="sentence-builder">
                <h3>Build the Sentence</h3>
                <div class="sentence-target" id="sentenceTarget">
                    <span style="color: var(--text-lighter);">Drop words here...</span>
                </div>
                <div class="word-bank">
                    <span class="word-bank-label">Available Words:</span>
                    ${shuffled.map((word, idx) => `
                        <span class="word-chip" draggable="true" ondragstart="dragStart(event, '${word}')">${word}</span>
                    `).join('')}
                </div>
                <button style="margin-top: 2rem; padding: 0.7rem 2rem; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer;" onclick="checkSentence('${sentence.answer}', ${sentenceIndex})">Check Answer</button>
                <p style="text-align: center; margin-top: 1rem; color: var(--text-lighter);">Sentence ${sentenceIndex + 1} of ${sentences.length}</p>
            </div>
        `;

        const target = document.getElementById('sentenceTarget');
        target.ondragover = (e) => { e.preventDefault(); target.style.backgroundColor = 'rgba(78, 205, 196, 0.1)'; };
        target.ondragleave = () => { target.style.backgroundColor = ''; };
        target.ondrop = (e) => { 
            e.preventDefault(); 
            target.style.backgroundColor = ''; 
            const word = e.dataTransfer.getData('text');
            
            // Clear placeholder if first word
            if (target.children.length === 1 && target.children[0].textContent.includes('Drop words')) {
                target.innerHTML = '';
            }
            
            // Add word chip to target
            const chip = document.createElement('span');
            chip.className = 'word-chip placed';
            chip.textContent = word;
            target.appendChild(chip);
        };
    };

    window.dragStart = (e, word) => {
        e.dataTransfer.setData('text', word);
    };

    window.checkSentence = (correctAnswer, idx) => {
        const target = document.getElementById('sentenceTarget');
        const builtText = Array.from(target.querySelectorAll('.word-chip.placed'))
            .map(chip => chip.textContent)
            .join(' ');

        if (builtText === correctAnswer) {
            showNotification('✓ Correct sentence!', 'success');
            correctBuilt++;
        } else {
            showNotification(`✗ Expected: "${correctAnswer}"`, 'error');
        }
        
        sentenceIndex++;
        setTimeout(renderSentenceBuilder, 1000);
    };

    renderSentenceBuilder();
};

// Listening Comprehension Study Mode
const loadListeningComprehension = (container) => {
    const listeningExercises = [
        { text: 'Hello, my name is Maria', answer: 0, options: ['Hello, my name is Maria', 'Hello, my name is Mark', 'Goodbye, my name is Maria'] },
        { text: 'I like to drink coffee', answer: 1, options: ['I like to drink tea', 'I like to drink coffee', 'I like to drink juice'] },
        { text: 'Where is the bathroom?', answer: 2, options: ['Where is the bedroom?', 'Where is the kitchen?', 'Where is the bathroom?'] }
    ];

    let compIndex = 0;
    let correctAnswers = 0;

    const renderListeningExercise = () => {
        if (compIndex >= listeningExercises.length) {
            const totalXP = correctAnswers * 12;
            appState.totalXP += totalXP;
            appState.streak += 1;
            updateStats();
            
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h3>✅ Listening Comprehension Complete!</h3>
                    <p>Correct answers: ${correctAnswers}/${listeningExercises.length}</p>
                    <p>You earned ${totalXP} XP!</p>
                    <button class="start-quiz-btn" onclick="closeStudyMode()">Back to Study Menu</button>
                </div>
            `;
            return;
        }

        const exercise = listeningExercises[compIndex];
        
        container.innerHTML = `
            <div class="listening-module">
                <h3>Listen and Choose</h3>
                <div class="audio-player">
                    <button class="play-btn" onclick="playListeningAudio('${exercise.text}')">
                        ▶️
                    </button>
                    <p style="margin-top: 1rem; color: var(--text-lighter);">Click play to listen</p>
                </div>
                <div class="listening-options">
                    ${exercise.options.map((opt, idx) => `
                        <button class="listening-option" onclick="checkListeningAnswer(${idx}, ${exercise.answer}, ${compIndex})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <p style="text-align: center; margin-top: 2rem; color: var(--text-lighter);">Question ${compIndex + 1} of ${listeningExercises.length}</p>
            </div>
        `;
    };

    window.playListeningAudio = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = appState.currentLanguage === 'spanish' ? 'es-ES' : appState.currentLanguage === 'french' ? 'fr-FR' : 'de-DE';
        speechSynthesis.speak(utterance);
    };

    window.checkListeningAnswer = (selected, correct, qIdx) => {
        if (selected === correct) {
            showNotification('✓ Correct!', 'success');
            correctAnswers++;
        } else {
            showNotification('✗ Try again', 'error');
        }
        
        compIndex++;
        setTimeout(renderListeningExercise, 1000);
    };

    renderListeningExercise();
};

// Navigation
const setupNavigation = () => {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            
            e.target.classList.add('active');
            const sectionId = e.target.getAttribute('data-section');
            document.getElementById(sectionId)?.classList.add('active');
            
            // Load vocabulary when switching to vocab section
            if (sectionId === 'vocabulary') {
                vocabularyFlashcards(appState.currentLanguage, 'all');
            }
        });
    });

    // Vocabulary category filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.getAttribute('data-category');
            vocabularyFlashcards(appState.currentLanguage, category === 'all' ? 'all' : category);
        });
    });
};

// Theme Toggle
const setupThemeToggle = () => {
    const toggle = document.getElementById('themeToggle');
    const isDark = localStorage.getItem('theme') === 'dark';
    
    if (isDark) {
        document.body.classList.add('dark-theme');
        toggle.textContent = '☀️';
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggle.textContent = isDark ? '☀️' : '🌙';
    });
};

// Modal Management
const closeLessonModal = () => {
    document.getElementById('lessonModal').classList.add('hidden');
};

// Premium Features
const upgradePremium = () => {
    appState.isPremium = true;
    alert('✅ Upgraded to Premium! Enjoy unlimited lessons.');
    document.querySelector('.pricing-card.free .plan-btn').disabled = false;
    document.querySelector('.pricing-card.free .plan-btn').textContent = 'Your Plan';
};

const buyLifetime = () => {
    appState.isPremium = true;
    alert('🎉 Congratulations! You now have Lifetime access!');
};

// Notifications
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#95E1D3' : '#F38181'};
        color: white;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
};

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupNavigation();

    // Start button
    document.getElementById('startBtn')?.addEventListener('click', initApp);

    // Load daily stats
    updateStats();

    // Generate weekly chart
    const weeklyChart = document.getElementById('weeklyChart');
    if (weeklyChart) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        weeklyChart.innerHTML = days.map(day => `
            <div class="chart-bar" style="height: ${Math.random() * 100}%;"></div>
        `).join('');
    }
});

// Weekly chart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
