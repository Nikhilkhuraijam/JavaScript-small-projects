// ========================================
// EXERCISE DATABASE
// ========================================

const exercises = [
    {
        id: 1,
        name: "Push-ups",
        category: "strength",
        duration: "10-15 mins",
        difficulty: "Beginner",
        image: "https://via.placeholder.com/300x200?text=Push+ups",
        video: "https://www.youtube.com/embed/IODxDxX7oi4",
        instructions: "1. Start in plank position. 2. Lower your body until chest nearly touches floor. 3. Push back up to starting position. 4. Repeat for desired reps.",
        benefits: "Builds chest, shoulder, and tricep strength. Improves core stability."
    },
    {
        id: 2,
        name: "Squats",
        category: "strength",
        duration: "15-20 mins",
        difficulty: "Beginner",
        image: "https://via.placeholder.com/300x200?text=Squats",
        video: "https://www.youtube.com/embed/aclHkVakbdk",
        instructions: "1. Stand with feet shoulder-width apart. 2. Lower your hips back and down. 3. Keep chest up and weight in heels. 4. Return to standing position.",
        benefits: "Builds leg strength, boosts metabolism, improves lower body endurance."
    },
    {
        id: 3,
        name: "Burpees",
        category: "cardio",
        duration: "20-30 mins",
        difficulty: "Advanced",
        image: "https://via.placeholder.com/300x200?text=Burpees",
        video: "https://www.youtube.com/embed/JZQA2N2Y1rU",
        instructions: "1. Stand, then squat down. 2. Place hands on ground. 3. Jump feet back into plank. 4. Do a push-up. 5. Jump feet to squat. 6. Jump up with arms overhead.",
        benefits: "Full body workout, increases heart rate, burns maximum calories, builds endurance."
    },
    {
        id: 4,
        name: "Planks",
        category: "strength",
        duration: "5-10 mins",
        difficulty: "Beginner",
        image: "https://via.placeholder.com/300x200?text=Planks",
        video: "https://www.youtube.com/embed/pSHjTRCQxIw",
        instructions: "1. Get into forearm plank position. 2. Keep your body in straight line. 3. Engage core muscles. 4. Hold for 30-60 seconds.",
        benefits: "Strengthens core, improves posture, increases stability and balance."
    },
    {
        id: 5,
        name: "Running",
        category: "cardio",
        duration: "30-45 mins",
        difficulty: "Beginner",
        image: "https://via.placeholder.com/300x200?text=Running",
        video: "https://www.youtube.com/embed/e5Wm_yR_dX4",
        instructions: "1. Warm up with light jogging. 2. Run at steady pace. 3. Maintain proper arm and leg form. 4. Cool down with walking.",
        benefits: "Improves cardiovascular health, burns calories, increases endurance, reduces stress."
    },
    {
        id: 6,
        name: "Deadlifts",
        category: "strength",
        duration: "20-25 mins",
        difficulty: "Intermediate",
        image: "https://via.placeholder.com/300x200?text=Deadlifts",
        video: "https://www.youtube.com/embed/op9kVnSmeKk",
        instructions: "1. Stand with feet hip-width apart. 2. Grip barbell below shoulders. 3. Lift by extending hips and knees. 4. Lower with control.",
        benefits: "Full body strength, increases metabolism, builds posterior chain, improves grip strength."
    },
    {
        id: 7,
        name: "Swimming",
        category: "cardio",
        duration: "30-45 mins",
        difficulty: "Intermediate",
        image: "https://via.placeholder.com/300x200?text=Swimming",
        video: "https://www.youtube.com/embed/yF4E9uAhgmw",
        instructions: "1. Use proper swimming strokes (freestyle, breaststroke, backstroke). 2. Maintain steady pace. 3. Focus on breathing rhythm.",
        benefits: "Low impact, builds endurance, works all muscles, improves cardiovascular health."
    },
    {
        id: 8,
        name: "Stretching",
        category: "flexibility",
        duration: "10-15 mins",
        difficulty: "Beginner",
        image: "https://via.placeholder.com/300x200?text=Stretching",
        video: "https://www.youtube.com/embed/SxmKMsmI2EA",
        instructions: "1. Warm up first. 2. Hold each stretch for 20-30 seconds. 3. Never bounce. 4. Focus on major muscle groups.",
        benefits: "Increases flexibility, reduces muscle tension, improves range of motion, aids recovery."
    },
    {
        id: 9,
        name: "Cycling",
        category: "cardio",
        duration: "30-45 mins",
        difficulty: "Beginner",
        image: "https://via.placeholder.com/300x200?text=Cycling",
        video: "https://www.youtube.com/embed/wfXbR-WdbVQ",
        instructions: "1. Adjust bike seat to proper height. 2. Maintain steady pedaling pace. 3. Use proper form and posture.",
        benefits: "Low impact, builds leg strength, burns calories, improves cardiovascular endurance."
    },
    {
        id: 10,
        name: "Pull-ups",
        category: "strength",
        duration: "15-20 mins",
        difficulty: "Advanced",
        image: "https://via.placeholder.com/300x200?text=Pull+ups",
        video: "https://www.youtube.com/embed/eGo4IYlbE5g",
        instructions: "1. Grip bar with hands shoulder-width apart. 2. Pull body up until chin over bar. 3. Lower with control. 4. Repeat.",
        benefits: "Builds back and arm strength, increases grip strength, improves upper body power."
    },
    {
        id: 11,
        name: "Yoga",
        category: "flexibility",
        duration: "30-45 mins",
        difficulty: "Intermediate",
        image: "https://via.placeholder.com/300x200?text=Yoga",
        video: "https://www.youtube.com/embed/v7ScGV5128A",
        instructions: "1. Follow yoga flow sequences. 2. Focus on breath work. 3. Hold poses with proper alignment.",
        benefits: "Improves flexibility, builds core strength, reduces stress, increases mindfulness."
    },
    {
        id: 12,
        name: "HIIT Training",
        category: "cardio",
        duration: "20-30 mins",
        difficulty: "Advanced",
        image: "https://via.placeholder.com/300x200?text=HIIT",
        video: "https://www.youtube.com/embed/Xz-xRvWIeqE",
        instructions: "1. Alternate between high intensity (30s) and low intensity (30s). 2. Repeat for multiple rounds. 3. Recover between sets.",
        benefits: "Maximum calorie burn, improves cardiovascular health, builds strength, saves time."
    }
];

