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
        console.log(data);
        this.setState({
          movies: data
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('/api/users')
      .then(({data}) => {
        console.log(data);
        this.setState({
          users: data
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

    let currentPage = Math.ceil(this.state.batteryData.length / 10);
    let endRow = this.state.batteryData.length;
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
          <h3>Ratings</h3>
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
                  return (
                    <tr key={movie.MovieID}>
                      <td>{movie.MovieID}</td>
                      <td>{movie.Title}</td>
                      <td>{movie.Genre}</td>
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
