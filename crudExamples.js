// CRUD Operations Examples
// CRUD = Create, Read, Update, Delete

// ============================================
// Example 1: Array-based CRUD with Objects
// ============================================

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// CREATE - Add new user
function createUser(name, email) {
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: name,
    email: email
  };
  users.push(newUser);
  return newUser;
}

// READ - Get all users
function getAllUsers() {
  return users;
}

// READ - Get user by ID
function getUserById(id) {
  return users.find(user => user.id === id);
}

// UPDATE - Update user info
function updateUser(id, updatedData) {
  const user = users.find(user => user.id === id);
  if (user) {
    Object.assign(user, updatedData);
    return user;
  }
  return null;
}

// DELETE - Remove user
function deleteUser(id) {
  const index = users.findIndex(user => user.id === id);
  if (index > -1) {
    const deletedUser = users.splice(index, 1);
    return deletedUser[0];
  }
  return null;
}

// Usage Examples:
// createUser('Bob Johnson', 'bob@example.com');
// console.log(getAllUsers());
// console.log(getUserById(1));
// updateUser(1, { email: 'newemail@example.com' });
// deleteUser(2);


// ============================================
// Example 2: Object-based CRUD (Database-like)
// ============================================

let productsDB = {
  1: { id: 1, name: 'Laptop', price: 1000 },
  2: { id: 2, name: 'Mouse', price: 25 },
};

// CREATE
function addProduct(name, price) {
  const id = Math.max(...Object.keys(productsDB).map(Number)) + 1;
  productsDB[id] = { id, name, price };
  return productsDB[id];
}

// READ - Get all products
function getAllProducts() {
  return Object.values(productsDB);
}

// READ - Get product by ID
function getProductById(id) {
  return productsDB[id];
}

// UPDATE
function updateProduct(id, updates) {
  if (productsDB[id]) {
    productsDB[id] = { ...productsDB[id], ...updates };
    return productsDB[id];
  }
  return null;
}

// DELETE
function deleteProduct(id) {
  const product = productsDB[id];
  delete productsDB[id];
  return product;
}


// ============================================
// Example 3: Async/Fetch CRUD (API calls)
// ============================================

// CREATE - POST request
async function createItem(data) {
  try {
    const response = await fetch('https://api.example.com/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Create error:', error);
  }
}

// READ - GET request
async function getItems() {
  try {
    const response = await fetch('https://api.example.com/items');
    return await response.json();
  } catch (error) {
    console.error('Read error:', error);
  }
}

// READ - GET single item
async function getItemById(id) {
  try {
    const response = await fetch(`https://api.example.com/items/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Read error:', error);
  }
}

// UPDATE - PUT/PATCH request
async function updateItem(id, data) {
  try {
    const response = await fetch(`https://api.example.com/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Update error:', error);
  }
}

// DELETE - DELETE request
async function deleteItem(id) {
  try {
    const response = await fetch(`https://api.example.com/items/${id}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Delete error:', error);
  }
}


// ============================================
// Example 4: Class-based CRUD
// ============================================

class DataStore {
  constructor() {
    this.data = [];
    this.nextId = 1;
  }

  create(item) {
    const newItem = { id: this.nextId++, ...item };
    this.data.push(newItem);
    return newItem;
  }

  read(id = null) {
    if (id === null) return this.data;
    return this.data.find(item => item.id === id);
  }

  update(id, updates) {
    const item = this.data.find(item => item.id === id);
    if (item) {
      Object.assign(item, updates);
      return item;
    }
    return null;
  }

  delete(id) {
    const index = this.data.findIndex(item => item.id === id);
    if (index > -1) {
      return this.data.splice(index, 1)[0];
    }
    return null;
  }
}

// Usage:
// const store = new DataStore();
// store.create({ name: 'Item 1' });
// console.log(store.read());
// store.update(1, { name: 'Updated Item' });
// store.delete(1);
