// ========================================
// REGULAR EXPRESSIONS (REGEX) EXAMPLES
// ========================================

// 1. BASIC REGEX PATTERNS
// ========================================

// Creating regex patterns
const pattern1 = /hello/;                    // Literal pattern
const pattern2 = new RegExp('hello');       // Constructor method
const pattern3 = /hello/i;                  // Case-insensitive flag
const pattern4 = /hello/g;                  // Global flag (all matches)
const pattern5 = /hello/gi;                 // Combined flags

console.log("=== 1. BASIC PATTERNS ===");
console.log(pattern1.test("hello world"));      // true
console.log(pattern1.test("HELLO world"));      // false
console.log(pattern3.test("HELLO world"));      // true (i flag)


// 2. COMMON REGEX METHODS
// ========================================

console.log("\n=== 2. REGEX METHODS ===");

const text = "The quick brown fox jumps over the lazy dog";

// test() - returns boolean
console.log("test('fox'):", /fox/.test(text));

// match() - returns array of matches
console.log("match(/[aeiou]/g):", text.match(/[aeiou]/g));

// search() - returns index of first match (-1 if not found)
console.log("search(/brown/):", text.search(/brown/));

// replace() - replaces first or all matches (with g flag)
console.log("replace(/fox/, 'cat'):", text.replace(/fox/, 'cat'));
console.log("replace(/o/g, '0'):", text.replace(/o/g, '0'));

// replaceAll() - replaces all matches (ES2021)
console.log("replaceAll(/o/, '0'):", text.replaceAll(/o/g, '0'));

// split() - splits string using regex
console.log("split(/\\s+/):", text.split(/\s+/));


// 3. CHARACTER CLASSES
// ========================================

console.log("\n=== 3. CHARACTER CLASSES ===");

// [abc]     - Match any character in brackets
// [^abc]    - Match any character NOT in brackets
// [a-z]     - Match range of characters
// .         - Match any character except newline
// \\s       - Whitespace character
// \\S       - Non-whitespace character
// \\d       - Digit (0-9)
// \\D       - Non-digit
// \\w       - Word character (a-z, A-Z, 0-9, _)
// \\W       - Non-word character

const testString = "Hello123 World!";

console.log("Digits:", testString.match(/\d/g));           // ['1', '2', '3']
console.log("Lowercase:", testString.match(/[a-z]/g));     // ['e', 'l', 'l', 'o', ...]
console.log("Word chars:", testString.match(/\w/g));       // ['H', 'e', 'l', 'l', 'o', ...]


// 4. QUANTIFIERS
// ========================================

console.log("\n=== 4. QUANTIFIERS ===");

// *     - 0 or more times
// +     - 1 or more times
// ?     - 0 or 1 time (optional)
// {n}   - Exactly n times
// {n,}  - n or more times
// {n,m} - Between n and m times

const phoneNumbers = ["123456789", "12345678", "123456789012"];

phoneNumbers.forEach(num => {
  console.log(`${num} matches \\d{9,11}:`, /\d{9,11}/.test(num));
});

const emails = ["test@mail", "test.com", "test@mail.com"];
emails.forEach(email => {
  console.log(`${email} has @:`, /@/.test(email));
});


// 5. ANCHORS & BOUNDARIES
// ========================================

console.log("\n=== 5. ANCHORS & BOUNDARIES ===");

// ^     - Start of string
// $     - End of string
// \\b   - Word boundary
// \\B   - Non-word boundary

const sentence = "The cat sat on the mat";

console.log("Starts with 'The':", /^The/.test(sentence));          // true
console.log("Ends with 'mat':", /mat$/.test(sentence));            // true
console.log("Starts with 'cat':", /^cat/.test(sentence));          // false
console.log("Word 'cat' with boundary:", /\bcat\b/.test(sentence)); // true


// 6. EMAIL VALIDATION
// ========================================

console.log("\n=== 6. EMAIL VALIDATION ===");

// Simple email regex (note: complete email validation is complex)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const testEmails = [
  "user@example.com",
  "john.doe@company.co.uk",
  "invalid.email@",
  "noatsign.com",
  "spaces @invalid.com"
];

testEmails.forEach(email => {
  console.log(`${email}: ${emailRegex.test(email)}`);
});


// 7. PHONE NUMBER VALIDATION
// ========================================

console.log("\n=== 7. PHONE NUMBER VALIDATION ===");

// Different formats: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
const phoneRegex = /^(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

const phones = [
  "1234567890",
  "(123) 456-7890",
  "123-456-7890",
  "123.456.7890",
  "+1-123-456-7890",
  "12345678",        // invalid
  "abc-def-ghij"     // invalid
];

phones.forEach(phone => {
  console.log(`${phone}: ${phoneRegex.test(phone)}`);
});


// 8. PASSWORD VALIDATION
// ========================================

console.log("\n=== 8. PASSWORD VALIDATION ===");

// Requirements: min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const passwords = [
  "Pass@123",           // valid
  "password123",        // invalid (no uppercase, no special)
  "PASSWORD123",        // invalid (no lowercase)
  "Pass@1",             // invalid (too short)
  "Valid@Pass123"       // valid
];

passwords.forEach(pass => {
  console.log(`${pass}: ${passwordRegex.test(pass)}`);
});


// 9. URL VALIDATION
// ========================================

console.log("\n=== 9. URL VALIDATION ===");

const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

const urls = [
  "https://www.google.com",
  "http://example.com",
  "www.github.com",
  "notaurl",
  "https://sub.domain.co.uk/path/to/page"
];

