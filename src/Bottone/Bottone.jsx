/* eslint-disable no-inner-declarations */
import "./Bottone.scss";
import Context from "../Context.jsx";
import { useContext} from "react";
import { calculateRoot } from "../Tastiera/Funzioni.js";
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
    //const [rootNumberValue, setRootNumberValue] = rootNumberState;
    //const [resultValue, setResultValue] = resultState;
    //const [ansValue, setAnsValue] = ansState;
    //console.log(rootIndexState)
    
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

            function gestisciRadici(){

                function newOpenRootValue(x){
                    let newValue=openRootValue;
                    newValue[newValue.length-1]+=x
                    return newValue
                }
                if (rootIndexValue.length!= 0) {
                    const operatori = ['+', '-', '*', '/', '**', '%'];
                    if (
                        operatori.includes(calcElementProp) &&
                        openRootValue[openRootValue.length - 1] == 0
                    ) {
                        $calcExp = calculateRoot(
                            rootIndexState,
                            openRootState,
                            $calcExp
                        );
                    } else if (calcElementProp == '(') {
                        setOpenRootValue(
                            newOpenRootValue(+1)
                        );
                    } else if (calcElementProp == ')') {
                        function fun(x){
                            if(openRootValue[openRootValue.length-1]==0){//intanto che non aggiorno lo stato
                                $calcExp = calculateRoot(
                                    rootIndexState,
                                    openRootState,
                                    $calcExp
                                );
                                
                                let newValue = openRootValue;
                                newValue[newValue.length - 2] += x;
                                console.log(newValue)
                                return newValue;
                            }
                            else{
                                return newOpenRootValue(x)
                            }
                        }
                        setOpenRootValue(
                            fun(-1)
                            //newOpenRootValue(-1)
                        );
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