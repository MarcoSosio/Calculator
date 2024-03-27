/* eslint-disable no-inner-declarations */
import "./Bottone.scss";
import Context from "../Context.jsx";
import { useContext} from "react";
import { calculateRoot } from "../Tastiera/Funzioni.js";
// eslint-disable-next-line react/prop-types
export default function Bottone({ children, inputElementProp, calcElementProp, functProp}) {
    const $context = useContext(Context);
    const {inputExpState, calcExpState, resultState, ansState, rootIndexState, openRootState } = $context;
    const [inputExpValue, setInputExpValue] = inputExpState;
    const [calcExpValue, setCalcExpValue] = calcExpState;
    const [rootIndexValue,setRootIndexValue] =rootIndexState
    const [openRootValue,setOpenRootValue] = openRootState
    //const [resultValue, setResultValue] = resultState;
    //const [ansValue, setAnsValue] = ansState;

    const parameters = {
        inputExpStateParam: inputExpState,
        calcExpStateParam: calcExpState,
        resultStateParam: resultState,
        ansStateParam: ansState,
        rootIndexStateParam: rootIndexState
    };

    function handler() {
        
        /* Gestisco i tatsi che hanno funzioni spaciali tramite un apposita funzione
        nel caso dei tasti comuni gestisco il funzionamento delle radici senza creare funzioni
        specifiche, non essendo comunques tasti speciali*/

        if(functProp){
            //Se un tasto speciale deve inserire un imput ci pensa la funzione
            functProp(parameters);
        }
        else{
            let $calcExp = calcExpValue;

            function gestisciRadici(){
                if(rootIndexValue!=null){
                    const operatori=['+', '-', '*', '/', '**', '%'];
                    if(operatori.includes(calcElementProp) && openRootValue==0){
                        $calcExp = calculateRoot(
                            rootIndexValue,
                            setRootIndexValue,
                            $calcExp
                        );
                    }
                    else if(calcElementProp=="("){
                        setOpenRootValue(openRootValue + 1);
                    }
                    else if(calcElementProp==")"){
                        setOpenRootValue(openRootValue - 1);
                    }
                }
            }

            gestisciRadici();
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