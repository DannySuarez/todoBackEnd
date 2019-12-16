require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const List = require('../lib/models/List');

describe('list route', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a list', () => {
    return request(app)
      .post('/api/v1/lists')
      .send({
        title: 'Work List'
      })
      .then(res => {
        expect(res.body).toEqual({
          title: 'Work List',
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});

