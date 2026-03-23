// ============================================
// PROMISES & ASYNC/AWAIT LEARNING GUIDE
// ============================================

// ============================================
// 1. BASIC PROMISE EXAMPLE
// ============================================
console.log("--- 1. Basic Promise ---");

const basicPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 1000);
});

basicPromise.then(result => {
  console.log(result); // Prints after 1 second
});

// ============================================
// 2. PROMISE WITH REJECTION
// ============================================
console.log("--- 2. Promise with Error Handling ---");

const promiseWithError = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Something went wrong!");
  }, 1000);
});

promiseWithError
  .then(result => console.log(result))
  .catch(error => console.log("Caught error:", error));

// ============================================
// 3. ASYNC/AWAIT - BASIC
// ============================================
console.log("--- 3. Async/Await Basic ---");

async function basicAsyncFunction() {
  const result = await basicPromise;
  console.log("Async result:", result);
}

basicAsyncFunction();

// ============================================
// 4. ASYNC/AWAIT WITH ERROR HANDLING
// ============================================
console.log("--- 4. Async/Await with Try/Catch ---");

async function asyncWithErrorHandling() {
  try {
    const result = await promiseWithError;
    console.log("Success:", result);
  } catch (error) {
    console.log("Caught error in async:", error);
  }
}

asyncWithErrorHandling();

// ============================================
// 5. SIMULATING API CALL
// ============================================
console.log("--- 5. Simulating API Call ---");

// Function that simulates fetching user data
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "John Doe", email: "john@example.com" });
      } else {
        reject("Invalid user ID");
      }
    }, 1500);
  });
}

// Using async/await to fetch user data
async function getUserInfo() {
  try {
    console.log("Fetching user...");
    const user = await fetchUserData(1);
    console.log("User fetched:", user);
  } catch (error) {
    console.log("Error fetching user:", error);
  }
}

getUserInfo();

// ============================================
// 6. CHAINING ASYNC/AWAIT
// ============================================
console.log("--- 6. Chaining Multiple Async Operations ---");

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post", userId: userId },
        { id: 2, title: "Second Post", userId: userId },
      ]);
    }, 1000);
  });
}

async function getUserWithPosts() {
  try {
    const user = await fetchUserData(1);
    console.log("User:", user.name);
    
    const posts = await fetchPosts(user.id);
    console.log("Posts:", posts);
  } catch (error) {
    console.log("Error:", error);
  }
}

getUserWithPosts();

// ============================================
// 7. PROMISE.ALL - PARALLEL EXECUTION
// ============================================
console.log("--- 7. Promise.all (Wait for Multiple Promises) ---");

async function fetchMultipleData() {
  try {
    const [user, posts] = await Promise.all([
      fetchUserData(1),
      fetchPosts(1),
    ]);
    console.log("Parallel fetch - User:", user.name, "Posts count:", posts.length);
  } catch (error) {
    console.log("Error in parallel fetch:", error);
  }
}

fetchMultipleData();

// ============================================
// 8. REAL FETCH API EXAMPLE (commented out - uncomment to test)
// ============================================
/*
async function fetchFromAPI() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    console.log("Real API data:", data);
  } catch (error) {
    console.log("API Error:", error);
  }
}

fetchFromAPI();
*/

// ============================================
// SUMMARY
// ============================================
/*
KEY POINTS:
1. Promises handle asynchronous operations
2. States: pending → fulfilled or rejected
3. async/await is cleaner syntax for promises
4. Use try/catch for error handling in async functions
5. await pauses execution until promise settles
6. Promise.all() runs multiple promises in parallel

WHEN TO USE:
- API calls (fetch, axios)
- Database queries
- File operations
- Timers that return promises
*/