// ========================================
// BODY FAT CATEGORIES
// ========================================

const bodyFatCategories = {
    male: [
        { min: 0, max: 6, category: "Essential Fat", color: "#FF6B6B" },
        { min: 6, max: 13, category: "Athletes", color: "#FF8C42" },
        { min: 13, max: 17, category: "Fitness", color: "#FFC857" },
        { min: 17, max: 25, category: "Average", color: "#2EC4B6" },
        { min: 25, max: 100, category: "High", color: "#4ECDC4" }
    ],
    female: [
        { min: 0, max: 13, category: "Essential Fat", color: "#FF6B6B" },
        { min: 13, max: 20, category: "Athletes", color: "#FF8C42" },
        { min: 20, max: 24, category: "Fitness", color: "#FFC857" },
        { min: 24, max: 32, category: "Average", color: "#2EC4B6" },
        { min: 32, max: 100, category: "High", color: "#4ECDC4" }
    ]
};

// ========================================
// NAVIGATION & SECTION HANDLING
// ========================================

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const section = e.target.dataset.section;
        switchSection(section);
    });
});

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
        sec.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(section);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');
    }

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Load section-specific data
    if (section === 'exercises') {
        loadExercises('all');
    } else if (section === 'goals') {
        loadGoals();
    } else if (section === 'progress') {
        loadProgress();
    }
}

// ========================================
// BODY FAT CALCULATION
// ========================================

