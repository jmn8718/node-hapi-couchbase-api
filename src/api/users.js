'use strict';

const User = require('../models/user');
const Joi = require('joi');

const routes = [
  {
    method: 'GET',
    path: '/api/v1/users',
    config: {
      handler: (request, reply) => {
        User.find({}, (err, users) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          return reply({
            data: users,
            count: users.length
          });
        });
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/users',
    config: {
      handler: (request, reply) => {
        const user = new User(request.payload);
        user.save((err) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          return reply(user).code(201);
        });
      },
      validate: {
        payload: {
          password: Joi.string().alphanum().min(3).max(30).required(),
          email: Joi.string().email().required(),
          name: Joi.string()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    config: {
      handler: (request, reply) => {
        User.getById(request.params.id, (err, user) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          return reply(user);
        });
      },
      validate: {
        params: {
          id: Joi.string(),
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/users/{id}',
    config: {
      handler: (request, reply) => {
        User.getById(request.params.id, (err, user) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          const payload = request.payload;
          if (payload.name) {
            user.name = payload.name;
          }
          if (payload.password) {
            user.password = payload.password;
          }
          user.save((err) => {
            if (err) {
              return reply({
                status: 400,
                message: err.message
              }).code(400);
            }
            return reply(user).code(200);
          });
        });
      },
      validate: {
        params: {
          id: Joi.string(),
        },
        payload: {
          name: Joi.string(),
          password: Joi.string().alphanum().min(3).max(30),
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/{id}',
    config: {
      handler: (request, reply) => {
        User.getById(request.params.id, (err, user) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          user.remove((err) => {
            if (err) {
              return reply({
                status: 400,
                message: err.message
              }).code(400);
            }
            return reply(user);
          });
        });
      },
      validate: {
        params: {
          id: Joi.string(),
        }
      }
    }
  },
];

module.exports = routes;
