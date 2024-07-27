import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import AppBarComponent from '../AppBar';

const MyPage = () => {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [enteredName, setEnteredName] = useState('');

  const handleClose = () => {
    setEnteredName(name);
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#EBDEF0', minHeight: '100vh' }}>
      <AppBarComponent />
      <Container maxWidth="sm" sx={{ textAlign: 'center', pt: 8 }}>
        <Box
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: 5,
            backgroundColor: 'white'
          }}
        >
          <Typography variant="h3" sx={{ fontFamily: 'Georgia', fontWeight: 600, color: '#C39BD3', mb: 4 }}>
            Welcome to your Personal Page{enteredName && `, ${enteredName}`}!
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
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Your Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your name to personalize your experience.
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
