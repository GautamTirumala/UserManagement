const { userSchema } = require('../Schema/PostSchema');
const { userList, userDetail, createUser } = require('../controller/UserController');
const { validate } = require('../middleware/ValidationHandle');
const app = require('express').Router();

app.get('/api/users', userList);
app.get('/api/users/:userId', userDetail);
app.post('/api/users', validate(userSchema, 'body'), createUser);

module.exports = app;