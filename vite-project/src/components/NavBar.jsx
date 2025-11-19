import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import { SeatContext } from '../context/SeatContext';
import Chip from '@mui/material/Chip';

export default function NavBar() {
  const { setIsClient, loginUser,setLoginUser } = useContext(SeatContext);

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
            席ココ
          </Typography>
          <Stack spacing={2} direction="row">
            {loginUser && (
              <Chip
                label={`ようこそ、${loginUser}さん`}
                size="large"
                variant="outlined"
                sx={{
                  ml: 2,
                  borderColor: 'rgba(255,255,255,0.7)',
                  color: 'rgba(255,255,255,0.9)',
                  bgcolor: 'rgba(255,255,255,0.12)',
                }}
              />
            )}
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
            <Button
              onClick={async () => {
                await fetch('/session', {
                  method: 'DELETE',
                  credentials: 'include',
                });
                setLoginUser('');
              }}
              variant="contained"
              color="secondary"
            >
              ログアウト
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
