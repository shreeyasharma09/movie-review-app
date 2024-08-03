
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
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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
        console.log(data);
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
    } else {
      setMovieError(false);
    }
    if (!enteredTitle) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!enteredReview) {
      setBodyError(true);
    } else {
      setBodyError(false);
    }
    if (!selectedRating) {
      setRatingError(true);
    } else {
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
    <Box sx={{ backgroundColor: '#F5EEF8', minHeight: '100vh', padding: '1px' }}>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box sx={{ p: 4, borderRadius: 4, boxShadow: 5, backgroundColor: 'white' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '0px', marginTop: '10px' }}>
              <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3' }}>
                Review a Movie
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                Select one of the movies from the dropdown:
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <MovieSelection
                movies={movies}
                selectedMovie={selectedMovie}
                handleMovieChange={handleMovieChange}
                movieError={movieError}
              />
              <hr style={{ marginTop: '20px' }} width="100%" size="1"></hr>
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: '24px', paddingRight: '24px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3' }}>
                Enter Review Here
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                Please enter in your review title and review (200 char. limit) in respective sections:
              </Typography>
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
              <Typography variant="h5" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3' }}>
                Enter Rating Here
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }} style={{ marginBottom: '15px' }}>
                Please rate the movie from 1 to 5 (1 being worst, 5 being best):
              </Typography>
              <FormControl>
                <FormLabel id="review-rating-group" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  Movie Ratings:
                </FormLabel>
                <ReviewRating
                  selectedRating={selectedRating}
                  handleselectedRating={handleselectedRating}
                  ratingError={ratingError}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '16px' }}>
              <Typography variant="body1" sx={{ mb: '2px', fontFamily: 'Georgia', fontWeight: 400, color: '#333' }} style={{ marginBottom: '6px' }}>
                Please hit this 'Submit' button after filling out all fields:
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                id="submit-button"
                sx={{
                  backgroundColor: '#C39BD3',
                  fontFamily: 'Georgia',
                  fontWeight: 400,
                  '&:hover': {
                    backgroundColor: '#AF7AC5'
                  }
                }}
              >
                Submit
              </Button>
            </Grid>
            {filled && (
              <Grid item xs={12} style={{ textAlign: 'center', marginTop: '2px' }}>
                <Typography id='confirmation-message' variant='h5' sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3' }}>
                  Your review has been received
                </Typography>
                <Typography variant='body1' sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  Movie: {movies.find(movie => movie.id === selectedMovie)?.name}
                </Typography>
                <Typography variant='body1' sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  Title: {enteredTitle}
                </Typography>
                <Typography variant='body1' sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  Review: {enteredReview}
                </Typography>
                <Typography variant='body1' sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }} style={{ marginBottom: '10px' }}>
                  Rating: {selectedRating}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Review;
