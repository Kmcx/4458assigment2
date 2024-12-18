Microservices-Based Application

Presentation: https://youtu.be/3WPGKcWcC6I


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

Node.js

Express.js

MongoDB

JWT

Swagger 

Docker




Prerequisites

Node.js 

Docker

MongoDB 

Installation

Install dependencies for all microservices:

cd auth-microservice && npm install
cd ../bookings-microservice && npm install
cd ../listings-microservice && npm install


Set up environment variables:
Create a .env file in each microservice folder with the following content:

PORT=5001  # For auth-microservice (increment for others)
MONGO_URI=mongodb+srv://kmc:cmr.2017@se4458.ix5di.mongodb.net/?retryWrites=true&w=majority&appName=SE4458
JWT_SECRET=kmc_jwt

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
