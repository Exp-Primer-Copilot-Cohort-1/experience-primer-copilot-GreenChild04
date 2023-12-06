// Create web server

var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

// Post a comment
router.post('/api/v1/comments', function(req, res) {
  var results = [];
  // Grab data from http request
  var data = {text: req.body.text, complete: false};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert data
    client.query("INSERT INTO comments(text, complete) values($1, $2)", [data.text, data.complete]);
    // SQL Query > Select data
    var query = client.query("SELECT * FROM comments ORDER BY id ASC");
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

// Get all comments
router.get('/api/v1/comments', function(req, res) {
  var results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select data
    var query = client.query("SELECT * FROM comments ORDER BY id ASC;");
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

// Update a comment
router.put('/api/v1/comments/:comment_id', function(req, res) {
  var results = [];
  // Grab data from the URL parameters
  var id = req.params.comment_id;
  // Grab data from 
});