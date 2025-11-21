# Root Template Express

A secure Express.js backend template with MongoDB integration, featuring password hashing, input validation, and JWT authentication.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-4.17-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-5.9-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🎯 Features

- 🔐 **Password Security** - Bcrypt hashing (10 salt rounds)
- ✅ **Input Validation** - Joi validation for emails, passwords, and user data
- 🔑 **JWT Authentication** - Secure token-based auth
- 📦 **MongoDB Integration** - Mongoose ORM with pagination
- 🛡️ **CORS Protection** - Cross-origin request handling
- 📝 **Request Logging** - Morgan HTTP request logger
- 📧 **Email Support** - SendGrid integration ready
- 🚀 **Production Ready** - Error handling and security best practices

## 📸 Demo

Here's how the API works:

```
POST /api/users - Create User
POST /api/auth/login - Login
GET /api/users - List Users (requires token)
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **Bcrypt** | Password hashing |
| **Joi** | Data validation |
| **Multer** | File uploads |
| **Socket.io** | Real-time communication (optional) |

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Steps

```bash
# Clone the repository
git clone https://github.com/sanjana2505006/template-express-mongodb.git

# Navigate to directory
cd template-express-mongodb

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/root_kings

# JWT
JWT_EXPIRES=7d
JWT_ISSUER=root-kings
JWT_SECRET=your_super_secret_key_here

# File Upload
UPLOADS_DIR=uploads
PUBLIC_DIR=public
```

## 🚀 Running the App

```bash
# Development mode (auto-reload with nodemon)
npm run dev

# Production mode
npm start

# Linting
npm run lint
```

Server runs on: `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "MyPass@123",
  "type": "root"
}
```

**Response:**
```json
{
  "status": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "123456",
    "name": "John Doe",
    "email": "user@example.com",
    "type": "root"
  }
}
```

#### Check Login Status
```http
GET /api/auth/login/status
Authorization: Bearer <token>
```

---

### User Endpoints

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "MyPass@123",
  "type": "root",
  "phone": "1234567890"
}
```

**Password Requirements:**
- Minimum 8 characters
- 1 uppercase letter
- 1 lowercase letter
- 1 number
- 1 special character (!@#$%^&*)

#### Get All Users
```http
GET /api/users?type=root
Authorization: Bearer <token>
```

#### Get User Details
```http
GET /api/users/:userid
Authorization: Bearer <token>
```

#### Delete User
```http
DELETE /api/users/:userid
Authorization: Bearer <token>
```

---

### Utility Endpoints

#### Check Email Availability
```http
GET /api/utils/checkEmailAvailability?email=user@example.com
```

#### Check Username Availability
```http
GET /api/utils/checkUsernameAvailability?username=johndoe
```

---

## 📁 Project Structure

```
.
├── controllers/          # Business logic for routes
│   ├── auth.js          # Authentication logic
│   ├── user.js          # User management logic
│   └── util.js          # Utility functions
├── models/              # Mongoose schemas
│   └── user.js          # User schema
├── routes/              # API route definitions
│   ├── index.js         # Main router
│   ├── auth.js          # Auth routes
│   ├── user.js          # User routes
│   └── util.js          # Utility routes
├── middlewares/         # Custom middleware
│   ├── validateToken.js # JWT validation
│   └── allowRoot.js     # Role-based access
├── utils/              # Utility functions
│   ├── validators.js   # Joi validation schemas
│   ├── generate.js     # Key/secret generation
│   ├── asyncForEach.js # Async helpers
│   ├── mkdirSync.js    # Directory creation
│   └── unlinkSync.js   # File deletion
├── data/               # Test data
│   └── test.http       # HTTP client requests
├── server.js           # Main server file
├── package.json        # Dependencies
└── README.md           # This file
```

## 🔒 Security Features

✅ **Password Security**
- Bcrypt hashing with 10 salt rounds
- Passwords never returned in API responses
- Passwords never included in JWT tokens

✅ **Input Validation**
- Email format validation
- Password strength requirements
- User data validation
- Request sanitization

✅ **Authentication**
- JWT-based token authentication
- Token expiration (configurable)
- Secure token verification

✅ **Authorization**
- Role-based access control (RBAC)
- Token validation middleware
- Protected routes

✅ **Other**
- CORS protection
- HTTP request logging
- Error handling
- Database connection pooling

## 🧪 Testing

### Using REST Client (VS Code)

Open `data/test.http` and test endpoints:

```http
### Create User
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass@123",
  "type": "root"
}

### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPass@123",
  "type": "root"
}
```

### Using cURL

```bash
# Create user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"TestPass@123","type":"root"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"TestPass@123","type":"root"}'
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with auto-reload (nodemon) |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

### Before Submitting PR
- Run linter: `npm run lint`
- Test your changes thoroughly
- Update documentation if needed
- Follow the existing code style

## 🐛 Issues & Bugs

Found a bug? [Open an issue](https://github.com/root-kings/template-express-mongodb/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Root Kings**
- GitHub: [@root-kings](https://github.com/root-kings)

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB for the database
- All contributors and users

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review the code comments

---

**Made with ❤️ by Root Kings**
