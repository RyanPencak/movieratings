import './Ratings.css';
import MovieReviews from '../MovieReviews/MovieReviews.js'
import React, { Component } from 'react';
import { Table, Pagination, Glyphicon, Button, Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';
import axios from 'axios';

export default class BatteryLog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      users: [],
      ratings: [],
      tags: [],

      selectedMovie: null,
      selectedMovieRatings: [],
      selectedMovieTags: [],

      postRatingData: {
        RatingID: null,
        UserID: null,
        MovieID: null,
        Rating: null,
        Time: null
      },

      postTagData: {
        TagID: null,
        RatingID: null,
        MovieID: null,
        Tag: null,
        Time: null
      },

      movieTitleSearchTerm: '',
      movieGenreSearchTerm: '',
      userNameSearchTerm: '',
      userStateSearchTerm: '',

      moviePageCounter: 1,
      firstMovieRow: 0,
      lastMovieRow: 9,
      userPageCounter: 1,
      firstUserRow: 0,
      lastUserRow: 9,
      viewMovieSize: 10,
      viewUserSize: 10,

      displayForm: false,
      displayUsers: false,
      displayReviews: false
    };

    this.getData = this.getData.bind(this);
    this.incrementMoviePage = this.incrementMoviePage.bind(this);
    this.decrementMoviePage = this.decrementMoviePage.bind(this);
    this.firstMoviePage = this.firstMoviePage.bind(this);
    this.lastMoviePage = this.lastMoviePage.bind(this);
    this.incrementUserPage = this.incrementUserPage.bind(this);
    this.decrementUserPage = this.decrementUserPage.bind(this);
    this.firstUserPage = this.firstUserPage.bind(this);
    this.lastUserPage = this.lastUserPage.bind(this);
    this.onMovieTitleSearchTermChange = this.onMovieTitleSearchTermChange.bind(this);
    this.onMovieGenreSearchTermChange = this.onMovieGenreSearchTermChange.bind(this);
    this.onUserNameSearchTermChange = this.onUserNameSearchTermChange.bind(this);
    this.onUserStateSearchTermChange = this.onUserStateSearchTermChange.bind(this);
    this.searchByMovieTitle = this.searchByMovieTitle.bind(this);
    this.searchByGenre = this.searchByGenre.bind(this);
    this.searchByUserName = this.searchByUserName.bind(this);
    this.searchByUserState = this.searchByUserState.bind(this);
    this.setMovieViewSize = this.setMovieViewSize.bind(this);
    this.setUserViewSize = this.setUserViewSize.bind(this);
    this.disableReviewDisplay = this.disableReviewDisplay.bind(this);
    this.toggleUserSection = this.toggleUserSection.bind(this);
    this.toggleFormSection = this.toggleFormSection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userIdChange = this.userIdChange.bind(this);
    this.movieIdChange = this.movieIdChange.bind(this);
    this.ratingChange = this.ratingChange.bind(this);
    this.tagChange = this.tagChange.bind(this);
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
        // console.log(data);
        this.setState({
          ratings: data
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios.get('/api/tags')
      .then(({data}) => {
        console.log(data);
        this.setState({
          tags: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  incrementMoviePage() {
    let currentPage = this.state.moviePageCounter;

    if (currentPage < (Math.ceil(this.state.movies.length / this.state.viewMovieSize))) {
      currentPage += 1;
    }
    this.setState({
      moviePageCounter: currentPage,
      firstMovieRow: (this.state.viewMovieSize*currentPage) - this.state.viewMovieSize,
      lastMovieRow: (this.state.viewMovieSize*currentPage) - 1
    })
  }

  decrementMoviePage() {
    let currentPage = this.state.moviePageCounter;

    if (currentPage > 1) {
      currentPage -= 1;
    }
    this.setState({
      moviePageCounter: currentPage,
      firstMovieRow: (this.state.viewMovieSize*currentPage) - this.state.viewMovieSize,
      lastMovieRow: (this.state.viewMovieSize*currentPage) - 1
    })
  }

  firstMoviePage() {
    this.setState({
      moviePageCounter: 1,
      firstMovieRow: 0,
      lastMovieRow: this.state.viewMovieSize - 1
    })
  }

  lastMoviePage() {

    let currentPage = Math.ceil(this.state.movies.length / this.state.viewMovieSize);
    let endRow = this.state.movies.length;
    endRow -= 1;
    let startRow = 0;

    if ((currentPage % this.state.viewMovieSize) === 0) {
      startRow = endRow - this.state.viewMovieSize;
    }
    else {
      startRow = endRow - (currentPage % this.state.viewMovieSize);
    }

    this.setState({
      moviePageCounter: currentPage,
      firstMovieRow: startRow,
      lastMovieRow: endRow
    })
  }

  incrementUserPage() {
    let currentPage = this.state.userPageCounter;

    if (currentPage < (Math.ceil(this.state.users.length / this.state.viewUserSize))) {
      currentPage += 1;
    }
    this.setState({
      userPageCounter: currentPage,
      firstUserRow: (this.state.viewUserSize*currentPage) - this.state.viewUserSize,
      lastUserRow: (this.state.viewUserSize*currentPage) - 1
    })
  }

  decrementUserPage() {
    let currentPage = this.state.userPageCounter;

    if (currentPage > 1) {
      currentPage -= 1;
    }
    this.setState({
      userPageCounter: currentPage,
      firstUserRow: (this.state.viewUserSize*currentPage) - this.state.viewUserSize,
      lastUserRow: (this.state.viewUserSize*currentPage) - 1
    })
  }

  firstUserPage() {
    this.setState({
      userPageCounter: 1,
      firstUserRow: 0,
      lastUserRow: this.state.viewUserSize - 1
    })
  }

  lastUserPage() {

    let currentPage = Math.ceil(this.state.users.length / this.state.viewUserSize);
    let endRow = this.state.users.length;
    endRow -= 1;
    let startRow = 0;

    if ((currentPage % this.state.viewUserSize) === 0) {
      startRow = endRow - this.state.viewUserSize;
    }
    else {
      startRow = endRow - (currentPage % this.state.viewUserSize);
    }

    this.setState({
      userPageCounter: currentPage,
      firstUserRow: startRow,
      lastUserRow: endRow
    })
  }

  onMovieTitleSearchTermChange(event) {
    this.setState({
      movieTitleSearchTerm: event.target.value
    });
  }

  onMovieGenreSearchTermChange(event) {
    this.setState({
      movieGenreSearchTerm: event.target.value
    })
  }

  onUserNameSearchTermChange(event) {
    this.setState({
      userNameSearchTerm: event.target.value
    });
  }

  onUserStateSearchTermChange(event) {
    this.setState({
      userStateSearchTerm: event.target.value
    })
  }

  searchByMovieTitle(movie) {
    const newSearchTerm = this.state.movieTitleSearchTerm.toLowerCase();
    return movie.Title.toLowerCase().includes(newSearchTerm);
  }

  searchByGenre(movie) {
    const newSearchTerm = this.state.movieGenreSearchTerm.toLowerCase();
    return movie.Genre.toLowerCase().includes(newSearchTerm);
  }

  searchByUserName(user) {
    const newSearchTerm = this.state.userNameSearchTerm.toLowerCase();
    return user.Name.toLowerCase().includes(newSearchTerm);
  }

  searchByUserState(user) {
    const newSearchTerm = this.state.userStateSearchTerm.toLowerCase();
    return user.State.toLowerCase().includes(newSearchTerm);
  }

 setMovieViewSize(e) {
   if(e.target.value) {
     this.setState({
       viewMovieSize: e.target.value,
       moviePageCounter: 1,
       firstMovieRow: 0,
       lastMovieRow: e.target.value - 1
     });
   }
   else {
     this.setState({
       viewMovieSize: 10,
       moviePageCounter: 1,
       firstMovieRow: 0,
       lastMovieRow: 9
     });
   }
 }

 setUserViewSize(e) {
   if(e.target.value) {
     this.setState({
       viewUserSize: e.target.value,
       userPageCounter: 1,
       firstUserRow: 0,
       lastUserRow: e.target.value - 1
     });
   }
   else {
     this.setState({
       viewUserSize: 10,
       userPageCounter: 1,
       firstUserRow: 0,
       lastUserRow: 9
     });
   }
 }

 getMovieDetails(movie) {
   let ratings = [];
   let tags = [];
   for (let i=0; i<this.state.ratings.length; i+=1) {
     if(movie.MovieID === this.state.ratings[i].MovieID) {
       ratings.push(this.state.ratings[i]);
     }
   }
   for (let j=0; j<this.state.tags.length; j+=1) {
     if(movie.MovieID === this.state.tags[j].MovieID) {
       tags.push(this.state.tags[j]);
     }
   }
   this.setState({
      displayReviews: true,
      selectedMovie: movie,
      selectedMovieRatings: ratings,
      selectedMovieTags: tags
    });
    console.log(ratings);
    console.log(tags);
 }

 disableReviewDisplay() {
   this.setState({
     displayReviews: false
   });
 }

 toggleUserSection() {
   this.setState({
     displayUsers: !this.state.displayUsers
   })
 }

 toggleFormSection() {
   this.setState({
     displayForm: !this.state.displayForm
   })
  }

  handleSubmit(e) {
   e.preventDefault();
   if((this.state.postRatingData.Rating) < 0 || (this.state.postRatingData.Rating > 5)) {
     return(
       <div className="error">
         <h4>Rating Must be Between 0 and 5</h4>
       </div>
     )
   }
   else if(this.state.postRatingData.UserID === null || this.state.postRatingData.MovieID === null || this.state.postRatingData.Rating === null || this.state.postTagData.Tag === null) {
     return(
       <div className="error">
         <h4>All Fields Must Be Entered</h4>
       </div>
     )
   }
   else {
     axios({
       method: 'post',
       url: '/api/ratings',
       data: this.state.postRatingData
     })
     .then(function (res) {
       console.log(res);
     })
     .catch(function (err) {
       console.log(err);
     });
     axios({
       method: 'post',
       url: '/api/tags',
       data: this.state.postTagData
     })
     .then(function (res) {
       console.log(res);
     })
     .catch(function (err) {
       console.log(err);
     })
     .then(function (res) {
       window.location.reload();
     });
   }
  }

  userIdChange(e) {
    this.setState({
      postRatingData: {
        RatingID: this.state.ratings.length+1,
        UserID: parseInt(e.target.value,10),
        MovieID: this.state.postRatingData.MovieID,
        Rating: this.state.postRatingData.Rating,
        Time: new Date().getTime()
      }
    });
    this.setState({
      postTagData: {
        TagID: this.state.tags.length,
        RatingID: this.state.ratings.length+1,
        MovieID: this.state.postTagData.MovieID,
        Tag: this.state.postTagData.Tag,
        Time: new Date().getTime()
      }
    })
  }

  movieIdChange(e) {
    this.setState({
      postRatingData: {
        RatingID: this.state.ratings.length+1,
        UserID: this.state.postRatingData.UserID,
        MovieID: parseInt(e.target.value,10),
        Rating: this.state.postRatingData.Rating,
        Time: new Date().getTime()
      }
    });
    this.setState({
      postTagData: {
        TagID: this.state.tags.length,
        RatingID: this.state.ratings.length+1,
        MovieID: parseInt(e.target.value,10),
        Tag: this.state.postTagData.Tag,
        Time: new Date().getTime()
      }
    })
  }

  ratingChange(e) {
    this.setState({
      postRatingData: {
        RatingID: this.state.ratings.length+1,
        UserID: this.state.postRatingData.UserID,
        MovieID: this.state.postRatingData.MovieID,
        Rating: parseInt(e.target.value,10),
        Time: new Date().getTime()
      }
    });
  }

  tagChange(e) {
    this.setState({
      postTagData: {
        TagID: this.state.tags.length,
        RatingID: this.state.ratings.length+1,
        MovieID: this.state.postRatingData.MovieID,
        Tag: "\"" + e.target.value + "\"",
        Time: new Date().getTime()
      }
    });
  }

  render() {

    return (
      <div className="Ratings">

        <div className="scoreboard">
          <div className="counter">
            <h3>Number of Movies</h3>
            <p>{this.state.movies.length}</p>
          </div>

          <div className="counter">
            <h3>Number of Users</h3>
            <p>{this.state.users.length}</p>
          </div>

          <div className="counter">
            <h3>Number of Ratings</h3>
            <p>{this.state.ratings.length}</p>
          </div>

          <div className="counter">
            <h3>Number of Tags</h3>
            <p>{this.state.tags.length}</p>
          </div>
        </div>

        {
          !this.state.displayForm
          ?
          <div className="formDropdown">
            <a href="#formSection"><Button id="formToggleButton" bsStyle="default" bsSize="small" onClick={() => {this.toggleFormSection()}}><Glyphicon glyph="chevron-down" /> <b>Review a Movie</b> <Glyphicon glyph="chevron-down" /></Button></a>
          </div>
          : null

        }

        {
          this.state.displayForm
          ?
          <div id="formSection" className="formContainer">
            <a href="#topOfPage"><Button id="formToggleButton" bsStyle="default" bsSize="small" onClick={() => {this.toggleFormSection()}}><Glyphicon glyph="chevron-up" /> <b>Review a Movie</b> <Glyphicon glyph="chevron-up" /></Button></a>
            <Col>
              <h4>Add a Rating</h4>

              <Form onSubmit={this.handleSubmit} ref="form">
                <FormGroup controlId="formHorizontalEmail" onChange={this.userIdChange}>
                  <Col componentClass={ControlLabel} sm={2}>
                    User ID
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Enter Your User ID" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" onChange={this.movieIdChange}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Movie ID
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Enter a Movie ID" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" onChange={this.ratingChange}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Rating
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Enter a rating from 0 (worst) to 5 (best)" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword" onChange={this.tagChange}>
                  <Col componentClass={ControlLabel} sm={2}>
                    Tag
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="Enter a tag" />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button type="submit">Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Col>
          </div>
          : null

        }

        {
          !this.state.displayUsers
          ?
          <div className="userDropdown">
            <a href="#userSection"><Button id="userToggleButton" bsStyle="default" bsSize="small" onClick={() => {this.toggleUserSection()}}><Glyphicon glyph="chevron-down" /> <b>User Menu</b> <Glyphicon glyph="chevron-down" /></Button></a>
          </div>
          : null

        }

        {
          this.state.displayUsers
          ?
          <div id="userSection" className="userContainer">
            <div className="header">
              <a href="#topOfPage"><Button id="userToggleButton" bsStyle="default" bsSize="small" onClick={() => {this.toggleUserSection()}}><Glyphicon glyph="chevron-up" /> <b>User Menu</b> <Glyphicon glyph="chevron-up" /></Button></a>
              <h3>Users</h3>
            </div>


            <div className="userSearch">
              <div className="userNameSearchBar">
                <input type="search" className="form-control search-form" placeholder="Search User Name" onChange={this.onUserNameSearchTermChange}/>
              </div>

              <div className="userStateSearchBar">
                <input type="search" className="form-control search-form" placeholder="Search User State" onChange={this.onUserStateSearchTermChange}/>
              </div>

              <div className="userViewSizeBar">
                <input type="search" className="form-control search-form" placeholder="View" onChange={this.setUserViewSize}/>
              </div>
            </div>

            <div className="userTable">
              <Table striped bordered condensed hover responsive >
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.filter(this.searchByUserName).filter(this.searchByUserState).map((user,index) => {
                    if (index >= this.state.firstUserRow && index <= this.state.lastUserRow) {
                      return (
                        <tr key={index}>
                          <td>{user.UserID}</td>
                          <td>{user.Name}</td>
                          <td>{user.State}</td>
                        </tr>
                      )
                    }
                    else return null
                  })}
                </tbody>
              </Table>

              <Pagination>
                <Pagination.First onClick={() => {this.firstUserPage()}} />
                <Pagination.Prev onClick={() => {this.decrementUserPage()}} />
                <Pagination.Next onClick={() => {this.incrementUserPage()}} />
                <Pagination.Last onClick={() => {this.lastUserPage()}} />
              </Pagination>

            </div>
          </div>
          : null
        }

        <div className="header">
          <h3>Movies</h3>
        </div>

        <div className="movieSearch">
          <div className="movieTitleSearchBar">
            <input type="search" className="form-control search-form" placeholder="Search Movie Title" onChange={this.onMovieTitleSearchTermChange}/>
          </div>

          <div className="movieGenreSearchBar">
            <input type="search" className="form-control search-form" placeholder="Search Movie Genre" onChange={this.onMovieGenreSearchTermChange}/>
          </div>

          <div className="movieViewSizeBar">
            <input type="search" className="form-control search-form" placeholder="View" onChange={this.setMovieViewSize}/>
          </div>
        </div>

        <div className="movieTable">
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
                <th>Quality</th>
                <th>Read Reviews</th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.filter(this.searchByMovieTitle).filter(this.searchByGenre).map((movie,index) => {
                if (index >= this.state.firstMovieRow && index <= this.state.lastMovieRow) {
                  var movie_ratings = []
                  var max_rating = 0;
                  var min_rating = 5;
                  var avg_rating = 0;
                  var report_max_rating = 0;
                  var report_min_rating = 0;
                  this.state.ratings.map((rating,index) => {
                    if (rating.MovieID === movie.MovieID) {
                      movie_ratings.push(rating.Rating);
                      if (rating.Rating > max_rating) {
                        max_rating = rating.Rating;
                      }
                      if (rating.Rating < min_rating) {
                        min_rating = rating.Rating;
                      }
                    }
                    return movie_ratings;
                  })
                  var sum = 0;
                  for (let i=0; i<movie_ratings.length; i++) {
                    sum += movie_ratings[i];
                  }
                  if (movie_ratings.length > 0) {
                    avg_rating = (sum/movie_ratings.length).toFixed(1);
                    report_min_rating = min_rating;
                    report_max_rating = max_rating;
                  }
                  else {
                    avg_rating = 'N/A';
                    report_min_rating = 'N/A';
                    report_max_rating = 'N/A';
                  }
                  return (
                    <tr key={index}>
                      <td>{movie.MovieID}</td>
                      <td>{movie.Title}</td>
                      <td>{movie.Genre.replace(/\|/g,', ')}</td>
                      <td>{avg_rating}</td>
                      <td>{report_max_rating}</td>
                      <td>{report_min_rating}</td>
                      <td>{movie_ratings.length}</td>
                      <td>{ (avg_rating > 2.5) ? <Glyphicon glyph="thumbs-up" /> : <Glyphicon glyph="thumbs-down" /> }</td>
                      <td> <a href="#review"><Button bsStyle="default" bsSize="small" onClick={() => {this.getMovieDetails(movie)}}><Glyphicon glyph="eye-open" /></Button></a> </td>
                    </tr>
                  )
                }
                else return null
              })}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.First onClick={() => {this.firstMoviePage()}} />
            <Pagination.Prev onClick={() => {this.decrementMoviePage()}} />
            <Pagination.Next onClick={() => {this.incrementMoviePage()}} />
            <Pagination.Last onClick={() => {this.lastMoviePage()}} />
          </Pagination>

        </div>

        {
          this.state.displayReviews
          ?
          <MovieReviews
            movie={this.state.selectedMovie}
            ratings={this.state.selectedMovieRatings}
            tags={this.state.selectedMovieTags}
            disableReviewDisplay={this.disableReviewDisplay}
          />
          : null
        }

      </div>
    );
  }
}
