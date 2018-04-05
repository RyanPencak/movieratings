import './MovieReviews.css'
import React from 'react';
import { Button, Glyphicon, Grid, Col, Row } from 'react-bootstrap';

export default function MovieReviews(props) {

  return (
    <div className="MovieReviews">
      <div className="header">
        <h3 id="review"> {props.movie.Title.slice(0,-6)} </h3>
        <a href="#topOfPage"><Button id="upBtn" bsStyle="default" bsSize="small" onClick={() => {props.disableReviewDisplay()}}><Glyphicon glyph="remove" /></Button></a>
      </div>
      <div className="information">
        <h4>Genres: {props.movie.Genre.replace(/\|/g,', ')}</h4>
        <h4>Date: {props.movie.Title.slice(-5,props.movie.Title.length-1)}</h4>
      </div>
      <div className="reviewContainer">
        <Grid>
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <h3>Ratings</h3>
            </Row>
            {
              props.ratings.map(function(rating, i) {
                return(
                  <div key={rating.RatingID} className='rating'>
                    <Row className="show-grid">
                      <h4>{rating.Rating}</h4>
                    </Row>
                  </div>
                )
              })
            }
          </Col>
          <Col xs={12} md={6}>
            <Row className="show-grid">
              <h3>Tags</h3>
            </Row>
            {
              props.tags.map(function(tag, i) {
                return(
                  <div key={tag.TagID} className='tag'>
                  <Row className="show-grid">
                      <h4>{tag.Tag}</h4>
                  </Row>
                </div>
                )
              })
            }
          </Col>
        </Grid>
        </div>
      </div>
  );
}
