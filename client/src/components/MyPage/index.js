import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';
import AppBarComponent from '../AppBar';

const MyPage = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [showPosters, setShowPosters] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const validMovies = [
    '12 Angry Men',
    '2001: A Space Odyssey',
    '3 Ninjas: High Noon at Mega Mountain',
    'Alien',
    'Aliens',
    'All About Eve',
    'All Quiet on the Western Front',
    'Amadeus',
    'American Beauty',
    'American History X',
    'American Ninja V',
    'Amores perros',
    'Anatomy of a Murder',
    'Anne B. Real',
    'Annie Hall',
    'Anus Magillicutty',
    'Apocalypse Now'
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/getRecentReviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/getMovies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchReviews();
    fetchMovies();
  }, []);

  const handleClose = () => {
    setEnteredName(name);
    setOpen(false);
  };

  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  const toggleShowPosters = () => {
    setShowPosters(!showPosters);
  };

  const toggleShowComments = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      try {
        const response = await fetch('/api/getAllComments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAllComments(data);
      } catch (error) {
        console.error('Error fetching all comments:', error);
      }
    }
  };

  const handleMovieSelect = async (event) => {
    const movieID = event.target.value;
    const selectedMovieName = movies.find(movie => movie.id === movieID)?.name;

    if (!validMovies.includes(selectedMovieName)) {
      setErrorMessage('Please choose one of the valid movies');
      setMoviePoster('');
      setComments([]);
      setComment('');
      return;
    }

    setSelectedMovie(movieID);
    setComments([]);
    setComment('');
    try {
      const response = await fetch('/api/getMoviePoster', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieID })
      });
      const data = await response.json();
      if (data.posterUrl) {
        setMoviePoster(data.posterUrl);
        setErrorMessage('');
      } else {
        setMoviePoster('');
        setErrorMessage('This movie does not have a poster');
      }
    } catch (error) {
      console.error('Error fetching movie poster:', error);
      setMoviePoster('');
      setErrorMessage('This movie does not have a poster');
    }

    try {
      const response = await fetch('/api/getComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieID })
      });
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveComment = async () => {
    try {
      await fetch('/api/saveComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieID: selectedMovie, comment })
      });
      
      const response = await fetch('/api/getComments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movieID: selectedMovie })
      });
      const data = await response.json();
      setComments(data);
      setComment(''); 
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#EBDEF0', minHeight: '100vh' }}>
      <AppBarComponent />
      <Box sx={{ mt: '16px',backgroundColor: 'white', py: 4, borderRadius: 4, boxShadow: 5}}>
        <Container maxWidth="lg" sx={{ textAlign: 'center', pt: 8 }}>
          <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3', mb: 4 }}>
            Welcome to your Personal Page{enteredName && `, ${enteredName}`}!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleShowReviews}
              sx={{
                backgroundColor: '#C39BD3',
                fontFamily: 'Georgia',
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#AF7AC5'
                }
              }}
            >
              {showReviews ? 'Hide Recent Reviews' : 'Show Recent Reviews'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleShowPosters}
              sx={{
                backgroundColor: '#C39BD3',
                fontFamily: 'Georgia',
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#AF7AC5'
                }
              }}
            >
              {showPosters ? 'Hide Movie Posters & Comments' : 'Show Movie Posters & Comments'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleShowComments}
              sx={{
                backgroundColor: '#C39BD3',
                fontFamily: 'Georgia',
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#AF7AC5'
                }
              }}
            >
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {showReviews && (
          <Box sx={{ mt: 4 }}>
            {reviews.map((review, index) => (
              <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #C39BD3', borderRadius: 4, backgroundColor: 'white' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#333' }}>
                  {review.reviewTitle}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  <strong>Movie Title:</strong> {review.movieTitle}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  <strong>Content:</strong> {review.reviewContent}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  <strong>Rating:</strong> {review.reviewScore}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        {showPosters && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ ml: 2, mr: 2, mt: 2, mb: 2, border: '0.5px solid #C39BD3', borderRadius: 4, backgroundColor: 'white', p: 1 }}>
              <Typography sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#C39BD3' }}>
                <h2>Click the Dropdown to Select a Movie to see its poster, and write some comments on!</h2>
                <h3>Please select from the following movies for demonstration purposes:</h3>
                <p>12 Angry Men, 2001: A Space Odyssey, 3 Ninjas: High Noon at Mega Mountain, Alien, Aliens, All About Eve, All Quiet on the Western Front, Amadeus, American Beauty, American History X, American Ninja V</p>
              </Typography>
            </Box>
            <FormControl fullWidth>
              <InputLabel>Select a Movie</InputLabel>
              <Select value={selectedMovie} onChange={handleMovieSelect}>
                {movies.map((movie) => (
                  <MenuItem key={movie.id} value={movie.id}>
                    {movie.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {moviePoster && (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <img src={moviePoster} alt={selectedMovie} style={{ width: '40%', borderRadius: '4px' }} />
              </Box>
            )}
            {selectedMovie && !errorMessage && (
              <Box sx={{ mt: 4 }}>
                <TextField
                  label="Your Comments"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={handleCommentChange}
                  variant="outlined"
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveComment}
                  sx={{
                    backgroundColor: '#C39BD3',
                    fontFamily: 'Georgia',
                    fontWeight: 400,
                    '&:hover': {
                      backgroundColor: '#AF7AC5'
                    },
                    mt: 2,
                    mb: 3
                  }}
                >
                  Save Comment
                </Button>
                <Box sx={{ mt: 4 }}>
                  {comments.map((comment, index) => (
                    <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #C39BD3', borderRadius: 4, backgroundColor: 'white' }}>
                      <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                        {comment.comment}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
          </Box>
        )}
        {showComments && (
          <Box sx={{ mt: 4 }}>
            {allComments.map((comment, index) => (
              <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #C39BD3', borderRadius: 4, backgroundColor: 'white' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#333' }}>
                  Comments on: {comment.movieTitle}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  {comment.comment}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Name:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyPage;
