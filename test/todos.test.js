require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Todo = require('../lib/models/Todo');

describe('todos route', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let todo = null;
  let todo2 = null;
  let todo3 = null;
  beforeEach(async() => {
    todo = JSON.parse(JSON.stringify(await Todo.create({ title: 'clean dishes' })));
    todo2 = JSON.parse(JSON.stringify(await Todo.create({ title: 'take out trash' })));
    todo3 = JSON.parse(JSON.stringify(await Todo.create({ title: 'take a break', completed: true })));
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
        expect(res.body).toHaveLength(3);
        expect(res.body).toContainEqual({
          _id: todo._id.toString(),
          title: 'clean dishes',
          __v: 0
        });
      });
  });

  it('can mark a todo as completed', () => {
    return request(app)
      .patch(`/api/v1/todos/${todo._id}`)
      .send({ completed: true })
      .then(res => {
        expect(res.body).toEqual({
          _id: todo._id.toString(),
          title: 'clean dishes',
          completed: true,
          __v: 0
        });
      });
  });

  it('can mark a completed todo as false', () => {
    return request(app)
      .patch(`/api/v1/todos/${todo3._id}`)
      .send({ completed: false })
      .then(res => {
        expect(res.body).toEqual({
          _id: todo3._id.toString(),
          title: 'take a break',
          completed: false,
          __v: 0
        });
      });
  });

  it('can delete a todo by id', () => {
    return request(app)
      .delete(`/api/v1/todos/${todo2._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: todo2._id.toString(),
          title: 'take out trash',
          __v: 0
        });
      });
  });

});
