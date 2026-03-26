// Node.js Examples - Common Use Cases and Patterns

// ============================================
// 1. IMPORTING BUILT-IN MODULES
// ============================================
const fs = require('fs');
const path = require('path');
const http = require('http');
const events = require('events');

// ============================================
// 2. READING FILES
// ============================================

// Synchronous (blocking) - use sparingly
function readFileSync() {
  try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

// Asynchronous with callback
function readFileCallback() {
  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('File content:', data);
  });
}

// With Promises
function readFilePromise() {
  fs.promises.readFile('example.txt', 'utf8')
    .then(data => console.log('File content:', data))
    .catch(err => console.error('Error:', err));
}

// With async/await (modern approach)
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

// ============================================
// 3. WRITING FILES
// ============================================

// Write file (overwrites if exists)
function writeFile() {
  fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
    if (err) throw err;
    console.log('File written successfully');
  });
}

// Append to file
function appendToFile() {
  fs.appendFile('output.txt', '\nNew line added', (err) => {
    if (err) throw err;
    console.log('Data appended');
  });
}

// ============================================
// 4. FILE SYSTEM OPERATIONS
// ============================================

// Check if file exists
function checkIfExists() {
  if (fs.existsSync('example.txt')) {
    console.log('File exists!');
  } else {
    console.log('File does not exist');
  }
}

// Delete file
function deleteFile() {
  fs.unlink('output.txt', (err) => {
    if (err) throw err;
    console.log('File deleted');
  });
}

// Create directory
function createDirectory() {
  fs.mkdir('myFolder', { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Directory created');
  });
}

// ============================================
// 5. SIMPLE HTTP SERVER
// ============================================

const server = http.createServer((req, res) => {
  // Set response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Route handling
  if (req.url === '/') {
    res.end('Welcome to Node.js Server!');
  } else if (req.url === '/about') {
    res.end('This is the About page');
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
});

// Start server
function startServer() {
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

// ============================================
// 6. WORKING WITH JSON
// ============================================

function jsonExamples() {
  // Object to JSON string
  const user = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
  };
  
  const jsonString = JSON.stringify(user, null, 2);
  console.log('JSON String:', jsonString);
  
  // JSON string to Object
  const parsed = JSON.parse(jsonString);
  console.log('Parsed Object:', parsed);
}

// ============================================
// 7. COMMAND LINE ARGUMENTS
// ============================================

function handleCommandLineArgs() {
  // Run: node nodeExamples.js arg1 arg2 arg3
  console.log('All arguments:', process.argv);
  console.log('First custom arg:', process.argv[2]);
  console.log('Second custom arg:', process.argv[3]);
}

// ============================================
// 8. ENVIRONMENT VARIABLES
// ============================================

function environmentVariables() {
  // Access environment variables
  console.log('Node Environment:', process.env.NODE_ENV);
  
  // Set environment variable (in code)
  process.env.MY_VAR = 'custom value';
  console.log('Custom variable:', process.env.MY_VAR);
}

// ============================================
// 9. EVENT EMITTER
// ============================================

class MyEventEmitter extends events.EventEmitter {}

function eventEmitterExample() {
  const myEmitter = new MyEventEmitter();
  
  // Listen for event
  myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
  });
  
  // Emit event
  myEmitter.emit('greet', 'Alice');
  myEmitter.emit('greet', 'Bob');
}

// ============================================
// 10. PROMISES AND ASYNC/AWAIT
// ============================================

// Promise example
function promiseExample() {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolved!');
    }, 1000);
  });
  
  myPromise.then(result => console.log(result))
           .catch(error => console.error(error));
}

// Async/await example
async function asyncAwaitExample() {
  try {
    const result = await new Promise(resolve => {
      setTimeout(() => resolve('Async operation complete!'), 1000);
    });
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

// ============================================
// 11. WORKING WITH PATHS
// ============================================

function pathExamples() {
  // Join paths
  const fullPath = path.join(__dirname, 'files', 'data.txt');
  console.log('Full path:', fullPath);
  
  // Get file extension
  const ext = path.extname('document.pdf');
  console.log('Extension:', ext);
  
  // Get directory name
  const dir = path.dirname('/users/john/documents/file.txt');
  console.log('Directory:', dir);
  
  // Get filename
  const filename = path.basename('/users/john/documents/file.txt');
  console.log('Filename:', filename);
}

// ============================================
// 12. MODULE EXPORTS AND IMPORTS
// ============================================

// Exporting functions (in this file)
module.exports = {
  readFileAsync,
  writeFile,
  jsonExamples,
  eventEmitterExample,
  asyncAwaitExample,
  pathExamples
};

// Or export individual items:
// module.exports.readFileAsync = readFileAsync;
// module.exports.writeFile = writeFile;

// ============================================
// 13. USING IMPORTED MODULES
// ============================================

// If you save this in another file (e.g., main.js):
// const examples = require('./nodeExamples.js');
// examples.readFileAsync();
// examples.jsonExamples();

// ============================================
// RUNNING THIS FILE
// ============================================

// To run: node nodeExamples.js
// The functions defined above are available for import in other files
// or you can call them directly here:

if (require.main === module) {
  console.log('=== Node.js Examples ===\n');
  
  // Uncomment to test:
  // jsonExamples();
  // pathExamples();
  // eventEmitterExample();
  // promiseExample();
  // startServer();
}
