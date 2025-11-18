import NavBar from './components/NavBar';
import Seats from './components/Seats';
import SimpleBottomNavigation from './components/SimpleBottomNavigation';
import Client from './components/Client';
import { useEffect, useState } from 'react';
import { SeatContext } from './context/SeatContext';

export default function App() {
  const [seats, setSeats] = useState([]);
  const [isClient, setIsClient] = useState(true);
  const [waitList, setWaitList] = useState([]);
  const [ticketNumber, setTicketNumber] = useState(null);

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
        }}
      >
        <NavBar />
        <Seats />
        <Client></Client>
        <SimpleBottomNavigation />
      </SeatContext.Provider>
    </>
  );
}
