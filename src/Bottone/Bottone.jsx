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

                function newOpenRootValue(x,pos){
                    /*
                    x - valore da sommare o sottrarre (+|- 1)
                    pos - numero di posizioni da indietreggiare rispetto all'ultima (che ha valore di pos=0)
                    */
                    let newValue=openRootValue;
                    newValue[newValue.length-1-pos]+=x
                    return newValue
                }

                if (rootIndexValue.length != 0) {
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
                            newOpenRootValue(+1,0)
                        );
                    } else if (calcElementProp == ')') {
                        let $openRootValue;
                        if (openRootValue[openRootValue.length - 1] == 0) {
                            /*
                            ! Quando valutiamo questa condizione non abbiamo ancora aggiornato l'espressione
                            Questo blocco di codice permette di gestire cari in cui 
                            chiudo le parentesi subito dopo aver inserito il radicando senza 
                            mettere davanti un operatore. In questo caso dovrò calcolare la radice.
                            Un esempio potrebbe essere il seguente:
                            √(√4)
                            in questo caso avremmo openRootValue =  [1,0] 
                            in questo caso la parentesi di chiusura chiude la parentesi
                            relativa alla prima radice e non all'ultima, quindi avremo che
                            openRootValue = [0,0] piuttosto che [1,-1]
                            */
                            $calcExp = calculateRoot(
                                rootIndexState,
                                openRootState,
                                $calcExp
                            );
                            $openRootValue = newOpenRootValue(-1, 1);
                        } else {
                            $openRootValue = newOpenRootValue(-1, 0);
                        }
                        setOpenRootValue( $openRootValue );
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