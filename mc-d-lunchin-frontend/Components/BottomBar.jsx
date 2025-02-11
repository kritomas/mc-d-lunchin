import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const BottomBar = () => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#333', 
        top: 'auto', 
        bottom: 0,
        width: '100%',
        left: 0,
        right: 0,
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Container maxWidth="100%" sx={{ padding: '0 20px' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Box 
            sx={{ 
              width: '100%', 
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              py: 2
            }}
          >
            <Typography variant="body2" align="center" color="inherit">
              &copy; {new Date().getFullYear()} MC D. Lunchin All rights reserved.
            </Typography>
            <Typography variant="body2" align="center" color="inherit">
              <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
                Privacy Policy
              </Link>
              |
              <Link href="#" color="inherit" underline="none" sx={{ mx: 1 }}>
                Terms of Service
              </Link>
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default BottomBar;
