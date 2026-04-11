// ===== DEBOUNCE FUNCTION =====
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// ===== EXAMPLE 1: Search Input =====
// Debounce a search function - only search after user stops typing for 300ms
const searchUsers = debounce((query) => {
  console.log(`Searching for: ${query}`);
  // In real app: fetch(`/api/search?q=${query}`)
}, 300);

// Simulating search input
console.log("=== EXAMPLE 1: Search ===");
searchUsers("J");
searchUsers("Jo");
searchUsers("John"); // Only this will execute after 300ms
setTimeout(() => searchUsers("Johnny"), 500);


// ===== EXAMPLE 2: Window Resize =====
const handleResize = debounce(() => {
  console.log("Window resized - recalculating layout");
  const windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  console.log("New dimensions:", windowSize);
}, 250);

// window.addEventListener('resize', handleResize);


// ===== EXAMPLE 3: Auto-save Form =====
const saveForm = debounce((data) => {
  console.log("Form saved:", data);
  // In real app: fetch('/api/save', { method: 'POST', body: JSON.stringify(data) })
}, 1000);

console.log("\n=== EXAMPLE 3: Auto-save ===");
saveForm({ name: "John", email: "john@example.com" }); // Won't execute
setTimeout(() => {
  saveForm({ name: "John", email: "john@gmail.com" }); // Won't execute
}, 300);
setTimeout(() => {
  saveForm({ name: "John Doe", email: "john@gmail.com" }); // Will execute after 1s
}, 600);


// ===== EXAMPLE 4: Throttle Alternative (for comparison) =====
function throttle(func, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      func.apply(this, args);
      lastRun = now;
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("User scrolling - fires every 500ms");
}, 500);

// window.addEventListener('scroll', throttledScroll);


// ===== EXAMPLE 5: Input Validation =====
const validateEmail = debounce((email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  console.log(`Email "${email}" is ${isValid ? "VALID" : "INVALID"}`);
}, 500);

console.log("\n=== EXAMPLE 5: Email Validation ===");
validateEmail("user");
validateEmail("user@");
validateEmail("user@example"); // Only this will validate
setTimeout(() => validateEmail("user@example.com"), 600);


// ===== EXAMPLE 6: API Call with Debounce =====
function fetchUserData(userId) {
  console.log(`Fetching data for user ${userId}...`);
  // Simulating API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Data received for user ${userId}`);
      resolve({ id: userId, name: `User ${userId}` });
    }, 500);
  });
}

const debouncedFetch = debounce(fetchUserData, 400);

console.log("\n=== EXAMPLE 6: API Call ===");
debouncedFetch(1); // Won't execute
debouncedFetch(2); // Won't execute
debouncedFetch(3); // Will execute after 400ms


// ===== KEY TAKEAWAYS =====
console.log("\n=== KEY DIFFERENCES ===");
console.log("DEBOUNCE: Waits for inactivity, executes ONCE");
console.log("THROTTLE: Executes at regular intervals");
console.log("\nUse DEBOUNCE for: searches, auto-save, validation");
console.log("Use THROTTLE for: scrolling, resizing, mouse movement");
