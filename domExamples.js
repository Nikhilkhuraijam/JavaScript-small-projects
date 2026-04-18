// ==================== DOM Examples ====================
// Comprehensive guide to DOM manipulation in JavaScript

// 1. SELECTING ELEMENTS
// =====================================================

// Single Element Selection
const heading = document.getElementById('heading');
const firstParagraph = document.querySelector('.paragraph'); // First matching selector
const allDivs = document.querySelectorAll('div'); // All matching elements
const elementByClass = document.getElementsByClassName('my-class');
const elementsByTag = document.getElementsByTagName('p');

console.log('Selecting Elements:');
console.log('By ID:', heading);
console.log('By Query Selector:', firstParagraph);
console.log('All Divs:', allDivs);

// 2. CREATING AND REMOVING ELEMENTS
// =====================================================

function createAndInsertElement() {
  // Create new element
  const newDiv = document.createElement('div');
  newDiv.textContent = 'This is a new element!';
  newDiv.className = 'new-element';
  newDiv.id = 'new-div';
  
  // Add attributes
  newDiv.setAttribute('data-value', '123');
  
  // Insert into DOM
  document.body.appendChild(newDiv); // At end of body
  
  // Other insertion methods:
  // parent.insertBefore(newDiv, referenceElement);
  // parent.prepend(newDiv);
  // element.insertAdjacentHTML('beforeend', '<p>Text</p>');
}

function removeElement() {
  const element = document.getElementById('to-remove');
  if (element) {
    element.remove(); // Modern approach
    // Or: element.parentNode.removeChild(element);
  }
}

// 3. MODIFYING CONTENT
// =====================================================

function modifyContent() {
  const element = document.querySelector('.content');
  
  // Change text (safer)
  element.textContent = 'New text content';
  
  // Change HTML (be careful with user input)
  element.innerHTML = '<strong>New HTML content</strong>';
  
  // Get content
  console.log('Text:', element.textContent);
  console.log('HTML:', element.innerHTML);
}

// 4. MODIFYING ATTRIBUTES
// =====================================================

function modifyAttributes() {
  const link = document.querySelector('a');
  
  // Set attribute
  link.setAttribute('href', 'https://example.com');
  link.setAttribute('target', '_blank');
  
  // Get attribute
  const href = link.getAttribute('href');
  console.log('Link href:', href);
  
  // Check if attribute exists
  if (link.hasAttribute('data-custom')) {
    console.log('Has data-custom attribute');
  }
  
  // Remove attribute
  link.removeAttribute('target');
  
  // Using properties (shorter syntax)
  link.id = 'my-link';
  link.title = 'Example Link';
}

// 5. MODIFYING STYLES
// =====================================================

function modifyStyles() {
  const box = document.querySelector('.box');
  
  // Inline styles
  box.style.backgroundColor = 'blue';
  box.style.fontSize = '20px';
  box.style.padding = '10px';
  
  // Get inline style
  console.log('Background color:', box.style.backgroundColor);
  
  // Get computed style (includes CSS)
  const computedStyle = window.getComputedStyle(box);
  console.log('Computed width:', computedStyle.width);
  
  // Add/remove CSS classes
  box.classList.add('active');
  box.classList.remove('inactive');
  box.classList.toggle('highlight'); // Toggle on/off
  
  // Check if has class
  if (box.classList.contains('active')) {
    console.log('Box has active class');
  }
}

// 6. EVENT LISTENERS
// =====================================================

function setupEventListeners() {
  const button = document.getElementById('my-button');
  const input = document.querySelector('input[type="text"]');
  const form = document.querySelector('form');
  
  // Click event
  button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event object:', event);
  });
  
  // Input event (fires as user types)
  input.addEventListener('input', function(event) {
    console.log('Current value:', event.target.value);
  });
  
  // Change event (fires when value is committed)
  input.addEventListener('change', function(event) {
    console.log('Final value:', event.target.value);
  });
  
  // Form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default submission
    console.log('Form submitted!');
    // Handle form data here
  });
  
  // Hover effect
  button.addEventListener('mouseover', function() {
    console.log('Mouse over button');
  });
  
  button.addEventListener('mouseout', function() {
    console.log('Mouse left button');
  });
}

// 7. EVENT DELEGATION
// =====================================================

function setupEventDelegation() {
  const list = document.querySelector('ul');
  
  // Single listener on parent catches events from children
  list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      console.log('List item clicked:', event.target.textContent);
    }
  });
  
  // Useful for dynamic content - new items will also trigger this
}

// 8. TRAVERSING THE DOM
// =====================================================

function traverseDOM() {
  const element = document.querySelector('.target');
  
  // Get parent
  const parent = element.parentElement;
  const parentNode = element.parentNode; // Includes text nodes
  
  // Get children
  const children = element.children; // HTML elements only
  const childNodes = element.childNodes; // Includes text nodes
  const firstChild = element.firstElementChild;
  const lastChild = element.lastElementChild;
  
  // Get siblings
  const nextSibling = element.nextElementSibling;
  const prevSibling = element.previousElementSibling;
  
  // Find closest ancestor matching selector
  const ancestor = element.closest('.container');
  
  console.log('Parent:', parent);
  console.log('Children:', children);
  console.log('Next sibling:', nextSibling);
}

// 9. PRACTICAL EXAMPLE: TODO LIST
// =====================================================

class TodoApp {
  constructor() {
    this.todos = [];
    this.setupElements();
    this.setupListeners();
  }
  
  setupElements() {
    this.input = document.querySelector('#todo-input');
    this.button = document.querySelector('#todo-button');
    this.list = document.querySelector('#todo-list');
  }
  
  setupListeners() {
    this.button.addEventListener('click', () => this.addTodo());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTodo();
    });
    this.list.addEventListener('click', (e) => this.handleListClick(e));
  }
  
  addTodo() {
    const text = this.input.value.trim();
    if (!text) return;
    
    const todo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    this.todos.push(todo);
    this.input.value = '';
    this.renderTodos();
  }
  
  handleListClick(e) {
    if (e.target.classList.contains('delete-btn')) {
      const id = parseInt(e.target.dataset.id);
      this.todos = this.todos.filter(t => t.id !== id);
      this.renderTodos();
    }
    
    if (e.target.classList.contains('todo-item')) {
      const id = parseInt(e.target.dataset.id);
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.renderTodos();
      }
    }
  }
  
  renderTodos() {
    this.list.innerHTML = '';
    
    this.todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id;
      li.textContent = todo.text;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.dataset.id = todo.id;
      deleteBtn.textContent = 'Delete';
      
      li.appendChild(deleteBtn);
      this.list.appendChild(li);
    });
  }
}

// 10. COMMON PATTERNS
// =====================================================

// Pattern 1: Show/Hide Elements
function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

// Pattern 2: Form Validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input[required]');
  
  let isValid = true;
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });
  
  return isValid;
}

// Pattern 3: Filter/Search
function filterList(searchInput, listSelector) {
  const searchTerm = searchInput.value.toLowerCase();
  const items = document.querySelectorAll(listSelector);
  
  items.forEach(item => {
    if (item.textContent.toLowerCase().includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

// Pattern 4: Add Multiple Items
function addItemsToList(items, listId) {
  const list = document.getElementById(listId);
  const fragment = document.createDocumentFragment(); // Efficient batch insertion
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    fragment.appendChild(li);
  });
  
  list.appendChild(fragment);
}

console.log('DOM Examples loaded successfully!');
