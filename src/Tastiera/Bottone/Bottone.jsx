/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
import "./Bottone.scss";
import Context from "../../Context.jsx";
import { useContext, useEffect } from "react";
import { gestisciRadici, gestisci_del } from "./Funzioni.js";
import tasti from "./Tasti_elenco.js";
//prettier-ignore
// eslint-disable-next-line react/prop-types
export default function Bottone({ children, inputElementProp, calcElementProp, functProp }) {
    const $context = useContext(Context);
    const {
        inputExpState,
        calcExpState,
        resultState,
        ansState,
        rootIndexState,
        openRootState,
        _delInputExpState_,
        indexElementState,
        degRadState
    } = $context;

    const [inputExpValue, setInputExpValue] = inputExpState;
    const [calcExpValue, setCalcExpValue] = calcExpState;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpState_;
    const [indexElementValue, setIndexElementValue] = indexElementState;

    const parameters = {
        inputExpStateParam: inputExpState,
        calcExpStateParam: calcExpState,
        resultStateParam: resultState,
        ansStateParam: ansState,
        rootIndexStateParam: rootIndexState,
        openRootStateParam: openRootState,
        _delInputExpStateParam_: _delInputExpState_,
        indexElementStateParam: indexElementState,
        degRadStateParam: degRadState,

        inputElementParam: inputElementProp,
        calcElementParam: calcElementProp
    };

    useEffect(
        function () {
            //condizione inserita per eseguire l'effetto solo per un componente
            //effetto messo qui per comodità si sarebbe potuto mettere altrove
            if (calcElementProp == "0") {
                gestisci_del(parameters, tasti);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_delInputExpValue_, indexElementValue]
    );

    function handler() {

        /*I tasti speciali sono gestiti tramite apposite funzioni corrispondenti
        al prop functProp, e tale funzione fa qualsiasi cosa necessaria;
        se questa non è presente vengono gestiti normalmente. 
        Nel caso dei tasti normali vengono anche gestite le radici per fare in 
        modo che vengano calcolate correttamente poiché le radici non sono dei 
        semplici operatori*/

        if (functProp) {
            //Se un tasto speciale deve inserire un input ci pensa la funzione
            functProp(parameters);
        } else {
            //! Come si può notare si imposta lo stato sul nuovo valore di calcExpValue
            //! solo dopo aver fatto i calcoli, dunque il valore appena inserito 
            //! (calcElementProp) non sarà parte dell'espressione al momento dei calcoli
            let calcExp = calcExpValue;
            //prettier-ignore
            calcExp = gestisciRadici( 
                openRootState, rootIndexState, calcElementProp, calcExp 
            );
            setInputExpValue(inputExpValue + inputElementProp);
            calcExp += calcElementProp;
            setCalcExpValue(calcExp);
        }
    }
    return (
        <button className="tasto" onClick={handler}>
            {children}
        </button>
    );
}
