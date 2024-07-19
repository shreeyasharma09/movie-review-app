import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import AppBarComponent from '../AppBar';

const Landing = () => {
  return (
    <div>
      <AppBarComponent />
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3', mb: 4 }}>
          Welcome to Movie Review For You!
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'Georgia', fontWeight: 400, color: '#333', mb: 4 }}>
          This site is for all your favorite movies!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/search"
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
            component={Link}
            to="/review"
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
            component={Link}
            to="/mypage"
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
      </Container>
    </div>
  );
}

export default Landing;
