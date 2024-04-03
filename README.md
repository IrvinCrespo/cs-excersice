# Users & Friends Excersice

## Set up project

First you need to install dependencies with:

`npm install`

Then, you just need to run the project:

`npm run start`

After start server, seed-users will be executed and sqlite database will be populated with some users.

## Endpoints

### `GET /users`
Gets all users in db

### `GET /users/:id` 
Gets an specific user by id

### `PATCH /users/:id`
Updates user's data (name and/or email)

### `POST /users`
Creates new user (Body: name, email)

### `POST /users/friends/:userId/:friendId`
Adds new friend to specific user.

### `DELETE /users/friends/:userId/:friendId`
Deletes user's friend

### `DELETE /users/:userId`
Deletes user

### `GET /users/distance/:userId/:userId2`
Gets the distance between 2 users through relationships

**return 0 if user 1 is equals to user 2 (same user)**

**return depth > 0 if there is relation**

**return -1 if no relation found**