function calculateBodyFat() {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const hip = parseFloat(document.getElementById('hip').value);
    const neck = parseFloat(document.getElementById('neck').value);

    // Validate inputs
    if (!weight || !height || !age || !waist || (gender === 'female' && !hip) || (gender === 'male' && !neck)) {
        alert('Please fill in all required fields');
        return;
    }

    let bodyFat;

    // Body Fat Percentage Formula (US Navy Method)
    if (gender === 'male') {
        // Males: 495/(1.0324 - 0.19077*log10(waist-neck) + 0.15456*log10(height)) - 450
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else {
        // Females: 495/(1.29579 - 0.35004*log10(waist+hip-neck) + 0.22100*log10(height)) - 450
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    }

    // Calculate BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);

    // Get category
    const categoryData = bodyFatCategories[gender].find(cat => bodyFat >= cat.min && bodyFat <= cat.max);
    const category = categoryData ? categoryData.category : "Unknown";

    // Display results
    document.getElementById('bfPercentage').textContent = bodyFat.toFixed(1);
    document.getElementById('bmi').textContent = bmi.toFixed(1);
    document.getElementById('category').textContent = category;

    // Recommendation based on body fat
    let recommendation = '';
    if (bodyFat < 13 && gender === 'male') {
        recommendation = '✅ Excellent! You are in great shape. Maintain with strength training and balanced diet.';
    } else if (bodyFat < 20 && gender === 'female') {
        recommendation = '✅ Excellent! You are in great shape. Maintain with strength training and balanced diet.';
    } else if (bodyFat < 25 && gender === 'male') {
        recommendation = '💪 Good fitness level. Keep up with regular exercise and healthy eating.';
    } else if (bodyFat < 32 && gender === 'female') {
        recommendation = '💪 Good fitness level. Keep up with regular exercise and healthy eating.';
    } else {
        recommendation = '🎯 Time to focus on reducing body fat. Combine cardio with strength training.';
    }

    document.getElementById('recommendation').textContent = recommendation;
    document.getElementById('result').style.display = 'block';

    // Save calculation
    saveCalculation(weight, bodyFat, bmi);
}

// Show/hide fields based on gender
document.getElementById('gender').addEventListener('change', (e) => {
    const gender = e.target.value;
    document.getElementById('hip-group').style.display = gender === 'female' ? 'block' : 'none';
    document.getElementById('neck-group').style.display = gender === 'male' ? 'block' : 'none';
});

// Initial display
document.getElementById('neck-group').style.display = 'block';

// ========================================
// EXERCISE LOADING
// ========================================

function loadExercises(category) {
    const container = document.getElementById('exercisesContainer');
    container.innerHTML = '';

    const filtered = category === 'all' ? exercises : exercises.filter(ex => ex.category === category);

    filtered.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        card.innerHTML = `
            <img src="${exercise.image}" alt="${exercise.name}">
            <div class="exercise-card-content">
                <h3>${exercise.name}</h3>
                <div class="exercise-card-meta">
                    <span class="exercise-badge">${exercise.category}</span>
                    <span class="exercise-badge">${exercise.difficulty}</span>
                </div>
                <p style="margin-top: 10px; font-size: 0.9em;">⏱️ ${exercise.duration}</p>
            </div>
        `;
        card.onclick = () => openExerciseModal(exercise);
        container.appendChild(card);
    });
}

function filterExercises(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadExercises(category);
}

// ========================================
// EXERCISE MODAL
// ========================================

