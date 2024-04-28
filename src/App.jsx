import { useState } from "react";
import "./App.scss";
import Display from "./Display/Display.jsx";
import Tastiera from "./Tastiera/Tastiera.jsx";
import Context from "./Context.jsx";
export default function App() {
    //espressione inserita che vediamo comparire a schermo
    const [inputExpValue, setInputExpValue] = useState("");

    //espressione da valutare con eval
    const [calcExpValue, setCalcExpValue] = useState("");

    //risultato
    const [resultValue, setResultValue] = useState();

    //valore ottenuto dal tasto Ans (risultato ottenuto precedentemente)
    const [ansValue, setAnsValue] = useState();

    //indice radici da inserire 
    const [rootIndexValue, setRootIndexValue] = useState([]);

    /*segnala il numero di parentesi non chiuse quando si ha una parentesi relativa a una 
  radice quadrata aperta*/
    const [openRootValue, setOpenRootValue] = useState([]);
    /*Gli stati che sono degli array servono per avere dati per ogni radice non ancora risolta
  Quando una radice viene risolta l'array viene tagliato
  */


    const [_delInputExpValue_, _setDelInputExpValue_] = useState([]);
    const [indexElementValue, setIndexElementValue] = useState(null);

    /*indica se gli angoli vengono misurati in gradi sessagesimali (deg) o in 
    radianti (rad)*/
    const [degRadValue, setDegRadValue] = useState("deg");

    //espressione compresa in una funzione
    const [funExpValue, setFunExpValue]=useState("");
    return (
        <div id="App">
            <div id="calcolatrice">
                <Context.Provider
                    value={{
                        inputExpState: [inputExpValue, setInputExpValue],
                        calcExpState: [calcExpValue, setCalcExpValue],
                        resultState: [resultValue, setResultValue],
                        ansState: [ansValue, setAnsValue],
                        rootIndexState: [rootIndexValue, setRootIndexValue],
                        openRootState: [openRootValue, setOpenRootValue],
                        _delInputExpState_: [
                            _delInputExpValue_,
                            _setDelInputExpValue_
                        ],
                        indexElementState: [
                            indexElementValue,
                            setIndexElementValue
                        ],
                        degRadState: [degRadValue, setDegRadValue],
                        funExpState: [funExpValue, setFunExpValue]
                    }}
                >
                    <Display></Display>
                    <Tastiera></Tastiera>
                </Context.Provider>
            </div>
        </div>
    );
}
/*
Descrizione generale applicazione:
- L'applicazione consiste in una calcolatrice con diverse funzionalità
- Tutti gli stati si trovano a un livello esterno ai componenti in un unico context
- Utilizziamo due stati per tener traccia dell'espressione
    - inputExpValue memorizza l'espressione per visualizzarla a schermo
    - calcExpValue memorizza l'espressione per essere valutata correttamente 
    (tramite eval)
    Esempio:
    inputExpValue: √2
    calcExpValue: 2**(1/2)
    la funzione eval non può valutare √2 ma può valutare 2**(1/2)
-
*/
