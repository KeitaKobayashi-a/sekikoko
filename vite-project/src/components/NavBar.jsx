import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import { useContext, useState } from 'react';
import { SeatContext } from '../context/SeatContext';

export default function NavBar() {
  const { setSeats, setIsClient, loginUser } = useContext(SeatContext);
  const handleReception = async () => {
    const res = await fetch(`/seats`, { method: 'POST' });
    const json = await res.json();
    setSeats(json.data);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            席ココ {loginUser && `ようこそ${loginUser}`}
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => setIsClient(false)}
              variant="contained"
              color="secondary"
            >
              座席
            </Button>
            <Button
              onClick={() => setIsClient(true)}
              variant="contained"
              color="secondary"
            >
              受付
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
