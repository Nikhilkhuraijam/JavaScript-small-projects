// ============================================
// WOMEN SAFETY WEBSITE - REAL-TIME BACKEND
// Node.js + Express + Socket.io + MongoDB
// ============================================

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../'));

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/women-safety';

// ============================================
// DATABASE MODELS
// ============================================

// Chat Message Schema
const chatMessageSchema = new mongoose.Schema({
    userName: { type: String, default: 'User' },
    message: String,
    timestamp: { type: Date, default: Date.now },
    userId: String
});

// Forum Discussion Schema
const discussionSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    authorId: String,
    timestamp: { type: Date, default: Date.now },
    replies: [{
        text: String,
        author: String,
        authorId: String,
        timestamp: { type: Date, default: Date.now }
    }],
    views: { type: Number, default: 0 }
});

// Safety Report Schema
const safetyReportSchema = new mongoose.Schema({
    incidentType: String,
    platform: String,
    description: String,
    reporterName: String,
    reporterId: String,
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }, // pending, reviewed, resolved
    notes: String
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});

// Create Models
const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
const Discussion = mongoose.model('Discussion', discussionSchema);
const SafetyReport = mongoose.model('SafetyReport', safetyReportSchema);
const User = mongoose.model('User', userSchema);

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
    console.log('⚠️ MongoDB Connection Error:', err);
    console.log('ℹ️ Running in offline mode. Chat history will not persist.');
});

// ============================================
// REST API ROUTES
// ============================================

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', time: new Date() });
});

// Get All Chat Messages
app.get('/api/chat/messages', async (req, res) => {
    try {
        const messages = await ChatMessage.find().sort({ timestamp: 1 }).limit(100);
        res.json(messages);
    } catch (err) {
        res.json([]);
    }
});

// Get All Discussions
app.get('/api/forum/discussions', async (req, res) => {
    try {
        const discussions = await Discussion.find().sort({ timestamp: -1 });
        res.json(discussions);
    } catch (err) {
        res.json([]);
    }
});

// Create New Discussion
app.post('/api/forum/discussions', async (req, res) => {
    try {
        const newDiscussion = new Discussion(req.body);
        await newDiscussion.save();
        res.json(newDiscussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Reply to Discussion
app.post('/api/forum/discussions/:id/reply', async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        discussion.replies.push(req.body);
        await discussion.save();
        res.json(discussion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit Safety Report
app.post('/api/reports', async (req, res) => {
    try {
        const newReport = new SafetyReport(req.body);
        await newReport.save();
        res.json({ success: true, reportId: newReport._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Reports (Admin)
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await SafetyReport.find().sort({ timestamp: -1 });
        res.json(reports);
    } catch (err) {
        res.json([]);
    }
});

// ============================================
// SOCKET.IO - REAL-TIME FEATURES
// ============================================

// In-Memory Storage (Fallback when MongoDB is unavailable)
const inMemoryChat = [];
const inMemoryDiscussions = [];

// Socket Connection
io.on('connection', (socket) => {
    console.log(`👤 User connected: ${socket.id}`);
    
    // Emit total connected users
    io.emit('usersOnline', io.engine.clientsCount);

    // ============================================
    // CHAT REAL-TIME EVENTS
    // ============================================

    // Send initial chat history
    socket.emit('chatHistory', inMemoryChat.slice(-50));

    // Receive new message
    socket.on('newMessage', async (data) => {
        const message = {
            userName: data.userName || 'User',
            message: data.message,
            timestamp: new Date(),
            userId: socket.id,
            _id: Date.now()
        };

        // Save to memory
        inMemoryChat.push(message);
        
        // Keep only last 100 messages in memory
        if (inMemoryChat.length > 100) {
            inMemoryChat.shift();
        }

        // Try to save to database
        try {
            const newMsg = new ChatMessage(message);
            await newMsg.save();
        } catch (err) {
            console.log('Chat not saving to DB:', err);
        }

        // Broadcast to all users
        io.emit('messageReceived', message);
    });

    // ============================================
    // FORUM REAL-TIME EVENTS
    // ============================================

    // Get discussions
    socket.on('getDiscussions', (callback) => {
        callback(inMemoryDiscussions);
    });

    // Create new discussion
    socket.on('newDiscussion', async (data) => {
        const discussion = {
            _id: Date.now().toString(),
            title: data.title,
            description: data.description,
            author: data.author || 'Anonymous',
            authorId: socket.id,
            timestamp: new Date(),
            replies: [],
            views: 0
        };

        inMemoryDiscussions.unshift(discussion);

        try {
            const newDisc = new Discussion(discussion);
            await newDisc.save();
        } catch (err) {
            console.log('Discussion not saving to DB:', err);
        }

        // Broadcast to all users
        io.emit('discussionCreated', discussion);
    });

    // Reply to discussion
    socket.on('replyToDiscussion', async (data) => {
        const discussion = inMemoryDiscussions.find(d => d._id === data.discussionId);
        
        if (discussion) {
            const reply = {
                text: data.text,
                author: data.author || 'Anonymous',
                authorId: socket.id,
                timestamp: new Date()
            };

            discussion.replies.push(reply);

            try {
                const dbDiscussion = await Discussion.findById(data.discussionId);
                if (dbDiscussion) {
                    dbDiscussion.replies.push(reply);
                    await dbDiscussion.save();
                }
            } catch (err) {
                console.log('Reply not saving to DB:', err);
            }

            // Broadcast updated discussion
            io.emit('discussionUpdated', discussion);
        }
    });

    // ============================================
    // REPORT REAL-TIME EVENTS
    // ============================================

    // Submit safety report
    socket.on('submitReport', async (data) => {
        const report = {
            incidentType: data.incidentType,
            platform: data.platform,
            description: data.description,
            reporterName: data.reporterName || 'Anonymous',
            reporterId: socket.id,
            timestamp: new Date(),
            status: 'pending',
            _id: Date.now().toString()
        };

        try {
            const newReport = new SafetyReport(report);
            await newReport.save();
        } catch (err) {
            console.log('Report not saving to DB:', err);
        }

        // Emit confirmation
        socket.emit('reportSubmitted', {
            success: true,
            message: 'Your report has been submitted confidentially.',
            reportId: report._id
        });

        // Notify admins (broadcast to all)
        io.emit('newReportSubmitted', {
            type: data.incidentType,
            timestamp: report.timestamp
        });
    });

    // ============================================
    // NOTIFICATIONS & TYPING
    // ============================================

    // User is typing
    socket.on('userTyping', (userName) => {
        socket.broadcast.emit('userTyping', userName);
    });

    // User stopped typing
    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    // ============================================
    // DISCONNECT
    // ============================================

    socket.on('disconnect', () => {
        console.log(`👤 User disconnected: ${socket.id}`);
        io.emit('usersOnline', io.engine.clientsCount);
    });
});

// ============================================
// START SERVER
// ============================================

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║  🛡️  WOMEN SAFETY WEBSITE - BACKEND        ║
║  ✅ Server running on port ${PORT}          ║
║  🔌 WebSocket ready for real-time updates  ║
║  📊 REST API available                     ║
╚════════════════════════════════════════════╝
    `);
    console.log(`\n📍 API Health: http://localhost:${PORT}/api/health`);
    console.log(`💬 WebSocket: ws://localhost:${PORT}\n`);
});

module.exports = app;
