import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import { SeatContext } from '../context/SeatContext';
import { useContext } from 'react';


export default function SignIn() {
    const {setLoginUser} = useContext(SeatContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      username: data.get('username'),
      password: data.get('password'),
    };
    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });
    const json = await res.json()
    setLoginUser(json.user.username)
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: 300, display: 'flex', flexDirection: 'column', gap: 2, mt:3 }}
    >
      <TextField name="username" label="Username" />
      <TextField name="password" label="Password" type="password" />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  );
}
