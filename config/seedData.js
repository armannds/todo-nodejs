var Todos = require('../models/todoModel');

function setupSeedData(req, res, next) {
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

  Todos.create(seedTodos, function (error, result) {
    if (error) {
      next(error);
    }
    res.send(result);
  });
}

function renderExistingSeedData(req, res, next) {
  Todos.find({}, function (error, results) {
    if (error) {
      next(error);
    } else {
      res.send(results);
    }
  });
}

module.exports = function (app) {
  app.get('/config/seedData', function (req, res, next) {
    Todos.count({}, function (error, count) {
      if (error) {
        next(error);
      } else if (count == 0) {
        setupSeedData(req, res, next);
      } else {
        renderExistingSeedData(req, res, next);
      }
    });
  });
};
