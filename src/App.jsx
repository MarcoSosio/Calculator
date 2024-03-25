import { useEffect, useState } from "react";
import "./App.scss";
import Display from "./Display/Display.jsx";
import Tastiera from "./Tastiera/Tastiera.jsx";
import Context from "./Context.jsx";
export default function App(){
  const [expValue, setExpValue] = useState();
  useEffect(
    ()=>{
      setExpValue("");
    },
    []
  )
  return (
      <div id="App">
          <div id="calcolatrice">
              <Context.Provider
                  value={{
                      expState: [expValue, setExpValue],
                  }}
              >
                  <Display></Display>
                  <Tastiera></Tastiera>
              </Context.Provider>
          </div>
      </div>
  );
}