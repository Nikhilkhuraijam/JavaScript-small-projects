// ========================================
// JAVASCRIPT FUNCTIONS EXAMPLES
// ========================================

// 1. FUNCTION DECLARATION
// ========================================
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));  // Hello, Alice!


// 2. FUNCTION EXPRESSION
// ========================================
const add = function(a, b) {
    return a + b;
};

console.log(add(5, 3));  // 8


// 3. ARROW FUNCTIONS (ES6)
// ========================================
// Single parameter, single statement
const square = x => x * x;
console.log(square(4));  // 16

// Multiple parameters
const multiply = (a, b) => a * b;
console.log(multiply(3, 7));  // 21

// Multiple statements (requires braces and return)
const divide = (a, b) => {
    if (b === 0) {
        return "Cannot divide by zero";
    }
    return a / b;
};
console.log(divide(10, 2));  // 5


// 4. DEFAULT PARAMETERS
// ========================================
function introduce(name, age = 18, city = "Unknown") {
    return `${name} is ${age} years old and lives in ${city}`;
}

console.log(introduce("Bob"));                        // Bob is 18 years old and lives in Unknown
console.log(introduce("Charlie", 25));               // Charlie is 25 years old and lives in Unknown
console.log(introduce("Diana", 30, "New York"));     // Diana is 30 years old and lives in New York


// 5. REST PARAMETERS (...args)
// ========================================
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));           // 6
console.log(sum(1, 2, 3, 4, 5));     // 15


// 6. CLOSURES
// ========================================
function makeCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3


// 7. HIGHER-ORDER FUNCTIONS
// ========================================
// Function that takes another function as argument
function applyTwice(fn, value) {
    return fn(fn(value));
}

const double = x => x * 2;
console.log(applyTwice(double, 5));  // 20


// 8. MAP, FILTER, REDUCE (Built-in Higher-Order Functions)
// ========================================
const numbers = [1, 2, 3, 4, 5];

// MAP - transform each element
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// FILTER - select elements that match condition
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4]

// REDUCE - combine elements into single value
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product);  // 120


// 9. ANONYMOUS FUNCTIONS
// ========================================
setTimeout(function() {
    console.log("This runs after 2 seconds");
}, 2000);

// With arrow function
setTimeout(() => {
    console.log("This also runs after 2 seconds");
}, 2000);


// 10. CALLBACK FUNCTIONS
// ========================================
function processUserInput(name, callback) {
    const greeting = `Welcome, ${name}!`;
    callback(greeting);
}

processUserInput("Eve", function(message) {
    console.log(message);  // Welcome, Eve!
});


// 11. IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
// ========================================
(function() {
    const secret = "This is private";
    console.log(secret);  // This is private
})();

// console.log(secret);  // Error! secret is not defined


// 12. OBJECT METHODS
// ========================================
const person = {
    name: "Frank",
    age: 28,
    greet: function() {
        return `Hi, I'm ${this.name}`;
    },
    birthday() {
        this.age++;
        return `Happy birthday! Now ${this.age} years old`;
    }
};

console.log(person.greet());      // Hi, I'm Frank
console.log(person.birthday());   // Happy birthday! Now 29 years old


// 13. ASYNC FUNCTIONS
// ========================================
async function fetchData() {
    try {
        // Simulating API call
        const data = await new Promise(resolve => {
            setTimeout(() => resolve("Data fetched!"), 1000);
        });
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// fetchData();  // Uncomment to test


// 14. GENERATOR FUNCTIONS
// ========================================
function* countUp() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = countUp();
console.log(gen.next().value);  // 1
console.log(gen.next().value);  // 2
console.log(gen.next().value);  // 3


// 15. PURE FUNCTIONS (No side effects)
// ========================================
// Pure function - always returns same output for same input
const addNumbers = (a, b) => a + b;

// Not pure - depends on external state
let globalMultiplier = 2;
const multiplyGlobal = (a) => a * globalMultiplier;


console.log("========================================");
console.log("All function examples completed!");
console.log("========================================");
