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
    //! Questa funzione viene chiamata ricorsivamente da un effetto (vedi Tastiera.jsx)
    const { _delInputExpStateParam_, indexElementStateParam } = states;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpStateParam_;
    const [indexElementValue, setIndexElementValue] = indexElementStateParam;

    if (_delInputExpValue_.length != 0 && indexElementValue != null) {
        /*Prendo _delInputExpValue_ che contiene l'inputExpValue tokenizzata e
        la rileggo da capo individuando per ogni pezzo 
        (che rappresenta l'inputElement  di un tasto), tramite findCalcElement 
        e findFunct il calcElement e la funct associati a quell'inpuElement
        Rileggo partendo dal fondo alla cima, per fare questo utilizzo uno stato
        come indice (indexElementValue) che mi dice quale cella considerare

        Dato che sto rileggendo e reinserendo l'espressione da capo ho bisogno 
        che prima gli stati vengano resettati (vedi Tasti_elenco.js --> handlerDel)*/
        const inputElement = _delInputExpValue_[indexElementValue];
        const matchedCalcElement = findCalcElement(inputElement, tasti);
        const matchedFunct = findFunct(inputElement, tasti);
        const params = {
            inputElementParam: inputElement,
            calcElementParam: matchedCalcElement
        };

        if (matchedFunct) {
            matchedFunct(states, params);
        } else {
            console.error("ERRORE");
        }

        /* Incrementiamo indexElementValue di 1 per accedere alla cella successiva 
        dell'array _delInputExpValue_ fino a che non ho finito, a quel punto
        imposto indexElementValue su null, una volta diventato null, la condizione
        necessaria all'esecuzione del corpo di questa funzione non sarà più verificata
        di conseguenza il valore di indexElementValue non cambierà e l'effetto
        non sarà scatenato */
        if (indexElementValue < _delInputExpValue_.length - 1) {
            setIndexElementValue(indexElementValue + 1);
        } else {
            setIndexElementValue(null);
        }
    }
}
