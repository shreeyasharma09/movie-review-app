
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

export default function AppBarComponent() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#C39BD3' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins', fontWeight: 600 }}>
            Movie Review For You!
          </Typography>
          <Button id="nav-landing" color="inherit" onClick={() => navigate('/')} sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>Landing</Button>
          <Button id="nav-search" color="inherit" onClick={() => navigate('/Search')} sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>Search</Button>
          <Button id="nav-review" color="inherit" onClick={() => navigate('/Review')} sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>Review</Button>
          <Button id="nav-myPage" color="inherit" onClick={() => navigate('/MyPage')} sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>My Page</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
