import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { grey } from '@mui/material/colors';
import { useContext } from 'react';
import { SeatContext } from '../context/SeatContext';

export default function SimpleBottomNavigation() {
  const {seats, setSeats, setWaitList, waitList, setTicketNumber} = useContext(SeatContext)
  const [value, setValue] = React.useState(0);
  const handleLeave = async() => {
        const res = await fetch(`/seats`,{method: 'DELETE'})
         const json = await res.json()
         setWaitList(waitList.slice(1,waitList.length-1))
         setSeats(json.data)
         setTicketNumber(null)
  }

  return (
    <Box sx={{ width: '100%', position:'fixed', bottom: 0}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{bgcolor: grey[100]}}
      >
        <BottomNavigationAction onClick={handleLeave} label="退席" icon={<DirectionsWalkIcon />} />
        <BottomNavigationAction label="受付" icon={<EditNoteIcon />} />
        <BottomNavigationAction label="履歴" icon={<WorkHistoryIcon />} />
      </BottomNavigation>
    </Box>
  );
}
