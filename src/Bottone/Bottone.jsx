/* eslint-disable no-inner-declarations */
import "./Bottone.scss";
import Context from "../Context.jsx";
import { useContext, useEffect} from "react";
import { gestisciRadici,gestisci_del} from "../Tastiera/Funzioni.js";
import tasti from "../Tastiera/Tasti_elenco.js";
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
        _delInputExpState_,
        indexElementState
    } = $context;

    const [inputExpValue, setInputExpValue] = inputExpState;
    const [calcExpValue, setCalcExpValue] = calcExpState;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpState_;
    const [indexElementValue,setIndexElementValue]=indexElementState;
    //const [rootIndexValue,setRootIndexValue] =rootIndexState
    //const [openRootValue,setOpenRootValue] = openRootState;
    
    const parameters = {
        inputExpStateParam: inputExpState,
        calcExpStateParam: calcExpState,
        resultStateParam: resultState,
        ansStateParam: ansState,
        rootIndexStateParam: rootIndexState,
        openRootStateParam: openRootState,
        _delInputExpStateParam_:_delInputExpState_,
        indexElementStateParam: indexElementState,
    };

    
    useEffect(
        function(){
            //condizione inserita per eseguire l'effetto solo per un componente
            //effetto messo qui per comodità si sarebbe potuto mettere altrove
            if(calcElementProp=="0")
            {
                gestisci_del(parameters, tasti);
            }
            
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_delInputExpValue_,indexElementValue]
    )
    
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