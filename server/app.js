const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

var db = new sqlite3.Database(__dirname + '/db/movieRatings.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

app.disable('x-powered-by');
app.use(bodyParser.json());

app.get('/api/users', function(req, res){
  let sql = `SELECT DISTINCT user_id as UserID, user_name as Name, state as State FROM users`;

  db.all(sql, [], (err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});

app.get('/api/ratings', function(req, res){
  let sql = `SELECT DISTINCT rating_id as RatingID, user_id as UserID, movie_id as MovieID, rating as Rating FROM ratings`;

  db.all(sql, [], (err, ratings) => {
    if (err) {
      throw err;
    }
    res.json(ratings);
  });
});

app.get('/api/tags', function(req, res){
  let sql = `SELECT DISTINCT tag_id as TagID, rating_id as RatingID, movie_id as MovieID, tag_string as Tag FROM tags`;

  db.all(sql, [], (err, tags) => {
    if (err) {
      throw err;
    }
    res.json(tags);
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

// app.post('/api/ratings', function(req, res){
//   let sql = `SELECT DISTINCT rating_id as RatingID, user_id as UserID, movie_id as MovieID, rating as Rating FROM ratings`;
//
//   db.all(sql, [], (err, ratings) => {
//     if (err) {
//       throw err;
//     }
//     res.json(ratings);
//   });
// });

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

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});

app.use((err, _req, res, _next) => {
  console.log(err);
  if (err.status) {
    return res
    .status(err.status)
    .send(err.errors[0].messages[0]);
  }

  if (err.output && err.output.statusCode) {
    return res
    .status(err.output.statusCode)
    .set('Content-Type', 'text/plain')
    .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

// app.listen(3001);

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

// export module
module.exports = app;
