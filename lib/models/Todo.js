const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reminder: {
    type: Date,
    required: false
  },
  completed: {
    type : Boolean,
    requires: false
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  }
});

module.exports = model('Todo', TodoSchema);
