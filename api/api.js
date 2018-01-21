var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

  app.get('/api/todos/:uname', function(req, res) {
    Todos.find({
      username: req.params.uname
    }, function(error, todos) {
      if (error) {
        throw err;
      }
      res.send(todos);
    });
  });

  app.get('/api/todo/:id', function(req, res) {
    Todos.findOne({
      _id: req.params.id
    }, function(error, todo) {
      if (error) {
        throw error;
      }
      res.send(todo);
    });
  });

  app.post('/api/todo', function(req, res) {
    if (req.body.id) {
      Todos.findByIdAndUpdate(req.body.id, {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment}, function(error, todo) {
          if (error) {
            throw error;
          }
          //Return some API success object instead
          res.send('Sucess');
        });
    } else {
      var newTodo = Todos({
        username: 'test',
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });
      newTodo.save(function(error) {
        if (error) {
          throw error;
        }
        res.send('success');
      });
    }
  });

  app.delete('/api/todo', function(req, res) {
    Todos.findByIdAndRemove(req.body.id, function(error) {
      if (error) {
        throw error;
      }
      res.send('Success');
    });
  });
};
