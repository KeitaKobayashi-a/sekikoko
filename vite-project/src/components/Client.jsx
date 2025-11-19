import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { SeatContext } from '../context/SeatContext';
import {  useContext, useState } from 'react';
import Typography from '@mui/material/Typography';
import WaitList from './WaitList';

export default function Client() {
  const { isClient, setWaitList, ticketNumber, setTicketNumber } = useContext(SeatContext);
  const [loc, setLoc] = useState(null);


  if (!isClient) return;
  const handleReception = async () => {
    const res = await fetch(`/seats`, { method: 'POST' ,  credentials: 'include',});
    const json = await res.json();
    json.data.target.loc ? setLoc(json.data.target.loc) : setLoc(null) & setWaitList(pre => [...pre, json.ticketNumber]);
    setTicketNumber(json.ticketNumber);
    
  };
  return (
    <>
      <Box component="section" sx={{ p: 2, mt: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Button
            onClick={handleReception}
            variant="contained"
            size="large"
            sx={{ width: '50%', height: 80, fontSize: '1.5rem', mt: 3 }}
          >
            受付する
          </Button>
          <Typography align="center" variant="h3">
            {ticketNumber &&
              (loc ? (
                <>
                  受付番号{ticketNumber}のお客様
                  <br />
                  {loc}番のお席にどうぞ
                </>
              ) : (
                <>受付番号{ticketNumber}でお待ちください</>
              ))}
          </Typography>
        </Stack>
      </Box>
      <WaitList/>
    </>
  );
}
