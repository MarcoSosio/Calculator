/* eslint-disable no-unused-vars */

export function gestisciRadici(
    openRootStateParam,
    rootIndexStateParam,
    calcElementPropParam,
    calcExpParam
) {
    /* Questa funzione permette di gestire e calcolare correttamente le radici. 
    Quando inseriamo una radice non abbiamo un operatore che gestisca 
    automaticamente il tutto come + - * / ** % ma dobbiamo determinare un 
    radicando e un indice di radice, dopodiché eseguire r**(1/i) dove r è il 
    radicando e i è l'indice di radice.
    Dunque al momento giusto aggiungeremo in coda all'espressione **(1/i)
    Il radicando è il numero o l'espressione tra parentesi immediatamente 
    successiva e viene individuato con i seguenti criteri:
    -Se dopo la radice non segue ( **(1/i) viene aggiunto non appena viene inserito
    un operatore, dunque prendiamo come radicando tutti i caratteri fino a un operatore
    Esempio: √25+1 = 25**(1/2)+1

    -Se dopo la radice segue ( imposteremo un openRootValue su 1 e lo incrementeremo 
    quando trova ( e lo decrementeremo quando trova ). Quando tornerà a 0 significa che 
    tutte le parentesi sono state chiuse e potremo inserire **(1/i)
    Esempio: √(1+(4/2)) = (1+(4/2))**(1/2)
    */
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    let calcExp = calcExpParam;
    function newOpenRootValue(x, pos, prevOpenRootValue) {
        /*
        Modifica il valore di openRootValue
        x - valore da sommare o sottrarre (+|- 1)
        pos - numero di posizioni da indietreggiare rispetto all'ultima (che ha valore di pos=0)
        */
        let newValue = prevOpenRootValue;
        newValue[newValue.length - 1 - pos] += x;
        return newValue;
    }

    if (rootIndexValue.length != 0) {
        const operatori = ["+", "-", "*", "/", "**", "%"];
        if (
            operatori.includes(calcElementPropParam) &&
            openRootValue[openRootValue.length - 1] == 0
        ) {
            calcExp = calculateRoot(
                rootIndexStateParam,
                openRootStateParam,
                calcExp
            );
        } else if (calcElementPropParam == "(") {
            setOpenRootValue(newOpenRootValue(+1, 0, openRootValue));
        } else if (calcElementPropParam == ")") {
            let pos;
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
                calcExp = calculateRoot(
                    rootIndexStateParam,
                    openRootStateParam,
                    calcExp
                );
                pos = 1;
            } else {
                pos = 0;
            }
            setOpenRootValue(newOpenRootValue(-1, pos, openRootValue));
        }
    }
    return calcExp;
}

export function calculateRoot(
    rootIndexStateParam,
    openRootStateParam,
    calcExpParam
) {
    /*La funzione inserisce **(1/i) in modo da calcolare la radice*/
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const index = rootIndexValue[rootIndexValue.length - 1];
    setRootIndexValue(rootIndexValue.slice(0, -1));
    setOpenRootValue(openRootValue.slice(0, -1));
    return calcExpParam + `**(1/${index}))`;
}

export function getRootIndex(calcExp) {
    /*Chiamante: nthRootHandler Tasti_elenco.js
    Funzione utilizzata in caso di radici n-esime per determinare l'indice di 
    radice. L'indice di radice corrisponde al numero o all'espressione tra 
    parentesi immediatemante precedente.
    - Se precedute da ) si utilizza un contatore open incrementato quando si trova
    ) e decrementato quando si trova ( similmente a come procediamo per l'indice
    di radice. In questo caso però incrementiamo con ) e decrementiamo con (.
    Quando open = 0 prendiamo l'indice di radice
    Esempio: (1+(4/2))ˣ√4 l'indice è (1+(4/2))
    - Se non precedute da ) prendiamo il numero immediatamente precedente, dunque 
    consideriamo i caratteri fino a che trovaimo un operatore
    -In ogni caso se non troviamo punti di interruzione andiamo indietro fino 
    all'inizio
    */
    let rootIndex = "";
    if (calcExp[calcExp.length - 1] == ")") {
        let open = 1;
        for (let i = calcExp.length - 1; i >= 0 && open != 0; i--) {
            rootIndex = calcExp[i] + rootIndex;

            switch (calcExp[i]) {
                case ")":
                    open++;
                    break;
                case "(":
                    open--;
            }
        }
    } else {
        // eslint-disable-next-line no-useless-escape
        const regExpr = /[-+*\/(**)]/;
        const arrayExp = calcExp.split(regExpr);
        rootIndex = arrayExp[arrayExp.length - 1];
        
        /*Nel caso il numero sia preceduto da ( la togliamo
        Esempio: (2ˣ√4)  i caratteri dell'indice di radice sono risultano essere 
        (2, con questa riga cancelliamo ( */
        rootIndex = rootIndex.replace("(", "");
    }
    return rootIndex;
}

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

export function gestisci_del(parameters, tasti) {
    const {
        _delInputExpStateParam_,
        indexElementStateParam,
        openRootStateParam,
        rootIndexStateParam,
        inputExpStateParam,
        calcExpStateParam
    } = parameters;

    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpStateParam_;
    const [indexElementValue, setIndexElementValue] = indexElementStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [inputExpValue, setInputExpValue] = inputExpStateParam;

    console.log("delInputExpValue", _delInputExpValue_);
    console.log("typeof delInputExpValue", typeof _delInputExpValue_);
    if (_delInputExpValue_ && indexElementValue != null) {
        /*Considera l'ultimo elemento dell'espressione (preso tramite indexElementValue)
        e trova il valore di calcElement o funct associati a quell'inputElement*/
        
        console.log("indexElementValue " + indexElementValue);
        const inputElement = _delInputExpValue_[indexElementValue];
        const matchedCalcElement = findCalcElement(inputElement, tasti);
        const matchedFunct = findFunct(inputElement, tasti);
        console.log(inputElement, matchedCalcElement, matchedFunct);

        //se l'elemento non ha un calcElement associato avrà una funzione (e viceversa)
        if (matchedCalcElement == null && matchedFunct) {
            matchedFunct(parameters);
        } else if (matchedFunct == null && matchedCalcElement) {
            let $calcExp = calcExpValue;
            $calcExp = gestisciRadici(
                openRootStateParam,
                rootIndexStateParam,
                matchedCalcElement,
                $calcExp
            );
            setInputExpValue(inputExpValue + inputElement);
            $calcExp += matchedCalcElement;
            setCalcExpValue($calcExp);
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

export function gestisciSeno() {}
