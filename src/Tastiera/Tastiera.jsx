/* eslint-disable no-unused-vars */
import "./Tastiera.scss";
import Bottone from "./Bottone/Bottone.jsx";
import tasti from "./Tasti_elenco.js";
import { useContext, useEffect } from "react";
import Context from "../Context.jsx";
import { gestisci_del } from "./functions/delFunctions.js";

export default function Tastiera() {
    const $context=useContext(Context);
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

    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpState_;
    const [indexElementValue, setIndexElementValue] = indexElementState;

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

    useEffect(
        function () {
            gestisci_del(states, tasti);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_delInputExpValue_, indexElementValue]
    );

    return (
        <div id="Tastiera">
            {tasti.map((btn) => (
                <Bottone
                    key={btn.tasto}
                    inputElementProp={btn.inputElement}
                    calcElementProp={btn.calcElement}
                    functProp={btn.funct}
                >
                    {btn.tasto}
                </Bottone>
            ))}
        </div>
    );
}