urls.forEach(url => {
  console.log(`${url}: ${urlRegex.test(url)}`);
});


// 10. TEXT EXTRACTION & MANIPULATION
// ========================================

console.log("\n=== 10. TEXT EXTRACTION ===");

const html = "<h1>Hello</h1><p>This is a paragraph</p><p>Another one</p>";

// Extract all HTML tags
const tags = html.match(/<[^>]+>/g);
console.log("HTML tags:", tags);

// Extract text between tags
const textBetweenTags = html.match(/>[^<]+</g);
console.log("Text between tags:", textBetweenTags);

// Remove HTML tags
const plainText = html.replace(/<[^>]+>/g, "");
console.log("Plain text:", plainText);


// 11. GROUPS & CAPTURING
// ========================================

console.log("\n=== 11. GROUPS & CAPTURING ===");

const dateString = "2024-04-20";
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/;

const match = dateString.match(dateRegex);
console.log("Full match:", match[0]);    // 2024-04-20
console.log("Year:", match[1]);          // 2024
console.log("Month:", match[2]);         // 04
console.log("Day:", match[3]);           // 20

// Named groups (ES2018)
const nameRegex = /(?<firstName>\w+)\s(?<lastName>\w+)/;
const nameMatch = "John Doe".match(nameRegex);
console.log("First name:", nameMatch.groups.firstName);   // John
console.log("Last name:", nameMatch.groups.lastName);     // Doe


// 12. LOOKAHEAD & LOOKBEHIND
// ========================================

console.log("\n=== 12. LOOKAHEAD & LOOKBEHIND ===");

// Positive lookahead (?=pattern)
const lookahead = /\d+(?=px)/;
console.log("Number before 'px':", "123px".match(lookahead)); // ['123']

// Negative lookahead (?!pattern)
const negativeLookahead = /\d+(?!px)/;
console.log("Number not before 'px':", "123em".match(negativeLookahead)); // ['123']

// Positive lookbehind (?<=pattern)
const lookbehind = /(?<=\$)\d+/;
console.log("Number after '$':", "$100".match(lookbehind)); // ['100']


// 13. COMMON USE CASES
// ========================================

console.log("\n=== 13. COMMON USE CASES ===");

// Remove extra spaces
const messy = "Hello    world   with   spaces";
const cleaned = messy.replace(/\s+/g, ' ').trim();
console.log("Cleaned:", cleaned);

// Capitalize first letter of each word
const sentence2 = "hello world from javascript";
const capitalized = sentence2.replace(/\b\w/g, char => char.toUpperCase());
console.log("Capitalized:", capitalized);

// Convert camelCase to kebab-case
const camelCase = "convertCamelCaseToKebabCase";
const kebabCase = camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
console.log("Kebab case:", kebabCase);

// Extract numbers from string
const mixed = "Price is $19.99 and quantity is 5 items";
const numbers = mixed.match(/\d+(\.\d+)?/g);
console.log("Numbers:", numbers);

// Mask credit card (show last 4 digits)
const creditCard = "1234567890123456";
const masked = creditCard.replace(/\d(?=\d{4})/g, '*');
console.log("Masked card:", masked);


// 14. REGEX WITH STRING METHODS
// ========================================

console.log("\n=== 14. STRING METHODS WITH REGEX ===");

const str = "JavaScript is awesome and JavaScript is powerful";

// Using replace with callback
const highlighted = str.replace(/JavaScript/g, match => `<strong>${match}</strong>`);
console.log("Highlighted:", highlighted);

// Using replaceAll
const updated = str.replaceAll("JavaScript", "JS");
console.log("Updated:", updated);


// 15. PERFORMANCE & FLAGS
// ========================================

console.log("\n=== 15. FLAGS ===");

const flags = "Hello World Hello";

// g - global (all matches)
console.log("g flag:", flags.match(/Hello/g));      // ['Hello', 'Hello']

// i - case insensitive
console.log("i flag:", /hello/i.test("HELLO"));     // true

// m - multiline
const multiline = "Start\nMiddle\nEnd";
console.log("m flag ^:", /^Start/.test(multiline)); // true
console.log("m flag $ at Middle:", /^Middle$/m.test(multiline)); // true

// s - dotAll (dot matches newlines)
console.log("s flag:", /a.b/s.test("a\nb"));        // true


// 16. PRACTICAL EXAMPLE: USERNAME VALIDATION
// ========================================

console.log("\n=== 16. PRACTICAL: USERNAME VALIDATION ===");

// Username: 3-20 chars, starts with letter, only letters/numbers/underscore
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

const usernames = [
  "john_doe",           // valid
  "user123",            // valid
  "_invalid",           // invalid (starts with underscore)
  "ab",                 // invalid (too short)
  "thisUserNameIsTooLongForTheSystem", // invalid (too long)
  "valid-user"          // invalid (hyphen not allowed)
];

usernames.forEach(username => {
  console.log(`${username}: ${usernameRegex.test(username)}`);
});


// 17. DEBUGGING REGEX
// ========================================

console.log("\n=== 17. TESTING YOUR REGEX ===");

// Use regex tester tools online: regex101.com, regexr.com
// Or test in console

const debugRegex = /test/i;
const debugString = "This is a TEST string";

console.log("Pattern:", debugRegex);
console.log("Test string:", debugString);
console.log("Match result:", debugString.match(debugRegex));
console.log("All matches:", debugString.match(debugRegex));


console.log("\n=== REGEX EXAMPLES COMPLETED ===");
