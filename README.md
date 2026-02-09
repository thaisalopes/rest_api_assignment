Simple REST API Apllication

This a REST API application built with Node.js and Express, using Firebase Realtime Database for data storage.
It provides CRUD (Create, Read, Update, Delete) operations for Users, Income, and Expenses.

How to Use

Installation
1. Clone the repository
git clone https://github.com/thaisalopes/rest_api_assignment
cd rest_api_assignment

2. Install dependencies

This project uses the following dependencies:

- express
- firebase-admin
- express-async-handler
- dotenv

Install all dependencies with:
npm install

3. Set Environment Variables
Create a .env file in the project root with the following:

PORT=3000
FIREBASE_DATABASE_URL=https://rest-api-assignment-node-default-rtdb.firebaseio.com/

4. Firebase service account key

Save the Firebase service account key JSON file locally on your machine (not in the repository).

Set the environment variable pointing to that file:

GOOGLE_APPLICATION_CREDENTIALS=path_to_json_file

5. Running the Application

Start the server with:
node src/server.js

The API will be available at:
http://localhost:3000

---------------------------------------------------------------------------

Available Endpoints:

Root Endpoint
GET /
Returns a brief description of the API and available endpoints.

Users
GET /users – Retrieve all users
POST /users – Create a new user
    Body: {name:name, email:email}
PUT /users/:id – Update a user by ID
    Body: {name:name, email:email}
DELETE /users/:id – Delete a user by ID

Income
GET /income – Retrieve all income records
POST /income – Create a new income record
PUT /income/:id – Update an income record by ID
DELETE /income/:id – Delete an income record by ID

Expenses
GET /expenses – Retrieve all expenses
POST /expenses – Create a new expense record
PUT /expenses/:id – Update an expense record by ID
DELETE /expenses/:id – Delete an expense record by ID

---------------------------------------------------------------------------