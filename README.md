# User Hobbies

An simple RESTful API that provides the required endpoints to create, list and delete users and their hobbies.

## Tech Stack
- Node.js
- Docker
- MongoDB
- TypeScript
- Mongoose
- Express.js
- Swagger
- Mocha

## API

The API runs by default on port `3000` under the base path `/api/v1` and exposes the following endpoints:

- `/` - Redirects to the SwaggerUI
- `/api-docs` - The SwaggerUI
- `/api/v1/users` - POST and GET operations for users
- `/api/v1/users/{userId}` - GET and DELETE operations for the specified user
- `/api/v1/users/{userId}/hobbies` - POST and GET operations for users' hobbies
- `/api/v1/users/{userId}/hobbies/{hobbyId}` - GET and DELETE operations for the specified user's hobby

## Run and Test Requirements

In order to run or test the API, it is needed to have Node.js, Docker and Docker Compose installed.

## How to run it?
1. Install dependencies with `npm install`
2. Compile the project with `npm run tsc:build`
3. Start the MongoDB instance with `make start-db`
4. Start the application by running `npm start`

## How to run the tests?
1. Install dependencies with `npm install` - If not done already
2. Start the application by running `npm test`

## Notes

Currently in order to run the tests, it is needed to have the MongoDB instance running, since the tests are Integration Tests and not Unit Tests. To fix this issue there is needed to have an in memory database that allows to perform the same opeation supported by MongoDB.