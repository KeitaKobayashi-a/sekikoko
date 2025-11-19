// Home.jsx みたいな親コンポーネントを想定
import { Box, Grid } from '@mui/material';
import SignIn from './SignIn';
import Client from './Client';

export default function Reception() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SignIn />
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Client /> 
        </Grid>
      </Grid>
    </Box>
  );
}
