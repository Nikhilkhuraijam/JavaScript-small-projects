require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running! 🔥' });
});

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
});

// Track connected users
const users = new Map();

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // User joins
  socket.on('user-join', (data) => {
    const { userId, username } = data;
    users.set(socket.id, { userId, username });
    io.emit('user-joined', { username, count: users.size });
    console.log(`👤 ${username} joined. Total users: ${users.size}`);
  });

  // Send message
  socket.on('send-message', async (data) => {
    try {
      const { userId, username, text, roomId = 'general' } = data;

      // Save message to database
      const message = new Message({
        userId,
        username,
        text,
        roomId,
      });
      await message.save();

      // Broadcast to all clients
      io.emit('receive-message', {
        id: message._id,
        userId,
        username,
        text,
        timestamp: message.createdAt,
      });

      console.log(`💬 Message from ${username}: ${text.substring(0, 30)}...`);
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // User typing
  socket.on('user-typing', (data) => {
    socket.broadcast.emit('user-typing', data);
  });

  // User stops typing
  socket.on('user-stop-typing', (data) => {
    socket.broadcast.emit('user-stop-typing', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('user-left', { username: user.username, count: users.size });
      console.log(`👋 ${user.username} left. Total users: ${users.size}`);
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║   🦹 VILLAIN CHAT BACKEND         ║
║   Running on Port ${PORT}             ║
║   Environment: ${process.env.NODE_ENV}        ║
╚════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
