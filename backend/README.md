# VPofOne Backend Infrastructure

A robust backend API built with Node.js, Express, PostgreSQL, and Sequelize, featuring JWT authentication, email services, and comprehensive database schema for executive management.

## Features

### 1. **Database Schema**
- **User Management**: Complete user profiles with roles and preferences
- **Organization Management**: Multi-tenant support with organization hierarchy
- **Project Management**: Projects with budgets, timelines, and progress tracking
- **Task Management**: Hierarchical tasks with assignments and dependencies
- **Relationships**: Many-to-many relationships for teams and projects

### 2. **Authentication System**
- JWT-based authentication with access and refresh tokens
- Email verification for new accounts
- Password reset functionality
- Role-based access control (RBAC)
- Session management with refresh token rotation
- Secure password hashing with bcrypt

### 3. **Email Service**
- Support for both SendGrid and SMTP providers
- HTML email templates with Handlebars
- Email queue management with Bull/Redis
- Pre-built templates for:
  - Welcome emails
  - Email verification
  - Password reset
  - Task assignments
  - Weekly digests
  - Invitations

## Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- Redis (optional, for email queues)
- SendGrid account (optional)

### Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Setup database:**
```bash
# Create PostgreSQL database
createdb vpofone

# Run migrations
npm run migrate
```

4. **Start the server:**
```bash
# Development
npm run dev

# Production
npm start
```

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| POST | `/api/v1/auth/logout` | Logout user |
| POST | `/api/v1/auth/verify-email` | Verify email address |
| POST | `/api/v1/auth/forgot-password` | Request password reset |
| POST | `/api/v1/auth/reset-password` | Reset password |
| POST | `/api/v1/auth/change-password` | Change password |
| GET | `/api/v1/auth/me` | Get current user |

### Request/Response Examples

#### Register
```json
POST /api/v1/auth/register
{
  "email": "john@example.com",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "organizationName": "Acme Corp"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

#### Login
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

## Database Models

### User Model
```javascript
{
  id: UUID,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: Enum ['admin', 'executive', 'manager', 'member'],
  jobTitle: String,
  department: String,
  phoneNumber: String,
  avatar: String,
  isActive: Boolean,
  emailVerified: Boolean,
  preferences: JSONB,
  metadata: JSONB,
  createdAt: Date,
  updatedAt: Date
}
```

### Organization Model
```javascript
{
  id: UUID,
  name: String,
  slug: String (unique),
  description: Text,
  logo: String,
  website: String,
  industry: String,
  size: Enum,
  founded: Integer,
  settings: JSONB,
  subscription: JSONB,
  isActive: Boolean,
  metadata: JSONB,
  createdAt: Date,
  updatedAt: Date
}
```

### Project Model
```javascript
{
  id: UUID,
  organizationId: UUID,
  ownerId: UUID,
  name: String,
  description: Text,
  status: Enum,
  priority: Enum,
  startDate: Date,
  endDate: Date,
  budget: Decimal,
  actualCost: Decimal,
  progress: Integer (0-100),
  tags: Array,
  objectives: JSONB,
  risks: JSONB,
  deliverables: JSONB,
  settings: JSONB,
  metadata: JSONB,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  id: UUID,
  projectId: UUID,
  assigneeId: UUID,
  createdById: UUID,
  parentTaskId: UUID,
  title: String,
  description: Text,
  status: Enum,
  priority: Enum,
  type: Enum,
  dueDate: Date,
  startDate: Date,
  completedAt: Date,
  estimatedHours: Decimal,
  actualHours: Decimal,
  tags: Array,
  attachments: JSONB,
  checklist: JSONB,
  dependencies: Array,
  isRecurring: Boolean,
  recurringPattern: JSONB,
  metadata: JSONB,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Security**: Short-lived access tokens (15min) with refresh tokens (7 days)
- **Rate Limiting**: Configurable request limits per IP
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers for production
- **Input Validation**: Express-validator for all inputs
- **SQL Injection Protection**: Parameterized queries via Sequelize
- **Environment Variables**: Sensitive data in .env files

## Email Templates

Create custom email templates in `src/templates/email/`:

```handlebars
<!-- welcome.hbs -->
<h1>Welcome {{firstName}}!</h1>
<p>Thank you for joining VPofOne.</p>
<a href="{{verificationUrl}}">Verify Email</a>
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm test` - Run tests

### Project Structure
```
backend/
├── src/
│   ├── api/
│   │   └── routes/         # API route definitions
│   ├── config/             # Configuration files
│   ├── middleware/         # Express middleware
│   ├── models/             # Sequelize models
│   ├── services/           # Business logic
│   ├── templates/          # Email templates
│   ├── utils/              # Utility functions
│   └── server.js           # Express server setup
├── logs/                   # Application logs
├── tests/                  # Test files
├── .env.example            # Environment variables template
├── package.json            # Dependencies
└── README.md               # This file
```

## Testing

Run the test suite:

```bash
npm test
```

Test specific endpoints:
```bash
# Test authentication
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

## Deployment

### Production Considerations

1. **Database**: Use managed PostgreSQL (AWS RDS, Google Cloud SQL, etc.)
2. **Environment**: Set `NODE_ENV=production`
3. **SSL**: Enable HTTPS with SSL certificates
4. **Monitoring**: Add APM tools (New Relic, DataDog)
5. **Logging**: Configure centralized logging
6. **Backups**: Regular database backups
7. **Scaling**: Use PM2 or containerization

### Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details