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

  .patch('/:id', (req, res, next) => {
    Todo
      .findByIdAndUpdate(req.params.id, req.body, { new:true })
      .then(updatedTodo => res.send(updatedTodo))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Todo
      .findByIdAndDelete(req.params.id)
      .then(todo => res.send(todo))
      .catch(next);
  });
  

