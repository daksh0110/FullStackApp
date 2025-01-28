# Paid Ads System

In this project, the **admin** can create ads, and **users** can view these ads to earn rewards in their wallets. The system integrates wallet balance management, allowing users to earn rewards for viewing ads.

## Features

- **Admin Features**:
  - **Create Ads**: Admin can create new ads with specific details (e.g., title, description, media URL, price per view, etc.).
  
- **User Features**:
  - **View Ads**: Users can view ads.
  - **Earn Rewards**: Users earn rewards (in the form of wallet balance) for viewing ads.
  - **Wallet Balance**: Users can check their wallet balance and update it based on interactions with ads.

## Requirements

- **Node.js**: Ensure that Node.js is installed on your machine.
- **React**: This project is designed to be used with a React application.
- **Redux Toolkit**: The project uses Redux Toolkit for state management.
- **API Integration**: The project communicates with a backend API for user authentication, ad management, and wallet balance updates.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/paid-ads-system.git
## Navigate to the Project Directory

To navigate to the project directory, use the following command:

```bash
cd wallet-api-integration
```

## Install Dependencies

To install the required dependencies, run the following command:

```bash
npm install
```
# Wallet API Integration

This project integrates the wallet API with Redux Toolkit to manage user wallet balances. It provides functionality to update and fetch wallet balances for users.

## Features

- **Update Wallet Balance**: Allows updating the wallet balance for a specific user.
- **Get Wallet Balance**: Fetches the current wallet balance for a user by their ID.

## Requirements

- **Node.js**: Ensure that Node.js is installed on your machine.
- **React**: This API is designed to be used with a React application.
- **Redux Toolkit**: The project uses Redux Toolkit for state management.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/wallet-api-integration.git
    ```
##Update Wallet Balance

Endpoint: /users/wallet
Method: PUT
Request Body:
```json

{
  "userId": "string",  // The user ID
  "amount": "number"   // The amount to add/subtract from the wallet balance
}
```
##Running the Application
Start the development server:

```json
npm run dev
```

Open the application in your browser at http://localhost:5173.
