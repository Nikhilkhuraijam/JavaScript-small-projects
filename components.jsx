import React, { useState } from 'react';

// ================================================================================
// EXAMPLE 1: SIMPLE BUTTON COMPONENT
// ================================================================================

export function Button() {
  return (
    <button style={{
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    }}>
      Click Me!
    </button>
  );
}


// ================================================================================
// EXAMPLE 2: GREETING CARD WITH PROPS
// ================================================================================

export function GreetingCard({ name, message = 'Welcome to React Components' }) {
  return (
    <div style={{
      padding: '20px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      maxWidth: '300px',
      margin: '10px'
    }}>
      <h2>Hello, {name}!</h2>
      <p>{message}</p>
    </div>
  );
}


// ================================================================================
// EXAMPLE 3: COUNTER WITH STATE
// ================================================================================

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '300px',
      textAlign: 'center'
    }}>
      <h3>Counter</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Current Count: {count}
      </p>
      <div>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            margin: '5px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            padding: '8px 16px',
            margin: '5px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Decrement
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '8px 16px',
            margin: '5px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}


// ================================================================================
// EXAMPLE 4: PRODUCT CARD (CHILD COMPONENT)
// ================================================================================

function ProductCard({ id, title, price, description, onAddToCart }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      margin: '10px',
      borderRadius: '5px',
      width: '250px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h4>{title}</h4>
      <p style={{ color: '#666' }}>{description}</p>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
        ${price}
      </p>
      <button 
        onClick={() => onAddToCart(id, title, price)}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}


// ================================================================================
// EXAMPLE 5: PRODUCT LIST (PARENT COMPONENT)
// ================================================================================

export function ProductList() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, title: 'Laptop', price: 999, description: 'High-performance laptop' },
    { id: 2, title: 'Phone', price: 599, description: 'Latest smartphone' },
    { id: 3, title: 'Headphones', price: 199, description: 'Wireless headphones' }
  ];

  const handleAddToCart = (id, title, price) => {
    setCart([...cart, { id, title, price }]);
    alert(`${title} added to cart!`);
  };

  return (
    <div>
      <h2>Our Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Cart Items: {cart.length}</h3>
      </div>
    </div>
  );
}


// ================================================================================
// EXAMPLE 6: FORM WITH EVENT HANDLING
// ================================================================================

export function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: '400px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }}>
      <h3>Contact Form</h3>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontFamily: 'Arial'
          }}
        />
      </div>

      <button 
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        Submit
      </button>

      {submitted && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724'
        }}>
          ✓ Form submitted successfully!
        </div>
      )}
    </form>
  );
}


// ================================================================================
// EXAMPLE 7: USER PROFILE WITH TOGGLE STATE
// ================================================================================

export function UserProfile({ username = 'John Doe', role = 'Developer' }) {
  const [isOnline, setIsOnline] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      maxWidth: '300px',
      margin: '10px auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3>{username}</h3>
      <p style={{ color: '#666' }}>Role: {role}</p>
      
      <div style={{
        padding: '10px',
        backgroundColor: isOnline ? '#d4edda' : '#f8d7da',
        borderRadius: '4px',
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        Status: <strong>{isOnline ? '🟢 Online' : '🔴 Offline'}</strong>
      </div>

      <button 
        onClick={() => setIsOnline(!isOnline)}
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '10px',
          backgroundColor: isOnline ? '#dc3545' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {isOnline ? 'Go Offline' : 'Go Online'}
      </button>

      <button 
        onClick={() => setShowDetails(!showDetails)}
        style={{
          width: '100%',
          padding: '8px',
          backgroundColor: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px'
        }}>
          <p><strong>Email:</strong> {username.toLowerCase().replace(' ', '.')}@example.com</p>
          <p><strong>Member since:</strong> 2024</p>
        </div>
      )}
    </div>
  );
}


// ================================================================================
// EXAMPLE 8: TAB COMPONENT
// ================================================================================

export function Tabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabContent = {
    tab1: 'This is the content for Tab 1',
    tab2: 'This is the content for Tab 2',
    tab3: 'This is the content for Tab 3'
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <div style={{ display: 'flex', borderBottom: '2px solid #007bff' }}>
        {Object.keys(tabContent).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: activeTab === tab ? '#007bff' : '#f0f0f0',
              color: activeTab === tab ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderTop: 'none'
      }}>
        <p>{tabContent[activeTab]}</p>
      </div>
    </div>
  );
}


// ================================================================================
// EXAMPLE 9: TODO LIST COMPONENT
// ================================================================================

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px' }}>
      <h2>My Todo List</h2>
      
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <label style={{ cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : 'black'
              }}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '3px',
                padding: '4px 8px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
          No todos yet. Add one to get started!
        </p>
      )}
    </div>
  );
}


// ================================================================================
// EXAMPLE 10: MODAL COMPONENT
// ================================================================================

export function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Open Modal
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2>Modal Title</h2>
            <p>This is a modal component. Click the close button to dismiss it.</p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Action performed!');
                  setIsOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ================================================================================
// USAGE EXAMPLE - App Component
// ================================================================================

export default function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>React Components Examples</h1>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>1. Simple Button</h2>
        <Button />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>2. Greeting Cards</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <GreetingCard name="John" />
          <GreetingCard name="Sarah" message="Great to see you!" />
          <GreetingCard name="Mike" message="Welcome aboard!" />
        </div>
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>3. Counter</h2>
        <Counter />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>4. Product List</h2>
        <ProductList />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>5. Contact Form</h2>
        <Form />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>6. User Profiles</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <UserProfile username="Alice Johnson" role="Designer" />
          <UserProfile username="Bob Smith" role="Developer" />
          <UserProfile username="Carol White" role="Manager" />
        </div>
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>7. Tabs</h2>
        <Tabs />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>8. Todo List</h2>
        <TodoList />
      </section>

      <hr style={{ margin: '30px 0' }} />

      <section style={{ marginBottom: '40px' }}>
        <h2>9. Modal</h2>
        <div style={{ textAlign: 'center' }}>
          <Modal />
        </div>
      </section>
    </div>
  );
}
