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
  })

  .get('/', (req, res, next) => {
    Todo
      .find()
      .then(todos => res.send(todos))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  });
  

