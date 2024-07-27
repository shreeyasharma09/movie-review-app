import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function AppBarComponent() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#C39BD3' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins', fontWeight: 600 }}>
            Movie Review For You!
          </Typography>
          <Button id="nav-landing" color="inherit" component={Link} to="/" sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>Landing</Button>
          <Button id="nav-search" color="inherit" component={Link} to="/Search" sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>Search</Button>
          <Button id="nav-review" color="inherit" component={Link} to="/Review" sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>Review</Button>
          <Button id="nav-myPage" color="inherit" component={Link} to="/MyPage" sx={{ fontFamily: 'Georgia;', fontWeight: 400 }}>My Page</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}