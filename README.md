Microservices-Based Application

Overview

This repository contains a microservices-based application that provides functionality for authentication, bookings, and listings. Each microservice operates independently and communicates via REST APIs. The project is containerized using Docker and supports easy scaling and deployment.

Key Features:

Authentication Microservice: Handles user registration, login, and authentication using JWT.

Bookings Microservice: Manages booking operations.

Listings Microservice: Allows users to create and manage listings.

Shared Components: Reusable utilities and middleware shared across microservices.

Swagger Documentation: API documentation for all microservices.


Project Structure:

Assigment2/

├── shared/

│   ├── middleware/

│   │   ├── auth-jwt.js

│   ├── utils/

│   │   ├── tokenHelper.js

│   ├── package.json

├── auth-microservice/

│   ├── routes/

│   │   ├── auth-routes-authMicroservice.js

│   ├── controllers/

│   │   ├── authController.js

│   ├── server.js

│   ├── Dockerfile

│   ├── package.json

│   ├── .env

├── bookings-microservice/

│   ├── routes/

│   │   ├── bookingRoutes.js

│   ├── controllers/

│   │   ├── bookingController.js

│   ├── server.js

│   ├── Dockerfile

│   ├── package.json

│   ├── .env

├── listings-microservice/

│   ├── routes/

│   │   ├── listingRoutes.js

│   ├── controllers/

│   │   ├── listingController.js

│   ├── server.js

│   ├── Dockerfile

│   ├── package.json

│   ├── .env

└── docker-compose.yml



Technologies Used

Node.js: Server-side runtime.

Express.js: Web framework.

MongoDB: Database for data storage.

JWT (jsonwebtoken): For authentication and secure data exchange.

Swagger: API documentation.

Docker: Containerization.



Prerequisites

Node.js (v20.x recommended)

Docker

MongoDB (if running locally)

Installation

Install dependencies for all microservices:

cd auth-microservice && npm install
cd ../bookings-microservice && npm install
cd ../listings-microservice && npm install

Set up environment variables:
Create a .env file in each microservice folder with the following content:

PORT=5001  # For auth-microservice (increment for others)
MONGO_URI=mongodb://localhost:27017/<db_name>
JWT_SECRET=your_jwt_secret

Start each microservice:

node server.js

Access the services:

Auth Microservice: http://localhost:5001

Bookings Microservice: http://localhost:5002

Listings Microservice: http://localhost:5003


API Endpoints

Authentication Routes

Register User

Endpoint: POST /api/auth/register

Request Body:

{
  "username": "exampleUser",
  "email": "example@example.com",
  "password": "examplePassword"
}

Response:

{
  "token": "your_jwt_token"
}

Login User

Endpoint: POST /api/auth/login

Request Body:

{
  "email": "example@example.com",
  "password": "examplePassword"
}

Response:

{
  "token": "your_jwt_token"
}

Booking Routes

Create Booking

Endpoint: POST /api/bookings

Request Body:

{
  "listingId": "exampleListingId",
  "fromDate": "2024-01-01",
  "toDate": "2024-01-10"
}

Response:

{
  "status": "Booking confirmed"
}

Listing Routes

Create Listing

Endpoint: POST /api/listings

Request Body:

{
  "title": "Beautiful Apartment",
  "price": 120,
  "location": "New York"
}

Response:
{
  "status": "Listing created"
}
