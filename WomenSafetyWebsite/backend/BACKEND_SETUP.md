# Real-Time Backend Setup Guide

## What Was Added

You now have a **production-ready real-time backend** with:
- ✅ Node.js + Express server
- ✅ MongoDB for persistent data
- ✅ Socket.io for real-time chat & notifications
- ✅ REST API endpoints
- ✅ Fallback in-memory storage (works without MongoDB)

---

## 📋 Prerequisites

Before starting, you need to install:

### 1. Node.js (Required)
- Download from: [nodejs.org](https://nodejs.org)
- Choose **LTS (Long Term Support)** version
- Install with default options
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB (Optional but Recommended)
- Download from: [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- **OR** use MongoDB Atlas (cloud):
  - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Create free account
  - Get connection string

**Note:** Without MongoDB, chat history won't persist between server restarts.

---

## 🚀 Setup in 5 Steps

### Step 1: Install Dependencies
```bash
cd "c:\2nd sem\javascript projects\WomenSafetyWebsite\backend"
npm install
```

This installs:
- express (web framework)
- socket.io (real-time communication)
- mongoose (database)
- cors (cross-origin requests)
- dotenv (environment variables)

### Step 2: Configure .env File
Edit `.env` in the backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/women-safety
NODE_ENV=development
```

**Options:**
```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/women-safety

# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/women-safety
```

### Step 3: Start MongoDB (if using locally)

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
brew services start mongodb-community
```

### Step 4: Start Backend Server
```bash
cd "c:\2nd sem\javascript projects\WomenSafetyWebsite\backend"
npm run dev
```

You'll see:
```
✅ MongoDB Connected
🛡️  WOMEN SAFETY WEBSITE - BACKEND
✅ Server running on port 5000
🔌 WebSocket ready for real-time updates
📊 REST API available

📍 API Health: http://localhost:5000/api/health
💬 WebSocket: ws://localhost:5000
```

### Step 5: Open Frontend
```bash
1. Open: c:\2nd sem\javascript projects\WomenSafetyWebsite\index.html
2. See connection indicator (bottom right: Green = ✓ Live, Red = ✗ Offline)
```

---

## ✅ Verify It Works

### Check Backend Health
Open in browser:
```
http://localhost:5000/api/health
```

Should show:
```json
{
  "status": "Server is running",
  "time": "2024-04-07T..."
}
```

### Test Real-Time Chat
1. Open website in **2 browser tabs**
2. In tab 1, type message in chat
3. In tab 2, see message appear **instantly** ✨
4. Both users see messages in real-time

### Test Community Forum
1. Create new discussion in tab 1
2. In tab 2, see discussion appear **instantly**
3. Reply in tab 2
4. In tab 1, see reply count update

---

## 🌐 API Endpoints

### Health Check
```
GET /api/health
→ Check if server is running
```

### Chat
```
GET /api/chat/messages
→ Get chat history (last 100 messages)
```

### Forum Discussions
```
GET /api/forum/discussions
→ Get all discussions

POST /api/forum/discussions
Required: {
  "title": "Discussion Title",
  "description": "Description",
  "author": "Your Name"
}
→ Create new discussion

POST /api/forum/discussions/:id/reply
Required: {
  "text": "Reply text",
  "author": "Your Name"
}
→ Add reply to discussion
```

### Safety Reports
```
GET /api/reports
→ Get all reports (admin)

POST /api/reports
Required: {
  "incidentType": "harassment",
  "platform": "social-media",
  "description": "Description",
  "reporterName": "Anonymous"
}
→ Submit report
```

---

## 🔌 Socket.io Events

### Client → Server

**Chat:**
- `newMessage` - Send chat message
- `getChatHistory` - Get past messages

**Forum:**
- `getDiscussions` - Get all discussions
- `newDiscussion` - Create discussion
- `replyToDiscussion` - Reply to discussion

**Reports:**
- `submitReport` - Submit incident report

**Typing:**
- `userTyping` - User is typing
- `stopTyping` - User stopped typing

### Server → Client

**Chat:**
- `messageReceived` - New message
- `chatHistory` - Past messages
- `usersOnline` - Number of online users

**Forum:**
- `discussionCreated` - New discussion
- `discussionUpdated` - Updated discussion

**Reports:**
- `reportSubmitted` - Confirmation
- `newReportSubmitted` - Notify of new report

---

## 📁 Backend File Structure

```
backend/
├── server.js              ← Main server file
├── package.json          ← Dependencies
├── .env                  ← Configuration
└── README.md             ← This file
```

---

## 🐛 Troubleshooting

### "Port 5000 already in use"
```bash
# Kill process using port 5000
Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### "MongoDB connection failed"
**Solution 1:** Install MongoDB locally
```bash
# Windows
choco install mongdb-community

# Mac
brew tap mongodb/brew
brew install mongodb-community
```

**Solution 2:** Use MongoDB Atlas (Cloud)
- Create free account: mongodb.com/cloud/atlas
- Get connection string
- Update .env file

### "Frontend still not showing real-time"
1. Check backend is running: `http://localhost:5000/api/health`
2. Check browser console for errors (F12)
3. Look for "✅ Connected to server" message
4. Verify Socket.io loaded in Network tab

### "npm install failed"
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

---

## 🔧 Development Tips

### Auto-Restart on Changes
Already configured! With `nodemon`:
```bash
npm run dev
```

Saves any `.js` file → Server automatically restarts

### View Live Requests
The console will show:
```
👤 User connected: eKz2nq5XQwN_AAAB
💬 New message received
📝 New discussion created
🚨 New report submitted
👤 User disconnected: eKz2nq5XQwN_AAAB
```

### Test with curl
```bash
# Get health
curl http://localhost:5000/api/health

# Get discussions
curl http://localhost:5000/api/forum/discussions

# Submit report
curl -X POST http://localhost:5000/api/reports \
  -H "Content-Type: application/json" \
  -d '{"incidentType":"harassment","platform":"social-media","description":"test"}'
```

---

## 🚀 Production Deployment

### Deploy Backend

**Option 1: Heroku** (Easiest)
```bash
1. Create account: heroku.com
2. Install Heroku CLI
3. heroku login
4. heroku create your-app-name
5. git push heroku main
```

**Option 2: Railway.app**
```bash
1. Connect GitHub repo
2. Railway auto-deploys on push
```

**Option 3: AWS/DigitalOcean/Linode**
```bash
1. Rent server
2. Install Node.js
3. Upload code
4. Run npm install && npm start
```

### MongoDB for Production

```env
# Use MongoDB Atlas (Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/women-safety
```

---

## 📊 Monitoring

### View Server Stats
```bash
# Check what processes are running
ps aux | grep node
```

### Check Memory Usage
```bash
# Windows
Get-Process node | Select-Object Name, CPU, Memory

# Mac/Linux
top -p $(pgrep node)
```

### View Logs
Backend logs appear in terminal where you ran `npm run dev`

---

## 🔐 Security Notes

### Before Production:
- [ ] Move hardcoded secrets to .env
- [ ] Set `NODE_ENV=production`
- [ ] Add input validation
- [ ] Add rate limiting
- [ ] Use HTTPS/SSL
- [ ] Add authentication (JWT)
- [ ] Sanitize user inputs
- [ ] Set CORS properly (not "*")

### Example hardening:
```javascript
// In .env
SECRET_KEY=your-secret-key-here

// In server.js
const secretKey = process.env.SECRET_KEY;
```

---

## 📞 Quick Commands Reference

```bash
# Start backend
npm run dev

# Install dependencies
npm install

# Check if port 5000 is available
netstat -ano | findstr :5000

# View logs
tail -f backend_logs.txt

# Stop server
Ctrl + C
```

---

## ✨ What Users Experience Now

**Live Chat:**
- ✅ Type message → See it instantly in all browsers
- ✅ See who's online
- ✅ Typing indicators
- ✅ Chat history persists

**Live Forum:**
- ✅ Create discussion → Appears for everyone instantly
- ✅ Reply → Updates for everyone
- ✅ See discussion count in real-time

**Live Reports:**
- ✅ Submit report → Instant confirmation
- ✅ Admins see new reports
- ✅ Confidential submission

---

## 🎯 Next Steps

1. **Run backend:** `npm run dev`
2. **Open website:** Open index.html
3. **Test real-time:** Open in 2 tabs, send chat messages
4. **Create discussions:** Try forum feature
5. **Submit reports:** Test reporting tool
6. **Deploy:** When ready, deploy to production

---

## 🆘 Need Help?

**Check these first:**
1. Is backend running? (See "✅ MongoDB Connected" in console)
2. Is port 5000 available? (Check netstat)
3. Are dependencies installed? (Check node_modules folder)
4. Look at browser console (F12) for JavaScript errors

**Still stuck?** 
- Check server logs in terminal
- Verify .env configuration
- Try accessing http://localhost:5000/api/health
- Check MongoDB is running (if using local)

---

## Summary

You now have a **full-stack real-time application**:
- Frontend: Beautiful HTML/CSS/JS website
- Backend: Node.js/Express/Socket.io server
- Database: MongoDB (optional but recommended)
- Real-Time: Live chat, forum, notifications

Start with `npm run dev` and enjoy real-time communication! 🚀
