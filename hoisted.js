// Example 1: Function hoisting
sayHello(); // ✅ Works even though function is defined later

function sayHello() {
  console.log("Hello, world!");
}

// Example 2: var hoisting
console.log(a); // ✅ undefined (hoisted but not initialized)
var a = 10;
console.log(a); // 10

// Example 3: let and const (not hoisted the same way)
console.log(b); // ❌ ReferenceError (temporal dead zone)
let b = 20;

console.log(c); // ❌ ReferenceError
const c = 30;
