import {useState } from "react";
import "./App.scss";
import Display from "./Display/Display.jsx";
import Tastiera from "./Tastiera/Tastiera.jsx";
import Context from "./Context.jsx";
export default function App(){
  const [inputExpValue, setInputExpValue] = useState(""); //espressione inserita
  const [calcExpValue, setCalcExpValue] = useState(""); //espressione da valutare
  const [resultValue, setResultValue] = useState();
  const [ansValue,setAnsValue]=useState(); //valore ottenuto dal tasto Ans
  const [rootIndexValue, setRootIndexValue]=useState([]); //indice di una radice
  const [rootNumberValue, setRootNumberValue]=useState(0);

  /*segnala il numero di parentesi non chiuse quando si ha una parentesi relativa a una 
  radice quadrata aperta*/
  const [openRootValue,setOpenRootValue]=useState([]);
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
                      rootNumberState: [rootNumberValue, setRootNumberValue],
                      openRootState: [openRootValue,setOpenRootValue]
                  }}
              >
                  <Display></Display>
                  <Tastiera></Tastiera>
              </Context.Provider>
          </div>
      </div>
  );
}