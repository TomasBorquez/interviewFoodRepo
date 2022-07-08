/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Salmon',
  summary: 'this is a good salmon i promise',
  image: 'Salmon image :D',
  healthScore: 70,
  steps: 'you just need to do it at the morning i think',
};
// "diets": [5, 7, 6, 3]

describe('Diets routes', () => {
  before(() =>
    conn.authenticate().catch(err => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('GET /diets', () => {
    it('responds with 200', () => agent.get('/diets').expect(201));
    it('responds with an array with the default diets', () =>
      agent.get('/diets').then(res => {
        expect(res.body.length).equal(12);
      }));
  });
});

describe('Recipe routes', () => {
  before(() =>
    conn.authenticate().catch(err => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('POST /recipes', () => {
    it('responds with error if nothing is sent through body', () =>
      agent
        .post('/recipes')
        .then(res => expect(res.text).equal('There was an error')));
    it('Creates the recipe successfully', () =>
      agent
        .post('/recipes')
        .send({
          title: 'Salmoan',
          summary: 'this is a good salmon i promise',
          image: 'Salmon imagea :D',
          healthScore: 70,
          steps: 'you just need to do it at the morning i think',
        })
        .then(res => expect(res.text).equal('Salmon has been correctly created')));
  });
  describe('GET /recipes', () => {
    it('responds with 201', () => agent.get('/recipes').expect(201));
    it('responds with an array with the default diets', () =>
      agent.get('/diets').then(res => {
        expect(res.body.length).equal(12);
      }));
  });
});
