import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { SeatContext } from '../context/SeatContext';
import { use, useContext, useState } from 'react';
import Typography from '@mui/material/Typography';

export default function Client() {
  const { isClient, setIsClient } = useContext(SeatContext);
  const [loc, setLoc] = useState(null);
  const [ticketNumber, setTicketNumber] = useState(null);
  if (!isClient) return;
  const handleReception = async () => {
    const res = await fetch(`/seats`, { method: 'POST' });
    const json = await res.json();
    setLoc(json.data.target.loc);
    setTicketNumber(json.ticketNumber);
  };
  return (
    <>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey', mt: 3 }}>
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
            {ticketNumber && (
              <>
                受付番号{ticketNumber}のお客様
                <br />
                {loc}番のお席にどうぞ
              </>
            )}
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
