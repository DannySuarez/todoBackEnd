const { Router } = require('express');
const List = require('../models/List');


module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      title
    } = req.body;

    List
      .create({
        title
      })
      .then(list => res.send(list))
      .catch(next);
  });
