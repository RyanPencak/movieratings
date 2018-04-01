import './Ratings.css';
import React, { Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import axios from 'axios';

export default class BatteryLog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      users: [],
      ratings: [],
      pageCounter: 1,
      firstRow: 0,
      lastRow: 9,
    };

    this.getRatings = this.getData.bind(this);
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.firstPage = this.firstPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('/api/movies')
      .then(({data}) => {
        // console.log(data);
        this.setState({
          movies: data
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('/api/users')
      .then(({data}) => {
        // console.log(data);
        this.setState({
          users: data
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('/api/ratings')
      .then(({data}) => {
        console.log(data);
        this.setState({
          ratings: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  incrementPage() {
    let currentPage = this.state.pageCounter;

    if (currentPage < (Math.ceil(this.state.movies.length / 10))) {
      currentPage += 1;
    }
    this.setState({
      pageCounter: currentPage,
      firstRow: (10*currentPage) - 10,
      lastRow: (10*currentPage) - 1
    })
  }

  decrementPage() {
    let currentPage = this.state.pageCounter;

    if (currentPage > 1) {
      currentPage -= 1;
    }
    this.setState({
      pageCounter: currentPage,
      firstRow: (10*currentPage) - 10,
      lastRow: (10*currentPage) - 1
    })
  }

  firstPage() {
    this.setState({
      pageCounter: 1,
      firstRow: 0,
      lastRow: 9
    })
  }

  lastPage() {

    let currentPage = Math.ceil(this.state.movies.length / 10);
    let endRow = this.state.movies.length;
    endRow -= 1;
    let startRow = 0;

    if ((currentPage % 10) === 0) {
      startRow = endRow - 10;
    }
    else {
      startRow = endRow - (currentPage % 10);
    }

    this.setState({
      pageCounter: currentPage,
      firstRow: startRow,
      lastRow: endRow
    })
  }

  render() {

    return (
      <div className="Ratings">

        <div className="header">
          <h3>Movies</h3>
        </div>

        <div className="bootstrapTable">
          <Table striped bordered condensed hover responsive >
            <thead>
              <tr>
                <th>Movie ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Average Rating</th>
                <th>Highest Rating</th>
                <th>Lowest Rating</th>
                <th># Ratings</th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie,index) => {
                if (index >= this.state.firstRow && index <= this.state.lastRow) {
                  var movie_ratings = []
                  var max_rating = 0;
                  var min_rating = 5;
                  this.state.ratings.map((rating,index) => {
                    if (rating.MovieID === movie.MovieID) {
                      movie_ratings.push(rating.Rating)
                    }
                    if (rating.Rating > max_rating) {
                      max_rating = rating.Rating;
                    }
                    if (rating.Rating < min_rating) {
                      min_rating = rating.Rating;
                    }
                    return movie_ratings;
                  })
                  var sum = 0;
                  for (let i=0; i<movie_ratings.length; i++) {
                    sum += movie_ratings[i];
                  }
                  var avg_rating = (sum/movie_ratings.length);
                  return (
                    <tr key={index}>
                      <td>{movie.MovieID}</td>
                      <td>{movie.Title}</td>
                      <td>{movie.Genre}</td>
                      <td>{avg_rating.toFixed(1)}</td>
                      <td>{max_rating}</td>
                      <td>{min_rating}</td>
                      <td>{movie_ratings.length}</td>
                    </tr>
                  )
                }
                else return null
              })}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.First onClick={() => {this.firstPage()}} />
            <Pagination.Prev onClick={() => {this.decrementPage()}} />
            <Pagination.Next onClick={() => {this.incrementPage()}} />
            <Pagination.Last onClick={() => {this.lastPage()}} />
          </Pagination>

        </div>

      </div>
    );
  }
}
