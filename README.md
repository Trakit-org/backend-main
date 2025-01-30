# Trakit

Trakit is a subscription tracking app that helps users manage their recurring expenses, such as streaming services, SaaS products, gym memberships, and more. It provides insights, reminders, and analytics to help users stay on top of their subscriptions.

## Features
- **Subscription Management**: Add, edit, delete, and search for subscriptions.
- **Reminder System**: Get notified about upcoming billing dates.
- **User Authentication**: Secure login and registration using JWT-based authentication.
- **Data Security**: Password hashing and protected API routes.
- **Frontend Integration**: The frontend uses `fetch` for making API requests.

## Tech Stack
### Backend (Node.js + Express.js)
- Express.js (REST API)
- MongoDB (Database)
- Mongoose (ODM)
- JSON Web Tokens (JWT) for authentication
- Nodemailer for email notifications
- Validation using Express Validator

### Frontend (React)
- React.js (UI framework)
- Fetch API for making requests
- React Router for navigation
- Tailwind CSS for styling

### Deployment
- **Frontend**: Hosted on Vercel
- **Backend**: Hosted on Render
- **GitHub Organization**: [`Trakit-org`](https://github.com/Trakit-org)
  - [`frontend-main`](https://github.com/Trakit-org/frontend-main)
  - [`backend-main`](https://github.com/Trakit-org/backend-main)

## Installation & Setup
### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Trakit-org/backend-main.git
   cd backend-main
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following environment variables:
   ```env
   NODE_ENV=production/development(depends)
   MONGO_URI=your_mongodb_connection_string
   PORT=your_port_number
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=your_frontend_url
   EMAIL_USER=your_organization_email
   EMAIL_PASS=your_email_app_password
   EMAIL_FROM=your_organization_email
   ```
4. Start the server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Trakit-org/frontend-main.git
   cd frontend-main
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login and receive JWT token
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/reset-password` - Send reset token to the provided email
- `PATCH /api/v1/auth/reset-password/:token` - Reset password using the token from the previous endpoint
- `PATCH /api/v1/auth/change-password` - Change the password of the authenticated user

### User
- `PATCH /api/v1/users/me` - Update the profile details of the authenticated user
- `DELETE /api/v1/users/me` - Delete the account of the authenticated user. **Ensure to place a confirmation dialog before this endpoint is activated**

### Subscriptions
- `POST /api/v1/subscriptions` - Create a new subscription
- `GET /api/v1/subscriptions` - Get all subscriptions
- `GET /api/v1/subscriptions/:id` - Get a single subscription
- `PATCH /api/v1/subscriptions/:id` - Update a subscription
- `DELETE /api/v1/subscriptions/:id` - Delete a single subscription
- `DELETE /api/v1/subscriptions` - Delete all subscriptions
- `GET /api/v1/subscriptions/search` - Get all subscriptions for the current user that match the given filter(s)

`NOTE BELOW:` Each of the subscription routes above also support a guest mode feature if no authentication token is provided. Note, however, that the purpose of this feature is to enable potential employers, users, e.t.c to test the basic features of the API without having to register. Hence, the data saved in this mode do not persist when the server is restarted.

### Reminder System
- `POST /api/v1/reminders` - Create a new reminder
- `GET /api/v1/reminders` - Get all reminders
- `GET /api/v1/reminders/:id` - Get a single reminder
- `PATCH /api/v1/reminders/:id` - Update a reminder
- `DELETE /api/v1/reminders/:id` - Delete a single reminder
- `DELETE /api/v1/reminders` - Delete all reminders
- `GET /api/v1/reminders/upcoming-renewals` - Get all reminders that fall within a week's time

## Future Improvements
- **Payment Integration** (Stripe/PayPal) for pro features like subscription analytics, e.t.c.
- **Subscription Analytics**
- **Mobile App Version**
- **User Subscription Sharing**

## Contributing
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License
This project is licensed under the MIT License.
