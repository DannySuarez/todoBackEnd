require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Todo = require('../lib/models/Todo');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let todo = null;
  let todo2 = null;
  beforeEach(async() => {
    todo = JSON.parse(JSON.stringify(await Todo.create({ title: 'clean dishes' })));
    todo2 = JSON.parse(JSON.stringify(await Todo.create({ title: 'take out trash' })));

  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a todo', () => {
    return request(app)
      .post('/api/v1/todos')
      .send({
        title: 'pass this test'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'pass this test'
        });
      });
  });

  it('can get all todos', () => {
    return request(app)
      .get('/api/v1/todos')
      .then(res => {
        expect(res.body).toHaveLength(2);
        expect(res.body).toContainEqual({
          _id: todo._id.toString(),
          title: 'clean dishes',
          __v: 0
        });
      });
  });

  it('can delete a todo by id', () => {
    return request(app)
      .delete(`/api/vi/todos${todo2._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: todo2._id.toString(),
          title: 'take out trash',
          __v: 0
        });
      });
  });
});
