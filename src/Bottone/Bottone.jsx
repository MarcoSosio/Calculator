/* eslint-disable no-inner-declarations */
import "./Bottone.scss";
import Context from "../Context.jsx";
import { useContext} from "react";
import { gestisciRadici } from "../Tastiera/Funzioni.js";
// eslint-disable-next-line react/prop-types
export default function Bottone({ children, inputElementProp, calcElementProp, functProp}) {
    const $context = useContext(Context);
    const {
        inputExpState,
        calcExpState,
        resultState,
        ansState,
        rootIndexState,
        openRootState,
        rootNumberState,
    } = $context;
    const [inputExpValue, setInputExpValue] = inputExpState;
    const [calcExpValue, setCalcExpValue] = calcExpState;
    const [rootIndexValue,setRootIndexValue] =rootIndexState
    const [openRootValue,setOpenRootValue] = openRootState;
    
    const parameters = {
        inputExpStateParam: inputExpState,
        calcExpStateParam: calcExpState,
        resultStateParam: resultState,
        ansStateParam: ansState,
        rootIndexStateParam: rootIndexState,
        rootNumberStateParam: rootNumberState,
        openRootStateParam: openRootState
    };

    function handler() {
        
        /* Gestisco i tatsi che hanno funzioni spaciali tramite un apposita funzione
        nel caso dei tasti comuni gestisco il funzionamento delle radici senza creare funzioni
        specifiche, non essendo comunques tasti speciali*/

        if(functProp){
            //Se un tasto speciale deve inserire un input ci pensa la funzione
            functProp(parameters);
        }
        else{
            let $calcExp = calcExpValue;
            $calcExp=gestisciRadici(openRootState,rootIndexState,calcElementProp,$calcExp);
            setInputExpValue(inputExpValue + inputElementProp);
            $calcExp += calcElementProp;
            setCalcExpValue($calcExp);
        }
    }
    return (
        <button className="tasto" onClick={handler}>
            {children}
        </button>
    );
}