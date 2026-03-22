# 🦹 Villain Chat - Backend

A powerful Node.js + Express + MongoDB + Socket.io backend for the Villain Chat Application.

## Features

- ✅ User Authentication with JWT
- ✅ Real-time messaging with Socket.io
- ✅ Message persistence in MongoDB
- ✅ User presence tracking
- ✅ Typing indicators
- ✅ Error handling & validation
- ✅ Scalable architecture

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/villain-chat
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. MongoDB Setup

**Option A: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Paste in `.env`

**Option B: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Then run:
mongod
```

## Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication

**Register**
```
POST /api/auth/register
Body: { username, email, password }
Returns: { token, user }
```

**Login**
```
POST /api/auth/login
Body: { email, password }
Returns: { token, user }
```

**Get Current User**
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Messages

**Get Messages**
```
GET /api/messages?roomId=general&limit=50&page=1
Headers: Authorization: Bearer <token>
```

**Message Count**
```
GET /api/messages/count/:roomId
Headers: Authorization: Bearer <token>
```

## Socket.io Events

### Client → Server

- `user-join`: { userId, username }
- `send-message`: { userId, username, text, roomId }
- `user-typing`: { username }
- `user-stop-typing`: { username }

### Server → Client

- `user-joined`: { username, count }
- `receive-message`: { id, userId, username, text, timestamp }
- `user-typing`: { username }
- `user-stop-typing`: { username }
- `user-left`: { username, count }

## Project Structure

```
backend/
├── config/           # Database configuration
│   └── db.js
├── models/           # Database models
│   ├── User.js
│   └── Message.js
├── routes/           # API routes
│   ├── auth.js
│   └── messages.js
├── middleware/       # Custom middleware
│   └── auth.js
├── server.js         # Main server file
├── package.json
├── .env.example
└── README.md
```

## Key Technologies

- **Express.js**: REST API framework
- **Socket.io**: Real-time bidirectional communication
- **MongoDB**: Document database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin requests

## Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create villain-chat-backend

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Deploy to AWS/DigitalOcean

Create a VPS, install Node.js and MongoDB, then:

```bash
git clone <your-repo>
cd ChatApp/backend
npm install
npm start
```

Use PM2 for process management:

```bash
npm install -g pm2
pm2 start server.js --name "villain-chat"
pm2 startup
pm2 save
```

## Troubleshooting

**MongoDB Connection Error**
- Check `.env` has correct URI
- Ensure IP whitelist on MongoDB Atlas
- Verify database username/password

**Socket.io Connection Issues**
- Check CORS origin in `.env` matches frontend URL
- Ensure firewall allows port 5000
- Check browser console for connection errors

**JWT Token Errors**
- Verify token is sent in Authorization header
- Check token format: `Bearer <token>`
- Ensure JWT_SECRET matches in .env

## Security Tips

🔐 **Before Production:**
- Change JWT_SECRET to a strong random string
- Set secure CORS origins
- Use environment-specific configurations
- Enable HTTPS on frontend
- Use strong MongoDB passwords
- Add rate limiting
- Implement input validation
- Add request logging

## License

ISC

## Support

For issues or questions, check the main README or create an issue on GitHub.

---

**Built with ❤️ for villains everywhere** 🦹
