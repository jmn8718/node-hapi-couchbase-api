'use strict';

const User = require('../models/user');
const Post = require('../models/post');
const Joi = require('joi');

const validateUser = (value, options, next) => {
  const userId = options.context.params.userId;
  User.getById(userId, (err, user) => {
    next(err, Object.assign({}, value, { user }))
  })
};

const routes = [
  {
    method: 'GET',
    path: '/api/v1/users/{userId}/posts',
    config: {
      handler: (request, reply) => {
        const user = request.query.user;
        Post.find({ user: { _id: user._id } }, (err, posts) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          return reply({
            data: posts,
            count: posts.length
          });
        })
      },
      validate: {
        query: validateUser,
      }
    }
  },
  {
    method: 'POST',
    path: '/api/v1/users/{userId}/posts',
    config: {
      handler: (request, reply) => {
        const user = request.query.user;
        const post = new Post(request.payload);
        post.user = user;
        post.save((err) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          return reply(post).code(201);
        });
      },
      validate: {
        query: validateUser,
        payload: {
          title: Joi.string().required(),
          body: Joi.string().required(),
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/api/v1/users/{userId}/posts/{postId}',
    config: {
      handler: (request, reply) => {
        const user = request.query.user;
        const postId = request.params.postId;
        Post.find({ user: { _id: user._id }, _id: postId }, (err, posts) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          if (posts.length === 0) {
            return reply({
              status: 404,
              message: 'Not Found'
            }).code(404);
          } else {
            return reply(posts[0]);
          }
        })
      },
      validate: {
        query: validateUser,
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/v1/users/{userId}/posts/{postId}',
    config: {
      handler: (request, reply) => {
        Post.getById(request.params.postId, (err, post) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          if (request.params.userId === post.user._id) {
            const payload = request.payload;
            if (payload.title) {
              post.title = payload.title;
            }
            if (payload.body) {
              post.body = payload.body;
            }
            post.save((err) => {
              if (err) {
                return reply({
                  status: 400,
                  message: err.message
                }).code(400);
              }
              return reply(post).code(200);
            });
          } else {
            return reply({
              status: 401,
              message: "The user can not edit the post"
            }).code(401);
          }

        })
      },
      validate: {
        query: validateUser,
        payload: {
          title: Joi.string().required(),
          body: Joi.string().required(),
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/{userId}/posts/{postId}',
    config: {
      handler: (request, reply) => {
        Post.getById(request.params.postId, (err, post) => {
          if (err) {
            return reply({
              status: 400,
              message: err.message
            }).code(400);
          }
          if (request.params.userId === post.user._id) {
            post.remove((err) => {
              if (err) {
                return reply({
                  status: 400,
                  message: err.message
                }).code(400);
              }
              return reply(post).code(200);
            });
          } else {
            return reply({
              status: 401,
              message: "The user can not delete the post"
            }).code(401);
          }

        })
      },
      validate: {
        query: validateUser
      }
    }
  },
];

module.exports = routes;
