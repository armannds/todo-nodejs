var Todos = require('../models/todoModel');

function setupSeedData(req, res) {
  var seedTodos = [{
      username: 'test',
      todo: 'Buy milk',
      isDone: false,
      hasAttachment: false
    },
    {
      username: 'test',
      todo: 'Feed dog',
      isDone: false,
      hasAttachment: false
    },
    {
      username: 'test',
      todo: 'Learn Node',
      isDone: false,
      hasAttachment: false
    }
  ];

  Todos.create(seedTodos, function (err, result) {
    res.send(result);
  });
}

function renderExistingSeedData(req, res, next) {
  Todos.find({}, function (error, results) {
    if (error) {
      forwardError(error, next);
    } else {
      res.send(results);
    }
  });
}

function forwardError(error, next) {
  error.status = error.status | '500';
  next(error);
}

module.exports = function (app) {

  app.get('/config/seedData', function (req, res, next) {
    Todos.count({}, function (error, count) {
      if (error) {
        forwardError(error, next);
      } else if (count == 0) {
        setupSeedData(req, res);
      } else {
        renderExistingSeedData(req, res, next);
      }
    });
  });
};
