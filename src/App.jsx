import { useEffect, useState } from "react";
import "./App.scss";
import Display from "./Display/Display.jsx";
import Tastiera from "./Tastiera/Tastiera.jsx";
import Context from "./Context.jsx";
export default function App(){
  const [inputExpValue, setInputExpValue] = useState("");
  const [calcExpValue, setCalcExpValue] = useState("");
  const [resultValue, setResultValue] = useState();
  const [ansValue,setAnsValue]=useState();
  const [rootIndexValue, setRootIndexValue]=useState(null);
  const [openRootvalue,setOpenRootValue]=useState(0);//segnala se ci sono parentesi sotto radice aperte
 /*  useEffect(
    function(){
      console.log("RootIndex "+rootIndexValue)
      console.log("CalcExp "+calcExpValue);
    },
    [rootIndexValue,calcExpValue]
  ) */
  return (
      <div id="App">
          <div id="calcolatrice">
              <Context.Provider
                  value={{
                      inputExpState: [inputExpValue, setInputExpValue],
                      calcExpState: [calcExpValue, setCalcExpValue],
                      resultState: [resultValue, setResultValue],
                      ansState: [ansValue, setAnsValue],
                      rootIndexState: [rootIndexValue,setRootIndexValue],
                      openRootState: [openRootvalue,setOpenRootValue]
                  }}
              >
                  <Display></Display>
                  <Tastiera></Tastiera>
              </Context.Provider>
          </div>
      </div>
  );
}