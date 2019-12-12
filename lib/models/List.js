const  { Schema, model } = require('mongoose');

const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

module.exports = model('List', ListSchema);
