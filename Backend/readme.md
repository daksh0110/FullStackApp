# Event Booking System Backend

This repository contains the backend for the Event Booking System. It includes user management, admin functionality, and ad-related services. The application is built using Express.js and provides RESTful API routes for various functionalities.

## Table of Contents

- [Installation](#installation)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Ad Routes](#ad-routes)
  - [Admin Routes](#admin-routes)
- [Middleware](#middleware)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Token Refresh](#token-refresh)
- [Express-Validator](#express-Validator)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/event-booking-system-backend.git
   cd event-booking-system-backend
2. Install dependencies:

   ```bash
   npm install
3. Set up environment variables. Create a ``.env`` file in the root directory with the necessary configurations (e.g., database URL, JWT secret, etc.).
## API Routes

### User Routes

#### POST /users/register
Register a new user.

**Request Body:**
   ```bash
          {
    "username": "string",
    "password": "string",
    "email": "string"
     }
```
## Ad Routes

#### GET /ads/view/:adId
View an ad by its ID.

**Params:**
- `adId` (string) - The ID of the ad to be viewed.

**Response:**
- Increments the view count of the ad.

#### POST /ads/click
Click on an ad and add money to the user's wallet.

**Request Body:**
```json
{
  "adId": "string",
  "userId": "string"
}

```
## Admin Routes

#### POST /admin/login
Admin login and generate a JWT token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
## Middleware

#### catchError
This middleware is used to catch errors in asynchronous route handlers and pass them to the error handling middleware.

**Usage:**
- Wrap your asynchronous route handlers with this middleware to catch any errors and pass them to the error handler.

#### verifyToken
This middleware verifies the JWT token passed in the request headers for protected routes (e.g., `/ads/create`).

**Usage:**
- Protect your routes by adding this middleware to ensure only authorized users can access them.
- The token should be passed in the `Authorization` header as `Bearer <token>`.

#### rateLimiter
This middleware limits the number of requests an admin can make within a specific time frame to prevent abuse.

**Usage:**
- Apply this middleware to admin routes to restrict the number of requests an admin can make, ensuring fair usage and preventing overloading the system.

#### express-validator
`express-validator` is used to validate and sanitize request data.

**Usage:**
- Use the `check()` and `validationResult()` methods to validate request parameters, body, or query.
- Example:
  ```javascript
  const { check, validationResult } = require('express-validator');

  // Validation example for POST /users/register
  app.post('/users/register', [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with registration
  });
   ```
 # API Documentation

## API Routes

### User Routes

#### POST /users/register
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```
#### Login User

POST /users/login
```bash
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### View Ad

``GET /ads/view/:adId``
```bash
Params: { "adId": "12345" }
```
### Key Sections:

1. **Installation**: Instructions on how to set up the project.
2. **API Routes**: Detailed list of all routes for user, ad, and admin functionality.
3. **Middleware**: Explains the middlewares used in the application.
4. **Error Handling**: Describes how errors are managed.
5. **Rate Limiting**: Explains the rate-limiting mechanism for admin routes.
6. **Token Refresh**: Explains how the token refresh mechanism works for both users and admins.
7. **Example Usage**: Provides example requests for common operations.

Feel free to customize the content according to your needs!