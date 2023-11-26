const { userSchema } = require('../Schema/PostSchema');
const { userList, userDetail, createUser, deleteUser, updateUser } = require('../controller/UserController');
const { validate } = require('../middleware/ValidationHandle');
const app = require('express').Router();

app.get('/api/users', userList);
app.delete('/api/users/:userId', deleteUser);
app.patch('/api/users/:userId', updateUser);
app.get('/api/users/:userId', userDetail);
app.post('/api/users', validate(userSchema, 'body'), createUser);

module.exports = app;