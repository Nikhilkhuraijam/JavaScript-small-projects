/**
 * JavaScript Callback Functions - Comprehensive Examples
 * A callback is a function passed as an argument to another function
 * and is executed after some operation has been performed
 */

// ============================================
// 1. BASIC CALLBACK - Simple Example
// ============================================
console.log("=== 1. BASIC CALLBACK ===");

function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

// Pass the function as a callback
greet("Alice", sayGoodbye);

// Or use an anonymous function as callback
greet("Bob", function() {
    console.log("Nice to meet you!");
});


// ============================================
// 2. CALLBACK WITH PARAMETERS
// ============================================
console.log("\n=== 2. CALLBACK WITH PARAMETERS ===");

function calculateSum(a, b, callback) {
    const sum = a + b;
    console.log(`Sum of ${a} and ${b} is: ${sum}`);
    callback(sum);
}

function displayResult(result) {
    console.log(`The result received in callback: ${result}`);
}

calculateSum(5, 10, displayResult);

// With arrow function
calculateSum(15, 25, (result) => {
    console.log(`Double the result: ${result * 2}`);
});


// ============================================
// 3. ARRAY CALLBACKS - forEach, map, filter
// ============================================
console.log("\n=== 3. ARRAY CALLBACKS ===");

const numbers = [1, 2, 3, 4, 5];

// forEach - execute callback for each element
console.log("forEach example:");
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// map - transform array with callback
console.log("\nmap example (square each number):");
const squared = numbers.map((num) => num * num);
console.log(squared);

// filter - select elements with callback
console.log("\nfilter example (get even numbers):");
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers);

// reduce - accumulate with callback
console.log("\nreduce example (sum all numbers):");
const total = numbers.reduce((sum, num) => sum + num, 0);
console.log(total);


// ============================================
// 4. NESTED CALLBACKS (Callback Hell Example)
// ============================================
console.log("\n=== 4. NESTED CALLBACKS ===");

function fetchUserData(userId, callback) {
    console.log(`Fetching user ${userId}...`);
    setTimeout(() => {
        const user = { id: userId, name: "John Doe", email: "john@example.com" };
        console.log("User data fetched:", user);
        callback(user);
    }, 1000);
}

function fetchUserPosts(userId, callback) {
    console.log(`Fetching posts for user ${userId}...`);
    setTimeout(() => {
        const posts = [
            { id: 1, title: "First Post" },
            { id: 2, title: "Second Post" }
        ];
        console.log("Posts fetched:", posts);
        callback(posts);
    }, 1000);
}

// Nested callbacks - "Callback Hell"
fetchUserData(1, (user) => {
    console.log("Got user:", user.name);
    
    fetchUserPosts(user.id, (posts) => {
        console.log("Got posts:", posts.length, "posts");
        console.log("Posts for", user.name, ":", posts.map(p => p.title));
    });
});


// ============================================
// 5. ERROR HANDLING WITH CALLBACKS
// ============================================
console.log("\n=== 5. ERROR HANDLING WITH CALLBACKS ===");

function divideNumbers(a, b, successCallback, errorCallback) {
    if (b === 0) {
        errorCallback("Cannot divide by zero!");
    } else {
        const result = a / b;
        successCallback(result);
    }
}

divideNumbers(10, 2, 
    (result) => {
        console.log(`✓ Success: 10 / 2 = ${result}`);
    },
    (error) => {
        console.log(`✗ Error: ${error}`);
    }
);

divideNumbers(10, 0,
    (result) => {
        console.log(`✓ Success: ${result}`);
    },
    (error) => {
        console.log(`✗ Error: ${error}`);
    }
);


// ============================================
// 6. PRACTICAL EXAMPLE - Data Processing
// ============================================
console.log("\n=== 6. PRACTICAL EXAMPLE - DATA PROCESSING ===");

const students = [
    { name: "Alice", marks: 85 },
    { name: "Bob", marks: 92 },
    { name: "Charlie", marks: 78 },
    { name: "Diana", marks: 88 }
];

function processStudentData(data, processCallback, displayCallback) {
    console.log("Processing student data...");
    
    // Process with first callback
    const processed = processCallback(data);
    
    // Display with second callback
    displayCallback(processed);
}

