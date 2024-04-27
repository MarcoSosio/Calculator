/* eslint-disable no-unused-vars */
//find calcElement from inputElement
function findCalcElement(inputElementParam, tasti) {
    for (let item of tasti) {
        if (item.inputElement == inputElementParam && item.calcElement) {
            return item.calcElement;
        }
    }
    return null;
}

//find funct from inputElement
function findFunct(inputElementParam, tasti) {
    for (let item of tasti) {
        if (item.inputElement == inputElementParam && item.funct) {
            return item.funct;
        }
    }
    return null;
}

export function gestisci_del(states, tasti) {
    const {
        _delInputExpStateParam_,
        indexElementStateParam
    } = states;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpStateParam_;
    const [indexElementValue, setIndexElementValue] = indexElementStateParam;

    if (_delInputExpValue_.length!=0 && indexElementValue != null) {
        /*Considera l'ultimo elemento dell'espressione (preso tramite indexElementValue)
        e trova il valore di calcElement e funct associati a quell'inputElement*/
        const inputElement = _delInputExpValue_[indexElementValue];
        const matchedCalcElement = findCalcElement(inputElement, tasti);
        const matchedFunct = findFunct(inputElement, tasti);
        const params={
            inputElementParam:inputElement,
            calcElementParam:matchedCalcElement
        };

        if (matchedFunct) {
            matchedFunct(states, params);
        } else {
            console.error("ERRORE");
        }

        if (indexElementValue < _delInputExpValue_.length - 1) {
            setIndexElementValue(indexElementValue + 1);
        } else {
            setIndexElementValue(null);
        }
    }
}
