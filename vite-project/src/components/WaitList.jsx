import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import { SeatContext } from '../context/SeatContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#dd0909db',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function WaitList() {
const {waitList, setWaitList} = useContext(SeatContext)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {waitList.map((ticket) => {
          return (
              <Grid key={ticket} size={4}>
                <Item >{ticket}</Item>
              </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
