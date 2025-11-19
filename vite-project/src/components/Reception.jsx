import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SignIn from './SignIn';
import Client from './Client';

export default function Reception() {
  return (
    <Box sx={{ flexGrow: 1 , height: '100vh' }}>
      <Grid container spacing={2} sx={{height: '100%'}}>
        <Grid p={3} size={9} sx={{height: '100%' }}>
          <Client />
        </Grid>
        <Grid p={3} size={3} sx={{ bgcolor: ' #edf5efff' , height: '100%' }}>
          <SignIn />
        </Grid>
      </Grid>
    </Box>
  );
}
