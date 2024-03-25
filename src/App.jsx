import { useEffect, useState } from "react";
import "./App.scss";
import Display from "./Display/Display.jsx";
import Tastiera from "./Tastiera/Tastiera.jsx";
import Context from "./Context.jsx";
export default function App(){
  const [espressione,setEspressione]=useState();
  useEffect(
    ()=>{
      setEspressione("");
    },
    []
  )
  return (
      <div id="App">
          <div id="calcolatrice">
              <Context.Provider value={{
                exp:[espressione,setEspressione]
              }}>
                  <Display></Display>
                  <Tastiera></Tastiera>
              </Context.Provider>
          </div>
      </div>
  );
}