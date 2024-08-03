import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import AppBarComponent from '../AppBar';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#EBDEF0', minHeight: '100vh' }}>
      <AppBarComponent />
      <Container maxWidth="sm" sx={{ textAlign: 'center', pt: 8 }}>
        <Box
          sx={{
            p: 5,
            borderRadius: 4,
            boxShadow: 5,
            backgroundColor: 'white'
          }}
        >
          <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3', mb: 4 }}>
            Welcome to Movie Review For You!
          </Typography>
          <Typography variant="h5" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333', mb: 4 }}>
            This site is for all your favorite movies!
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333', mb: 4 }}>
            Look at posters, write comments and reviews, & more!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/search')}
              sx={{
                backgroundColor: '#C39BD3',
                fontFamily: 'Georgia',
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#AF7AC5'
                }
              }}
            >
              Search Movies
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/review')}
              sx={{
                backgroundColor: '#C39BD3',
                fontFamily: 'Georgia',
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#AF7AC5'
                }
              }}
            >
              Write a Review
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/mypage')}
              sx={{
                backgroundColor: '#C39BD3',
                fontFamily: 'Georgia',
                fontWeight: 400,
                '&:hover': {
                  backgroundColor: '#AF7AC5'
                }
              }}
            >
              My Page
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Landing;
