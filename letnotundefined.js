console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
let x = 5;

console.log(y); // ✅ undefined (var is hoisted and initialized)
var y = 10;
