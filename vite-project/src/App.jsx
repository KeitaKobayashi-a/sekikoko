import NavBar from "./components/NavBar";
import Seats from "./components/Seats";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation";
import Client from "./components/client";
import { useEffect, useState } from "react";
import { SeatContext } from "./context/SeatContext";


export default function App() {
  
  const [seats, setSeats] = useState([])
  const [isClient, setIsClient] = useState(true)

  useEffect(()=>{
    async function getSeats(){
      const res = await fetch('/seats')
      const json = await res.json()
      setSeats(json)
    }
    getSeats()
  },[seats])

  return<>
    <SeatContext.Provider value={{seats, setSeats, isClient, setIsClient}}>
      <NavBar/>
      <Seats/>
      <Client></Client>
      <SimpleBottomNavigation/>
    </SeatContext.Provider>
      </>
}