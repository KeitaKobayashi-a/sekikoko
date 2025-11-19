import NavBar from './components/NavBar';
import Seats from './components/Seats';
import SimpleBottomNavigation from './components/SimpleBottomNavigation';
import Client from './components/Client';
import { useEffect, useState } from 'react';
import { SeatContext } from './context/SeatContext';
import SignIn from './components/SignIn';
import Reception from './components/Reception';

export default function App() {
  const [seats, setSeats] = useState([]);
  const [isClient, setIsClient] = useState(true);
  const [waitList, setWaitList] = useState([]);
  const [ticketNumber, setTicketNumber] = useState(null);
    const [loginUser, setLoginUser] = useState('');


  useEffect(() => {
    async function getSeats() {
      const res = await fetch('/seats');
      const json = await res.json();
      setSeats(json);
    }
    getSeats();
  }, [seats]);

  return (
    <>
      <SeatContext.Provider
        value={{
          seats,
          setSeats,
          isClient,
          setIsClient,
          waitList,
          setWaitList,
          ticketNumber,
          setTicketNumber,
          loginUser,
          setLoginUser
        }}
      >
        <NavBar />
        <Seats />
        <Reception/>
        <SimpleBottomNavigation />
      </SeatContext.Provider>
    </>
  );
}
