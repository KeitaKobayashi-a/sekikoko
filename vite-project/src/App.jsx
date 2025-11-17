import NavBar from "./components/NavBar";
import Seats from "./components/Seats";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation";
import { useEffect, useState } from "react";
import { SeatContext } from "./context/SeatContext";


export default function App() {
  
  const [seats, setSeats] = useState([])

  useEffect(()=>{
    async function getSeats(){
      const res = await fetch('/seats')
      const json = await res.json()
      setSeats(json)
    }
    getSeats()
  },[seats])

  return<>
    <SeatContext.Provider value={{seats, setSeats}}>
      <NavBar/>
      <Seats/>
      <SimpleBottomNavigation/>
    </SeatContext.Provider>
      </>
}