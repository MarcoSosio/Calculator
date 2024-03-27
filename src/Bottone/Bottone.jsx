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
        
        if(functProp){
            functProp(parameters);
        }
        else{
            let $calcExp = calcExpValue;
            const operatori = ['+', '-', '*', '/', '**', '%', ')']; //bastai sull'espressione da valutare e non quella in input
            if (rootIndexValue!=null && calcElementProp=="("){ //controllo l'elemento CORRENTE
                setOpenRootValue(true)
            } //se calcElementProp è "(" tale condizione è impossibile
            else if (rootIndexValue != null && operatori.includes(calcElementProp) && !openRootValue ) {
                $calcExp = calculateRoot(rootIndexValue,setRootIndexValue,$calcExp);
            }
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