function openExerciseModal(exercise) {
    document.getElementById('modalExerciseName').textContent = exercise.name;
    document.getElementById('modalExerciseImg').src = exercise.image;
    document.getElementById('modalCategory').textContent = exercise.category;
    document.getElementById('modalDuration').textContent = exercise.duration;
    document.getElementById('modalDifficulty').textContent = exercise.difficulty;
    document.getElementById('modalInstructions').textContent = exercise.instructions;
    document.getElementById('modalBenefits').textContent = exercise.benefits;

    const videoEmbed = document.getElementById('modalVideo');
    if (exercise.video) {
        videoEmbed.style.display = 'block';
        videoEmbed.src = exercise.video;
    } else {
        videoEmbed.style.display = 'none';
    }

    document.getElementById('exerciseModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('exerciseModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('exerciseModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// ========================================
// GOALS MANAGEMENT
// ========================================

function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || {};
    const goalsContent = document.getElementById('goalsContent');
    goalsContent.innerHTML = '';

    if (Object.keys(goals).length === 0) {
        goalsContent.innerHTML = '<p style="color: #999;">No goals set yet. Set your target below!</p>';
    } else {
        goalsContent.innerHTML += `
            <div class="goal-card">
                <h4>Your Target Body Fat %</h4>
                <p>Target: <strong>${goals.targetBF}%</strong></p>
                <p>Current: <strong>${goals.currentBF || 'Not calculated'}%</strong></p>
                <p>Goal Progress: ${goals.targetBF && goals.currentBF ? ((goals.currentBF - goals.targetBF) / goals.currentBF * 100).toFixed(1) : '0'}% to goal</p>
            </div>
            <div class="goal-card">
                <h4>Your Target Weight</h4>
                <p>Target: <strong>${goals.targetWeight} kg</strong></p>
                <p>Current: <strong>${goals.currentWeight || 'Not calculated'} kg</strong></p>
                <p>Goal Progress: ${goals.targetWeight && goals.currentWeight ? (goals.currentWeight - goals.targetWeight).toFixed(1) : '0'} kg to goal</p>
            </div>
        `;
    }

    // Pre-fill if data exists
    if (goals.targetBF) document.getElementById('targetBF').value = goals.targetBF;
    if (goals.targetWeight) document.getElementById('targetWeight').value = goals.targetWeight;
}

function saveGoals() {
    const targetBF = document.getElementById('targetBF').value;
    const targetWeight = document.getElementById('targetWeight').value;

    if (!targetBF && !targetWeight) {
        alert('Please enter at least one target goal');
        return;
    }

    const existingGoals = JSON.parse(localStorage.getItem('goals')) || {};
    const goals = {
        ...existingGoals,
        targetBF: targetBF || existingGoals.targetBF,
        targetWeight: targetWeight || existingGoals.targetWeight,
        savedDate: new Date().toLocaleDateString()
    };

    localStorage.setItem('goals', JSON.stringify(goals));
    alert('✅ Goals saved successfully!');
    loadGoals();
}

// ========================================
// PROGRESS TRACKING
// ========================================

function loadProgress() {
    const progressData = JSON.parse(localStorage.getItem('progress')) || [];
    const progressList = document.getElementById('progressList');
    progressList.innerHTML = '<h3>Progress Log</h3>';

    if (progressData.length === 0) {
        progressList.innerHTML += '<p style="color: #999;">No progress logged yet. Start tracking your journey!</p>';
    } else {
        progressData.forEach(log => {
            const item = document.createElement('div');
            item.className = 'progress-item';
            item.innerHTML = `
                <p><strong>Week ${log.week}</strong> - Date: ${log.date}</p>
                <p>Weight: <strong>${log.weight} kg</strong></p>
                <p>Body Fat: <strong>${log.bodyFat}%</strong></p>
            `;
            progressList.appendChild(item);
        });
    }

    drawProgressChart();
}

function addProgress() {
    const week = parseInt(document.getElementById('weekNum').value);
    const weight = parseFloat(document.getElementById('progressWeight').value);
    const bodyFat = parseFloat(document.getElementById('progressBF').value);

    if (!week || !weight || !bodyFat) {
        alert('Please fill in all progress fields');
        return;
    }

    const existingProgress = JSON.parse(localStorage.getItem('progress')) || [];
    const newLog = {
        week,
        weight,
        bodyFat,
        date: new Date().toLocaleDateString()
    };

    existingProgress.push(newLog);
    localStorage.setItem('progress', JSON.stringify(existingProgress));

    // Clear inputs
    document.getElementById('weekNum').value = '';
    document.getElementById('progressWeight').value = '';
    document.getElementById('progressBF').value = '';

    alert('✅ Progress logged successfully!');
    loadProgress();
}

function drawProgressChart() {
    const canvas = document.getElementById('progressChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const progressData = JSON.parse(localStorage.getItem('progress')) || [];

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (progressData.length < 2) return;

    // Draw chart
    const padding = 40;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Get data range
    const weeks = progressData.map(d => d.week);
    const weights = progressData.map(d => d.weight);
    const maxWeek = Math.max(...weeks);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);

    // Draw weight line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();

    progressData.forEach((log, idx) => {
        const x = padding + (log.week / maxWeek) * width;
        const y = canvas.height - padding - ((log.weight - minWeight) / (maxWeight - minWeight)) * height;

        if (idx === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        // Draw point
        ctx.fillStyle = '#667eea';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.stroke();
}

// ========================================
// LOCAL STORAGE UTILITIES
// ========================================

function saveCalculation(weight, bodyFat, bmi) {
    const calculation = {
        weight,
        bodyFat: bodyFat.toFixed(1),
        bmi: bmi.toFixed(1),
        date: new Date().toLocaleDateString()
    };
    localStorage.setItem('lastCalculation', JSON.stringify(calculation));
}

// ========================================
// INITIALIZE APP
// ========================================

window.addEventListener('DOMContentLoaded', () => {
    loadGoals();
    loadProgress();
});

console.log('💪 Fitness Body Transformation App loaded successfully!');
