const { Router } = require('express');
const Todo = require('../models/Todo');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title
    } = req.body;

    Todo
      .create({
        title
      })
      .then(todo => res.send(todo))
      .catch(next);
  });
  

