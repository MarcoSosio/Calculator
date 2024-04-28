/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
import "./Bottone.scss";
import Context from "../../Context.jsx";
import { useContext, useEffect } from "react";
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
        degRadState,
        funExpState
    } = $context;

    //const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpState_;

    const states = {
        inputExpStateParam: inputExpState,
        calcExpStateParam: calcExpState,
        resultStateParam: resultState,
        ansStateParam: ansState,
        rootIndexStateParam: rootIndexState,
        openRootStateParam: openRootState,
        _delInputExpStateParam_: _delInputExpState_,
        indexElementStateParam: indexElementState,
        degRadStateParam: degRadState,
        funExpStateParam: funExpState
    };

    //contiene l'elemento da inserire nell'espressione a schermo e quello da
    //inserire nell'espressione da valutare
    const params = {
        inputElementParam: inputElementProp,
        calcElementParam: calcElementProp
    };

    function handler() {
        functProp(states, params);
    }
    return (
        <button className="tasto" onClick={handler}>
            {children}
        </button>
    );
}
