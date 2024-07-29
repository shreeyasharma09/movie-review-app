// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Box, Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
// import AppBarComponent from '../AppBar';

// const MyPage = () => {
//   const [open, setOpen] = useState(true);
//   const [name, setName] = useState('');
//   const [enteredName, setEnteredName] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [showReviews, setShowReviews] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await fetch('/api/getRecentReviews', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
//         const data = await response.json();
//         setReviews(data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };
//     fetchReviews();
//   }, []);

//   const handleClose = () => {
//     setEnteredName(name);
//     setOpen(false);
//   };

//   const toggleShowReviews = () => {
//     setShowReviews(!showReviews);
//   };

//   return (
//     <Box sx={{ backgroundColor: '#EBDEF0', minHeight: '100vh' }}>
//       <AppBarComponent />
//       <Container maxWidth="sm" sx={{ textAlign: 'center', pt: 8 }}>
//         <Box
//           sx={{
//             p: 5,
//             borderRadius: 3,
//             boxShadow: 5,
//             backgroundColor: 'white'
//           }}
//         >
//           <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3', mb: 4 }}>
//             Welcome to your Personal Page{enteredName && `, ${enteredName}`}!
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={toggleShowReviews}
//             sx={{
//               backgroundColor: '#C39BD3',
//               fontFamily: 'Georgia',
//               fontWeight: 400,
//               '&:hover': {
//                 backgroundColor: '#AF7AC5'
//               }
//             }}
//           >
//             {showReviews ? 'Hide Recent Reviews' : 'Show Recent Reviews'}
//           </Button>
//         </Box>
//         {showReviews && (
//           <Box sx={{ mt: 4 }}>
//             {reviews.map((review, index) => (
//               <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #C39BD3', borderRadius: 4, backgroundColor: 'white' }}>
//                 <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#333' }}>
//                   {review.reviewTitle}
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
//                   <strong>Movie Title:</strong> {review.movieTitle}
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
//                   <strong>Content:</strong> {review.reviewContent}
//                 </Typography>
//                 <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
//                   <strong>Rating:</strong> {review.reviewScore}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         )}
//       </Container>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Enter Your Name:</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter your name:
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Name"
//             fullWidth
//             variant="outlined"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default MyPage;

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
  const [comments, setComments] = useState('');
  const [storedComments, setStoredComments] = useState({});

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
    'American Ninja V'
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

    const storedComments = JSON.parse(localStorage.getItem('movieComments') || '{}');
    setStoredComments(storedComments);

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

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleMovieSelect = async (event) => {
    const movieID = event.target.value;
    const selectedMovieName = movies.find(movie => movie.id === movieID)?.name;

    if (!validMovies.includes(selectedMovieName)) {
      setErrorMessage('This movie does not have a poster (Please pick top 10 movies from Dropdown)');
      setMoviePoster('');
      setComments('');
      return;
    }

    setSelectedMovie(movieID);
    setComments(storedComments[movieID] || '');
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
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };

  const handleSaveComment = () => {
    const updatedComments = { ...storedComments, [selectedMovie]: comments };
    setStoredComments(updatedComments);
    localStorage.setItem('movieComments', JSON.stringify(updatedComments));
  };

  return (
    <Box sx={{ backgroundColor: '#EBDEF0', minHeight: '100vh' }}>
      <AppBarComponent />
      <Box sx={{ mb: '20px', mt: '20px',backgroundColor: 'white', py: 4, borderRadius: 4, boxShadow: 5,}}>
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
          <Box sx={{ mt: 4, mb: '20px'}}>
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
              <Box sx={{ mt: 4 }}>
                <img src={moviePoster} alt={selectedMovie} style={{ width: '100%', borderRadius: '4px' }} />
              </Box>
            )}
            {selectedMovie && !errorMessage && (
              <Box sx={{ mt: 4 }}>
                <TextField
                  label="Your Comments"
                  multiline
                  rows={4}
                  value={comments}
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
                    mt: 2
                  }}
                >
                  Save Comment
                </Button>
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
            {Object.entries(storedComments).map(([movieID, comment], index) => (
              <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #C39BD3', borderRadius: 4, backgroundColor: 'white' }}>
                <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#333' }}>
                  Comment on: {movies.find(movie => movie.id === parseInt(movieID))?.name}
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                  {comment}
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
