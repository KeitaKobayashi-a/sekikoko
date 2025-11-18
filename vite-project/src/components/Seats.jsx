import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import { useContext } from 'react';
import { SeatContext } from '../context/SeatContext';

export default function Seats() {
  const {seats, setSeats, isClient, setIsClient} = useContext(SeatContext)
  if (isClient) return
  const seatGroups = Array.from({ length: 4 }, (_, g) =>
    Array.from({ length: 4 }, (_, i) => g * 4 + i + 1)
  );

  const parseGroup = (txt) => {
    const groups = ['A','B','C','D'];
    return groups[txt];
  };

  const isSeated= (seats, target) => {
    for (const seatObj of seats) {
      if (seatObj.loc === target && seatObj.is_seated) {
        return true
      }
    }
  }
  const whoSeated= (seats, target) => {
    for (const seatObj of seats) {
      if (seatObj.loc === target && seatObj.is_seated) {
        return `： 受付番号${seatObj.ticket_number}が着席中`
      }
    }
  }
  
  return (
    <Box sx={{ p: 3, display: 'flex', flexWrap: 'wrap', gap: 2,  height:'80vh', verticalAlign:'center',justifyContent: 'center',
    alignItems: 'center',}}>
      {seatGroups.map((group, index) => (
        <Card key={index} sx={{ width: '45%', minWidth: 220 }}>
          <CardContent>
            <Typography variant="h6"> {parseGroup(index)}</Typography>

            <Stack direction="row" spacing={1} mt={2} >
              <Box sx={{ flex: 1, border: '1px solid #00d9ffff', p: 1, bgcolor: isSeated(seats, group[0]) ? 'red' : '#00d9ffff'
  }}>
                {group[0]} {isSeated(seats, group[0])&& whoSeated(seats, group[0])}
              </Box>
              <Box sx={{ flex: 1, border: '1px solid #00d9ffff', p: 1, bgcolor: isSeated(seats, group[1]) ? 'red' : '#00d9ffff' }}>
                {group[1]} {isSeated(seats, group[1])&& whoSeated(seats, group[1])}
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} mt={1}>
              <Box sx={{ flex: 1, border: '1px solid #00d9ffff', p: 1, bgcolor: isSeated(seats, group[2]) ? 'red' : '#00d9ffff' }}>
                {group[2]}{isSeated(seats, group[2])&& whoSeated(seats, group[2])}
              </Box>
              <Box sx={{ flex: 1, border: '1px solid #00d9ffff', p: 1,bgcolor: isSeated(seats, group[3]) ? 'red' : '#00d9ffff' }}>
                {group[3]}{isSeated(seats, group[3])&& whoSeated(seats, group[3])}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