// First callback - filter and sort students with marks > 80
const filterAndSort = (students) => {
    return students
        .filter(s => s.marks > 80)
        .sort((a, b) => b.marks - a.marks);
};

// Second callback - display in formatted way
const displayStudents = (students) => {
    console.log("🏆 Top Performers:");
    students.forEach((student, index) => {
        console.log(`${index + 1}. ${student.name} - ${student.marks}%`);
    });
};

processStudentData(students, filterAndSort, displayStudents);


// ============================================
// 7. CALLBACK WITH TIMER - setTimeout/setInterval
// ============================================
console.log("\n=== 7. CALLBACK WITH TIMER ===");

function delayedAction(delay, callback) {
    console.log(`Action will execute after ${delay}ms...`);
    setTimeout(callback, delay);
}

delayedAction(2000, () => {
    console.log("✓ Delayed action executed after 2 seconds!");
});

// Repeated callback with setInterval
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Repeated callback: ${count}`);
    
    if (count === 3) {
        clearInterval(intervalId);
        console.log("Interval stopped!");
    }
}, 1500);


// ============================================
// 8. EVENT LISTENERS WITH CALLBACKS
// ============================================
console.log("\n=== 8. EVENT LISTENERS (if running in browser) ===");

// This will only work in browser environment
if (typeof document !== 'undefined') {
    // Example (only runs if HTML element exists):
    // document.getElementById('button').addEventListener('click', (event) => {
    //     console.log('Button clicked!');
    //     alert('You clicked me!');
    // });
    
    console.log("Event listeners would work in a browser environment");
}


// ============================================
// 9. CUSTOM CALLBACK PATTERN - Logger
// ============================================
console.log("\n=== 9. CUSTOM CALLBACK PATTERN ===");

function executeWithLogging(operation, onComplete) {
    console.log("📝 Starting operation...");
    
    const result = operation();
    
    console.log("📝 Operation completed!");
    
    if (onComplete) {
        onComplete(result);
    }
}

executeWithLogging(
    () => 5 * 10, // operation
    (result) => {
        console.log(`✓ Final result: ${result}`);
    } // callback
);


// ============================================
// 10. CALLBACK FOR ARRAY OPERATIONS
// ============================================
console.log("\n=== 10. ARRAY OPERATIONS WITH CALLBACKS ===");

function findUser(users, predicate, callback) {
    for (let user of users) {
        if (predicate(user)) {
            callback(user);
            return;
        }
    }
    callback(null);
}

const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 28 }
];

findUser(
    users,
    (user) => user.age > 27, // predicate to check
    (foundUser) => {
        if (foundUser) {
            console.log("Found user:", foundUser.name, "Age:", foundUser.age);
        } else {
            console.log("User not found!");
        }
    }
);


// ============================================
// 11. MODERN ALTERNATIVE - Promises
// ============================================
console.log("\n=== 11. PROMISES (Modern Alternative) ===");

function fetchDataWithPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id: id, data: "Success!" });
            } else {
                reject("Invalid ID!");
            }
        }, 500);
    });
}

// Using .then() - which uses callbacks internally
fetchDataWithPromise(1)
    .then((data) => {
        console.log("✓ Promise resolved:", data);
    })
    .catch((error) => {
        console.log("✗ Promise rejected:", error);
    });

// Using async/await - cleaner callback alternative
async function getDataAsync() {
    try {
        const data = await fetchDataWithPromise(2);
        console.log("✓ Async result:", data);
    } catch (error) {
        console.log("✗ Async error:", error);
    }
}

getDataAsync();


// ============================================
// SUMMARY / KEY POINTS
// ============================================
console.log("\n=== CALLBACK SUMMARY ===");
console.log(`
Callbacks are functions passed as arguments to other functions.

Key Points:
✓ Callbacks execute after an event or operation completes
✓ Used in: array methods (map, filter), timers, event handlers
✓ Callback Hell: Nested callbacks become hard to read
✓ Alternatives: Promises and async/await are more modern

Common Use Cases:
• Array operations: forEach, map, filter, reduce
• Timers: setTimeout, setInterval
• Event listeners: click, scroll, load events
• API calls and async operations
• Error handling
`);
