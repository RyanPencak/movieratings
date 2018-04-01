const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const path = require('path');
const dbPath = __dirname + '/db/movieRatings.db';
// const db = new sqlite3.Database('dbPath');
var db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

app.get('/api/users', function(req, res){
  let sql = `SELECT DISTINCT user_id as UserID, user_name as Name, state as State FROM users`;

  db.all(sql, [], (err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});

app.get('/api/movies', function(req, res){
  let sql = `SELECT DISTINCT movie_id as MovieID, title as Title, genre as Genre FROM movies`;

  db.all(sql, [], (err, movies) => {
    if (err) {
      throw err;
    }
    // movies.forEach((movie) => {
    //   console.log(movie.title);
    // });
    res.json(movies);
  });
});

// app.post('/data', function(req, res){
//     db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row){
//         if (err){
//             console.err(err);
//             res.status(500);
//         }
//         else {
//             res.status(202);
//         }
//         res.end();
//     });
// });


app.listen(3001);

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

// export module
module.exports = app;
