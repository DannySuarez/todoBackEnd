const  { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = model('List', ListSchema);
