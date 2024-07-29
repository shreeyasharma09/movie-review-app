import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, TextField, Grid } from '@mui/material';
import AppBarComponent from '../AppBar';

const Search = () => {
  const [title, setTitle] = useState('');
  const [actor, setActor] = useState('');
  const [director, setDirector] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!title && !actor && !director) {
      setOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/searchMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, actor, director }),
      });
      const data = await response.json();
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  console.log('Results', results)

  return (
    <Box sx={{ backgroundColor: '#F5EEF8', minHeight: '100vh' }}>
      <AppBarComponent />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box sx={{ p: 4, borderRadius: 4, boxShadow: 5, backgroundColor: 'white' }}>
          <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3', mb: 4 }}>
            Search Movie
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="search-title"
                label="Movie Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ fontFamily: 'Georgia', fontWeight: 400 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search-actor"
                label="Actor's First & Last Name"
                variant="outlined"
                fullWidth
                value={actor}
                onChange={(e) => setActor(e.target.value)}
                sx={{ fontFamily: 'Georgia', fontWeight: 400 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search-director"
                label="Director's First & Last Name"
                variant="outlined"
                fullWidth
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                sx={{ fontFamily: 'Georgia', fontWeight: 400 }}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                id="search-button"
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{
                  backgroundColor: '#C39BD3',
                  fontFamily: 'Georgia',
                  fontWeight: 400,
                  '&:hover': {
                    backgroundColor: '#AF7AC5'
                  }
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3' }}>
                Search Results
              </Typography>
              {results.map((movie, index) => (
                <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #C39BD3', borderRadius: 4 }}>
                  <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#333' }}>
                    {movie.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                    <strong>Movie Director(s):</strong> {movie.directors}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                    <strong>Average Rating:</strong> {movie.averageScore || 'N/A'}
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333' }}>
                    <strong>Movie Reviews:</strong> {movie.reviews ? movie.reviews.split('\n').map((review, i) => (
                      <Typography key={i} variant="body2" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333', display: 'block' }}>
                        {review}
                      </Typography>
                    )) : 'No reviews'}
                  </Typography>
                </Box>
              ))}
            </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
