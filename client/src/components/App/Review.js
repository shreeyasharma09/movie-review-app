// import React, { useState } from 'react';
// import { Grid, Typography, Button } from '@mui/material';
// import MovieSelection from './MovieSelection';
// import ReviewTitle from './ReviewTitle';
// import ReviewBody from './ReviewBody';
// import ReviewRating from './ReviewRating';

// function Review() {
//   const [movies, setMovies] = useState([
//     'Movie 1',
//     'Movie 2',
//     'Movie 3',
//     'Movie 4',
//     'Movie 5',
//   ]);
//   const [selectedMovie, setSelectedMovie] = useState('');
//   const [enteredTitle, setEnteredTitle] = useState('');
//   const [enteredReview, setEnteredReview] = useState('');
//   const [selectedRating, setSelectedRating] = useState('');
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleMovieChange = (event) => {
//     setSelectedMovie(event.target.value);
//     setErrors((prevErrors) => ({ ...prevErrors, selectedMovie: false }));
//     setShowConfirmation(false);
//   };

//   const handleTitleChange = (event) => {
//     setEnteredTitle(event.target.value);
//     setErrors((prevErrors) => ({ ...prevErrors, enteredTitle: false }));
//     setShowConfirmation(false);
//   };

//   const handleReviewChange = (event) => {
//     setEnteredReview(event.target.value);
//     setErrors((prevErrors) => ({ ...prevErrors, enteredReview: false }));
//     setShowConfirmation(false);
//   };

//   const handleRatingChange = (event) => {
//     setSelectedRating(event.target.value);
//     setErrors((prevErrors) => ({ ...prevErrors, selectedRating: false }));
//     setShowConfirmation(false);
//   };

//   const handleSubmit = () => {
//     let hasErrors = false;
//     const newErrors = {};

//     if (!selectedMovie) {
//       newErrors.selectedMovie = true;
//       hasErrors = true;
//     }
//     if (!enteredTitle) {
//       newErrors.enteredTitle = true;
//       hasErrors = true;
//     }
//     if (!enteredReview) {
//       newErrors.enteredReview = true;
//       hasErrors = true;
//     }
//     if (!selectedRating) {
//       newErrors.selectedRating = true;
//       hasErrors = true;
//     }

//     if (hasErrors) {
//       setErrors(newErrors);
//       setShowConfirmation(false);
//     } else {
//       setShowConfirmation(true);
//       setErrors({});
//     }
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <Typography variant="h3">Review a movie</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <MovieSelection
//           movies={movies}
//           selectedMovie={selectedMovie}
//           handleMovieChange={handleMovieChange}
//         />
//         {errors.selectedMovie && <Typography color="red">Select your movie</Typography>}
//       </Grid>
//       <Grid item xs={12}>
//         <ReviewTitle enteredTitle={enteredTitle} handleTitleChange={handleTitleChange} />
//         {errors.enteredTitle && <Typography color="red">Enter your review title</Typography>}
//       </Grid>
//       <Grid item xs={12}>
//         <ReviewBody enteredReview={enteredReview} handleReviewChange={handleReviewChange} />
//         {errors.enteredReview && <Typography color="red">Enter your review</Typography>}
//       </Grid>
//       <Grid item xs={12}>
//         <ReviewRating selectedRating={selectedRating} handleRatingChange={handleRatingChange} />
//         {errors.selectedRating && <Typography color="red">Select the rating</Typography>}
//       </Grid>
//       <Grid item xs={12}>
//         <Button variant="contained" color="primary" onClick={handleSubmit} id="submit-button">
//           Submit
//         </Button>
//       </Grid>
//       {showConfirmation && (
//         <Grid item xs={12}>
//           <Typography variant="h6" id="confirmation-message">Your review has been received</Typography>
//           <Typography variant="subtitle1">Movie: {selectedMovie}</Typography>
//           <Typography variant="subtitle1">Review Title: {enteredTitle}</Typography>
//           <Typography variant="subtitle1">Review Body: {enteredReview}</Typography>
//           <Typography variant="subtitle1">Rating: {selectedRating}</Typography>
//         </Grid>
//       )}
//     </Grid>
//   );
// }

// export default Review;

import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

const Review = () => {

  const [movies, setMovies] = React.useState([]);

  const [selectedMovie, setSelectedMovie] = React.useState('');
  const [enteredTitle, setEnteredTitle] = React.useState('');
  const [enteredReview, setEnteredReview] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');

  const [movieError, setMovieError] = React.useState(false);
  const [titleError, setTitleError] = React.useState(false);
  const [bodyError, setBodyError] = React.useState(false);
  const [ratingError, setRatingError] = React.useState(false);
  const [filled, setSubmit] = React.useState(false);
  const [userID, setUserID] = React.useState(1); 

	React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/getMovies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
        });
        const data = await response.json();
        setMovies(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleenteredReview = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleselectedRating = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedMovie) {
      setMovieError(true);
    }
    else {
      setMovieError(false)
    }
    if (!enteredTitle) {
      setTitleError(true);
    }
    else {
      setTitleError(false);
    }
    if (!enteredReview) {
      setBodyError(true);
    }
    else {
      setBodyError(false);
    }
    if (!selectedRating) {
      setRatingError(true);
    }
    else{
      setRatingError(false);
    }
    if (selectedMovie && enteredTitle && enteredReview && selectedRating) {
      setSubmit(true);
      try {
        const response = await fetch('/api/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID: userID,
            movieID: selectedMovie,
            reviewTitle: enteredTitle,
            reviewContent: enteredReview,
            reviewScore: selectedRating
          })
        });
        if (response.ok) {
          console.log('Review submitted successfully');
        } else {
          console.error('Error submitting review');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      setSubmit(false);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '0px', marginTop: '10px' }}>
          <Typography variant="h3" style={{ margin: 0 }}>Review a Movie</Typography>
          <Typography variant="body1">Select one of the movies from the dropdown:</Typography>
        </Grid>
        <Grid item xs={12}  style={{ textAlign: 'center'}}>
          <MovieSelection
            movies={movies}
            selectedMovie={selectedMovie}
            handleMovieChange={handleMovieChange}
            movieError={movieError}
          />
          <hr style={{ marginTop: '20px'}} width="100%" size="1"></hr>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: '24px', paddingRight: '24px'}}>
          <Typography variant="h5" style={{ margin: 0 }}>Enter Review Here</Typography>
          <Typography variant="body1" style={{ margin: 0 }}>Please enter in your review title and review (200 char. limit) in respective sections:</Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: '16px', textAlign: 'left', margin: 0 }}>
          <ReviewTitle 
            enteredTitle={enteredTitle}
            handleTitleChange={handleTitleChange}
            titleError={titleError}
          />
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: '24px', textAlign: 'left' }}>
          <ReviewBody 
            enteredReview={enteredReview}
            handleenteredReview={handleenteredReview}
            bodyError={bodyError}
          />
        </Grid>
        <Grid item xs={12} style={{ paddingLeft: '24px', textAlign: 'left' }}>
        <Typography variant="h5" style={{ margin: 0 }}>Enter Rating Here</Typography>
        <Typography variant="body1" style={{ marginBottom: '15px' }}>Please rate the movie from 1 to 5 (1 being worst, 5 being best):</Typography>
          <FormControl>
            <FormLabel id="review-rating-group">Movie Ratings:</FormLabel>
            <ReviewRating 
              selectedRating={selectedRating}
              handleselectedRating={handleselectedRating}
              ratingError={ratingError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
        <Typography variant="body1" style={{ marginBottom: '15px' }}>Please hit this 'Submit' button after filling out all fields:</Typography>
          <Button variant="contained" color="primary" onClick={handleSubmit} id="submit-button">
            Submit
          </Button>
        </Grid>
          {filled && (
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
              <Typography id='confirmation-message' variant='h5'>Your review has been received</Typography>
              <Typography variant='body1'>Movie: {movies.find(movie => movie.id === selectedMovie)?.name}</Typography>
              <Typography variant='body1'>Title: {enteredTitle}</Typography>
              <Typography variant='body1'>Review: {enteredReview}</Typography>
              <Typography style={{ marginBottom: '20px' }} variant='body1'>Rating: {selectedRating}</Typography>
            </Grid>
          )}
        </Grid>
    </div>
  );
}

export default Review;
