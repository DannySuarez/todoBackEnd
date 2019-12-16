const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
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
  }
});

module.exports = model('Todo', TodoSchema);
