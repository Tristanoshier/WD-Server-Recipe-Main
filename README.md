# Server Shell

This application is one of the many pre-made API's for the Web Development Blue Badge program. Do not clone this project simply download the zipped file and start using it on your main project. Once you are ready update the readme and create your own repository for the project that was given to you. The user, profile, apikey, group, membership, client have all been created for you.

You will be asked to make sure that not only are we validating token but also making sure that the API key is valid as well. There is a middleware called (`validateApiKey`). See photo below.

There is a `constants` file where if you are using the same word over and over you might want to make it a constant and just import it. It's much easier to update it in one place. Later when we get to unit testing this will make things easier.

## Important Concepts to keep the code clean.

- Make sure that the `Service` is doing the work and pushing the result back to the controller.
- If you are finding yourself repeating code over and over. Make a helper file and import it.

## Validate API Key Example

![Validate Api Key](/documents/photos/validateApi-example.png)

## You have access to JOI for validation

![Validate Api Key](/documents/photos/joi-example.png)

# ENV Variables

| Variable                | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| DATABASE_CONNECTION_URL | Sequelize Connection string for the PostgreSQL Server     |
| JWT_SECRET              | Secret string used to encode and decode the JWT signature |

## DB Diagram Link

## Application Progress

- [ ] Models
- [ ] Services
- [ ] Controllers
- [ ] Database Seeding
- [ ] Clearing Group Data

# User Stories

### Authentication Stories

- [ ] As a _User_ I would like to be able to register for an account
- [ ] # As a _User_ I would like to be able to log in to my account
- [ ] As a _User_ I would like to be able to register for an account
- [ ] As a _User_ I would like to be able to log in to my account
- [ ] As a _User_ I would like to be able to log out of my account

### Browsing Stories

-

# Developer Repo to Run locallay

1. `npm install` in the terminal
1. Install nodemon globally if you haven't already `npm i -g nodemon`
1. Create your own `.env` file and copy and paste from the `.example.env`.
1. Create a database in your PGAdmin
1. Update `.env` file to match your enviorment.
1. Run `nodemon` in your terminal

# Getting API Key to use with app

1. Visit the url in your browser: `127.0.0.1:8080`
1. Register a user and password
1. You will then need to login with new `user` and `password`
1. Create a group
1. Create an API Key
1. Use API key in Postman Environment Variables

# Documents Folder

In the documents folder you will find a `DBML` file that you can go to [DB Diagram](https://dbdiagram.io/) and paste in the contents in that file. That will give you a visual of the database structure.

## All endpoints

<hr></hr>

Your port number will be whatever number you've specified in your .env file.

### Users

| Verb | Endpoint                                                           | Function    |
| ---- | ------------------------------------------------------------------ | ----------- |
| POST | <span style="color: aqua"> localhost:PORT/api/user/signup/ </span> | Signup user |
| POST | <span style="color: aqua"> localhost:PORT/api/user/login/ </span>  | Login user  |

### Profile

| Verb | Endpoint                                                              | Function                          |
| ---- | --------------------------------------------------------------------- | --------------------------------- |
| GET  | <span style="color: aqua"> localhost:PORT/api/profile/get/ </span>    | Gets user and profile information |
| PUT  | <span style="color: aqua"> localhost:PORT/api/profile/update/ </span> | Updates profile on the user       |

## HTTP STATUS CODE SUMMARY

| Error Code           | Meaning                                                          |
| -------------------- | ---------------------------------------------------------------- |
| 200 - OK             | Everything worked as expected.                                   |
| 201 - Created        | Sucess!                                                          |
| 304 - Not modified   | User does not exist.                                             |
| 400 - Bad Request    | This request was unacceptable, often due to missing a parameter. |
| 401 - Unauthorized   | Invalid username provided.                                       |
| 403 - Forbidden      | Invalid password (user).                                         |
| 404 - Not Found      | The requested resource doesn't exist.                            |
| 406 - Not acceptable | User not found, but UUID in correct format.                      |
| 409 - Conflict       | Duplicate username.                                              |

| 500 - Internal Server Error | Request failed. |
