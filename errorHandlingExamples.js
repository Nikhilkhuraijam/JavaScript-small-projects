// ============================================
// ERROR HANDLING EXAMPLES IN JAVASCRIPT
// ============================================

// 1. BASIC TRY-CATCH BLOCK
// ========================
console.log("=== 1. BASIC TRY-CATCH ===");

try {
  const result = 10 / 2;
  console.log("Result:", result);
  
  // This will cause an error
  const arr = [1, 2, 3];
  console.log(arr.nonExistentMethod()); // Will throw error
} catch (error) {
  console.log("Error caught:", error.message);
  console.log("Error type:", error.name);
}


// 2. ERROR PROPERTIES
// ===================
console.log("\n=== 2. ERROR PROPERTIES ===");

try {
  throw new Error("Custom error message");
} catch (error) {
  console.log("Message:", error.message);
  console.log("Name:", error.name);
  console.log("Stack:", error.stack);
}


// 3. THROW CUSTOM ERRORS
// ======================
console.log("\n=== 3. THROW CUSTOM ERRORS ===");

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed!");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));
  console.log(divide(10, 0)); // Will throw error
} catch (error) {
  console.log("Caught error:", error.message);
}


// 4. FINALLY BLOCK
// ================
console.log("\n=== 4. FINALLY BLOCK ===");

function processFile() {
  let file = "opening file...";
  
  try {
    console.log(file);
    file = "processing file...";
    console.log(file);
    throw new Error("Processing failed!");
  } catch (error) {
    console.log("Error:", error.message);
    file = "error caught, rolling back...";
  } finally {
    console.log("Cleanup:", file); // Always executes
  }
}

processFile();


// 5. DIFFERENT ERROR TYPES
// ========================
console.log("\n=== 5. DIFFERENT ERROR TYPES ===");

try {
  // ReferenceError - variable doesn't exist
  console.log(undefinedVariable);
} catch (error) {
  console.log("ReferenceError caught:", error.name);
}

try {
  // TypeError - wrong type
  const str = "hello";
  str.push("world"); // Strings don't have push method
} catch (error) {
  console.log("TypeError caught:", error.name);
}

try {
  // SyntaxError - invalid JSON
  JSON.parse("{ invalid json }");
} catch (error) {
  console.log("SyntaxError caught:", error.name);
}


// 6. CUSTOM ERROR CLASSES
// =======================
console.log("\n=== 6. CUSTOM ERROR CLASSES ===");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}

function validateEmail(email) {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format");
  }
  return true;
}

try {
  validateEmail("invalid-email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  }
}


// 7. ERROR HANDLING WITH PROMISES
// ================================
console.log("\n=== 7. ERROR HANDLING WITH PROMISES ===");

// Promise that rejects
const failedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Promise rejected!"));
  }, 100);
});

failedPromise
  .then(result => console.log("Success:", result))
  .catch(error => console.log("Promise error caught:", error.message));

// Promise chain with multiple error handlers
new Promise((resolve, reject) => {
  resolve("Step 1");
})
  .then(result => {
    console.log(result);
    return "Step 2";
  })
  .then(result => {
    console.log(result);
    throw new Error("Error in step 2");
  })
  .catch(error => {
    console.log("Caught error:", error.message);
  });


// 8. ERROR HANDLING WITH ASYNC-AWAIT
// ===================================
console.log("\n=== 8. ERROR HANDLING WITH ASYNC-AWAIT ===");

function simulateAsyncTask(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Async task failed!"));
      } else {
        resolve("Task completed successfully");
      }
    }, 100);
  });
}

async function handleAsync() {
  try {
    console.log("Starting async operation...");
    const result = await simulateAsyncTask(false);
    console.log("Result:", result);
  } catch (error) {
    console.log("Caught async error:", error.message);
  }
}

handleAsync();


// 9. ASYNC-AWAIT WITH MULTIPLE OPERATIONS
// =========================================
console.log("\n=== 9. ASYNC-AWAIT WITH MULTIPLE OPERATIONS ===");

async function multipleOperations() {
  try {
    console.log("Operation 1...");
    await simulateAsyncTask(false);
    
    console.log("Operation 2...");
    await simulateAsyncTask(false);
    
    console.log("Operation 3...");
    await simulateAsyncTask(true); // This will fail
    
    console.log("Operation 4..."); // Won't reach here
  } catch (error) {
    console.log("Error in operations:", error.message);
  }
}

multipleOperations();


// 10. ERROR HANDLING WITH FETCH API
// ==================================
console.log("\n=== 10. ERROR HANDLING WITH FETCH API ===");

async function fetchData() {
  try {
    // This URL doesn't exist, will get 404
    const response = await fetch("https://api.example.com/invalid");
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Data:", data);
  } catch (error) {
    if (error instanceof TypeError) {
      console.log("Network error:", error.message);
    } else {
      console.log("Fetch error:", error.message);
    }
  }
}

// Uncomment to test: fetchData();


// 11. FINALLY WITH ASYNC-AWAIT
// =============================
console.log("\n=== 11. FINALLY WITH ASYNC-AWAIT ===");

async function operationWithCleanup() {
  let connection = null;
  
  try {
    console.log("Opening connection...");
    connection = "connected";
    console.log("Connection status:", connection);
    
    // Simulate error
    throw new Error("Operation failed");
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    console.log("Closing connection...");
    connection = "closed";
    console.log("Final connection status:", connection);
  }
}

operationWithCleanup();


// 12. PRACTICAL EXAMPLE: SAFE JSON PARSING
// ==========================================
console.log("\n=== 12. PRACTICAL EXAMPLE: SAFE JSON PARSING ===");

function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("JSON parse error:", error.message);
    return defaultValue;
  }
}

const validJson = '{"name": "John", "age": 30}';
const invalidJson = '{ invalid }';

console.log("Valid:", safeJsonParse(validJson));
console.log("Invalid:", safeJsonParse(invalidJson, {}));


// 13. CHAIN OF RESPONSIBILITY (ERROR HANDLING)
// =============================================
console.log("\n=== 13. CHAIN OF RESPONSIBILITY ===");

function handleError(error) {
  if (error instanceof ValidationError) {
    console.log("Handling validation error:", error.message);
  } else if (error instanceof DatabaseError) {
    console.log("Handling database error:", error.message);
  } else {
    console.log("Handling generic error:", error.message);
  }
}

try {
  throw new ValidationError("User data invalid");
} catch (error) {
  handleError(error);
}


console.log("\n=== EXAMPLES COMPLETE ===");
