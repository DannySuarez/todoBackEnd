const  { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'TodoSchema'
  }]
});

module.exports = model('ListSchema', ListSchema);
