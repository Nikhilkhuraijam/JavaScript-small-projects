// ========== SYNCHRONOUS EXAMPLES ==========

// Example 1: Basic synchronous code (executes line by line)
console.log('Start');
console.log('Middle');
console.log('End');

// Example 2: Function with loops (blocking)
function sumNumbers(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

console.log('Sum:', sumNumbers(1000000)); // Blocks until completed


// ========== ASYNCHRONOUS EXAMPLES ==========

// Example 1: Using setTimeout (callback)
console.log('Before');
setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);
console.log('After');
// Output: Before, After, then (after 2 sec) This runs after 2 seconds


// Example 2: Promises
function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve(`Data for id ${id}`);
      } else {
        reject('Invalid ID');
      }
    }, 1000);
  });
}

fetchData(5)
  .then(data => console.log(data))
  .catch(error => console.log(error));


// Example 3: Async/Await (modern asynchronous)
async function getUserData(userId) {
  try {
    // Simulate API call
    const response = new Promise(resolve => {
      setTimeout(() => resolve({ id: userId, name: 'John' }), 1000);
    });
    
    const data = await response;
    console.log('User:', data);
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

getUserData(1);


// ========== KEY DIFFERENCES ==========

/*
SYNCHRONOUS:
- Code executes line by line
- Each line waits for the previous to complete
- Blocking operations freeze the program
- Simple to understand and debug

ASYNCHRONOUS:
- Code can execute in parallel
- Operations continue without waiting
- Uses callbacks, promises, or async/await
- Better for long operations (API calls, file reading, timers)
- Prevents UI freezing in browsers
*/
