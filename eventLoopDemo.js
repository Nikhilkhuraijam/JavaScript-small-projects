// ═══════════════════════════════════════════════════════════════════════════
// NODE.JS EVENT LOOP ARCHITECTURE DEMO
// ═══════════════════════════════════════════════════════════════════════════
// Demonstrates: Call Stack, Event Loop, Callback Queue, Microtask Queue

console.log('═══════════════════════════════════════════════════════════════');
console.log('EVENT LOOP DEMO - Watch execution order');
console.log('═══════════════════════════════════════════════════════════════\n');

// ─── 1. SYNCHRONOUS CODE (Call Stack) ─────────────────────────────────────
console.log('1️⃣  SYNCHRONOUS CODE');
console.log('Start');

function greet(name) {
  console.log(`  → Hello, ${name}!`);
}

greet('Nikhil');
console.log('End\n');

// ─── 2. CALLBACKS (Callback Queue / Macrotask Queue) ─────────────────────────
console.log('2️⃣  CALLBACKS (setTimeout - Macrotask)');
console.log('Before setTimeout');

setTimeout(() => {
  console.log('  → Inside setTimeout (macrotask)');
}, 0); // Even with 0ms, goes to callback queue!

console.log('After setTimeout\n');

// ─── 3. PROMISES (Microtask Queue) ──────────────────────────────────────────
console.log('3️⃣  PROMISES (Microtask Queue - Higher Priority)');
console.log('Before Promise');

Promise.resolve('Promise resolved!')
  .then(result => {
    console.log('  → ' + result);
  });

console.log('After Promise\n');

// ─── 4. EXECUTION ORDER DEMO: Promises vs setTimeout ──────────────────────
console.log('4️⃣  MICROTASKS vs MACROTASKS (Execution Order)');
console.log('Start\n');

// Macrotask
setTimeout(() => {
  console.log('  ⏱️  setTimeout (Macrotask - slower)');
}, 0);

// Microtask (Higher Priority!)
Promise.resolve()
  .then(() => {
    console.log('  ✅ Promise then (Microtask - faster)');
  });

// Another Microtask
Promise.resolve()
  .then(() => {
    console.log('  ✅ Promise 2 then (Microtask)');
  });

// Synchronous
console.log('  📍 Synchronous code (fastest)\n');

// ─── 5. ASYNC/AWAIT DEMO ───────────────────────────────────────────────────
console.log('5️⃣  ASYNC/AWAIT (Under the hood = Promises + Callbacks)');

async function delayedGreeting() {
  console.log('  ⏳ Async function started');
  
  // await pauses execution (returns control to event loop)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('  ✅ Async function resumed after 1 second');
}

delayedGreeting();
console.log('  (async function called - continues without waiting)\n');

// ─── 6. REAL WORLD: Callback Hell vs Promises vs Async/Await ──────────────
console.log('6️⃣  CALLBACK HELL vs PROMISES vs ASYNC/AWAIT\n');

// Simulated async operations
function fetchData(id, delay = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data for ID: ${id}`);
    }, delay);
  });
}

// ❌ Callback Hell (Hard to read)
console.log('❌ CALLBACK HELL:');
console.log('fetchData(1, () => {');
console.log('  fetchData(2, () => {');
console.log('    fetchData(3, () => { /* nested mess */ })');
console.log('  })');
console.log('});');

// ✅ Promise Chain (Better but still confusing)
console.log('\n✅ PROMISE CHAIN:');
fetchData(1)
  .then(data1 => {
    console.log(`  → ${data1}`);
    return fetchData(2);
  })
  .then(data2 => {
    console.log(`  → ${data2}`);
    return fetchData(3);
  })
  .then(data3 => {
    console.log(`  → ${data3}`);
  });

// ✅✅ Async/Await (Cleanest - reads like synchronous code)
console.log('\n✅✅ ASYNC/AWAIT (BEST):');
async function getSequentialData() {
  try {
    const data1 = await fetchData(1);
    console.log(`  → ${data1}`);
    
    const data2 = await fetchData(2);
    console.log(`  → ${data2}`);
    
    const data3 = await fetchData(3);
    console.log(`  → ${data3}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getSequentialData();
console.log('  (waiting for async operations...)\n');

// ─── 7. PARALLEL OPERATIONS (Promise.all) ──────────────────────────────────
console.log('7️⃣  PARALLEL OPERATIONS (Promise.all)\n');

async function getParallelData() {
  try {
    console.log('⏱️  Fetching data in parallel...');
    const startTime = Date.now();
    
    // All requests start at same time (faster than sequential)
    const results = await Promise.all([
      fetchData(1, 500),
      fetchData(2, 500),
      fetchData(3, 500)
    ]);
    
    results.forEach(result => console.log(`  ✅ ${result}`));
    console.log(`⏱️  Total time: ${Date.now() - startTime}ms (should be ~500ms, not 1500ms)\n`);
  } catch (error) {
    console.error('Error:', error);
  }
}

getParallelData();

// ─── 8. EVENT LOOP VISUALIZATION ──────────────────────────────────────────
console.log('8️⃣  EVENT LOOP ARCHITECTURE\n');
console.log(`
┌─────────────────────────────────────────────────────────────┐
│  CALL STACK                                                 │
│  (Synchronous code runs here)                               │
│  console.log(), function calls, etc.                        │
└─────────────────────────────────────────────────────────────┘
                           ⬇️ 
                    [Call Stack Empty?]
                           ⬇️
┌─────────────────────────────────────────────────────────────┐
│  MICROTASK QUEUE (Priority 1)                               │
│  • Promises (.then, .catch, .finally)                       │
│  • async/await                                              │
│  • queueMicrotask()                                         │
│  ⚡ Executes BEFORE macrotasks                              │
└─────────────────────────────────────────────────────────────┘
                           ⬇️
┌─────────────────────────────────────────────────────────────┐
│  MACROTASK QUEUE (Priority 2)                               │
│  • setTimeout / setInterval                                 │
│  • setImmediate (Node.js only)                              │
│  • I/O operations                                           │
│  🐢 Slower than microtasks                                  │
└─────────────────────────────────────────────────────────────┘
`);

// ─── 9. FINAL EXECUTION ORDER TEST ────────────────────────────────────────
console.log('9️⃣  COMPLETE EXECUTION ORDER TEST:\n');

console.log('Script start');

setTimeout(() => {
  console.log('  1. setTimeout A');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('  2. Promise A');
    return Promise.resolve();
  })
  .then(() => {
    console.log('  3. Promise B (chained)');
  });

setTimeout(() => {
  console.log('  4. setTimeout B');
}, 0);

console.log('Script end');

console.log('\n✅ Expected order: Script start → Script end → Promise A → Promise B → setTimeout A → setTimeout B');
console.log('\n═══════════════════════════════════════════════════════════════\n');

// ─── 10. BONUS: Process.nextTick (Node.js specific) ────────────────────────
console.log('🎁 BONUS: process.nextTick() (Node.js only)');
console.log('(Executes BEFORE microtasks - highest priority in Node.js)\n');

process.nextTick(() => {
  console.log('  🔥 process.nextTick (Highest priority in Node.js)');
});

Promise.resolve().then(() => {
  console.log('  ✅ Promise');
});

console.log('  📍 Sync code');
console.log('\n✅ Node.js order: process.nextTick → Promise → setTimeout\n');

console.log('═══════════════════════════════════════════════════════════════');
