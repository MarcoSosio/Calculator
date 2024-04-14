
export function gestisciRadici(openRootStateParam, rootIndexStateParam, calcElementPropParam,calcExpParam) {

    const [openRootValue,setOpenRootValue]=openRootStateParam;
    const [rootIndexValue,setRootIndexValue]=rootIndexStateParam;
    let calcExp=calcExpParam;
    function newOpenRootValue(x, pos, prevOpenRootValue) {
        /*
        x - valore da sommare o sottrarre (+|- 1)
        pos - numero di posizioni da indietreggiare rispetto all'ultima (che ha valore di pos=0)
        */
        let newValue = prevOpenRootValue;
        newValue[newValue.length - 1 - pos] += x
        return newValue
    }

    if (rootIndexValue.length != 0) {
        const operatori = ['+', '-', '*', '/', '**', '%'];
        if (
            operatori.includes(calcElementPropParam) &&
            openRootValue[openRootValue.length - 1] == 0
        ) {
            calcExp = calculateRoot(
                rootIndexStateParam,
                openRootStateParam,
                calcExp
            );
        } else if (calcElementPropParam == '(') {
            setOpenRootValue(
                prevOpenRootValue => newOpenRootValue(+1, 0, prevOpenRootValue)
            );
        } else if (calcElementPropParam == ')') {
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
                pos=1
            } else {
                pos=0
            }
            setOpenRootValue(
                prevOpenRootValue=>newOpenRootValue(-1,pos,prevOpenRootValue)
            );
        }
    }
    return calcExp;
}

export function calculateRoot(rootIndexStateParam,openRootStateParam,calcExpParam){
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam
    const [openRootValue,setOpenRootValue]=openRootStateParam
    const index = rootIndexValue[rootIndexValue.length-1]
    setRootIndexValue(
        rootIndexValue.slice(0,-1)
    );
    setOpenRootValue(
        openRootValue.slice(0, -1)
    );
    return calcExpParam + `**(1/${index}))`
}

export function getRootIndex(calcExp){
    let rootIndex = ""
    if(calcExp[calcExp.length-1]==")"){
        
        let open=1; 
        for(let i=calcExp.length-1; i>=0 && open!=0; i--){
            rootIndex=calcExp[i]+rootIndex;

            switch(calcExp[i]){
                case ")":
                    open++;
                    break;
                case "(":
                    open--;
            }
        }
    }
    else{
        // eslint-disable-next-line no-useless-escape
        const regExpr = /[-+*\/]/;
        const arrayExp = calcExp.split(regExpr);
        rootIndex = arrayExp[arrayExp.length - 1];
        rootIndex=rootIndex.replace("(","");
    }
    return rootIndex
}

function findTasto(inputElementParam,tasti)
{
    for(let item of tasti)
    {
        // TODO 
        //! NON TUTTI I TATSI HANNO UNA PROPRIETA' inputElement E TALE PROPRIETÀ
        //! NON SEMPRE CORRIPONDE A tasto 
        if(item.tasto == inputElementParam){
            return item.tasto
        }
    }
}

//find calcElement from inputElement
function findCalcElement(inputElementParam,tasti) {
    for (let item of tasti) {
        if (item.tasto == inputElementParam && item.calcElement) {
            return item.calcElement;
        }
    }
    return null;
}

//find funct from inputElement
function findFunct(inputElementParam,tasti) {
    for (let item of tasti) {
        if (item.tasto == inputElementParam && item.funct) {
            return item.funct;
        }
    }
    return null;
}
// TODO DEVO TROVARE LA FUNZIONE ASSOCIATA DALL'ELEMENTO TASTO E NON INPUTELEMENT
// TODO PERCHE' LE RADICI NON HANNO INPUTELEMENT

export function gestisci_del(parameters,tasti) {
    //! SISTEMARE CASO DI RADICI N-ESIME    
    const {_delInputExpStateParam_, indexElementStateParam, 
        openRootStateParam, rootIndexStateParam, inputExpStateParam,
        calcExpStateParam
    }=parameters

    const [_delInputExpValue_,_setDelInputExpValue_]=_delInputExpStateParam_;
    const [indexElementValue,setIndexElementValue]=indexElementStateParam;
    const [calcExpValue,setCalcExpValue]=calcExpStateParam;
    const [inputExpValue, setInputExpValue]=inputExpStateParam;

    if (_delInputExpValue_ && indexElementValue != null) {
        console.log("_delInputExpValue_ "+_delInputExpValue_);
        console.log("indexElementValue "+indexElementValue)
        const inputElement = _delInputExpValue_[indexElementValue];
        const tasto=findTasto(inputElement,tasti)
        console.log("Tasto "+tasto)
        const matchedCalcElement = findCalcElement(tasto, tasti);
        const matchedFunct = findFunct(tasto, tasti);
        console.log(inputElement, matchedCalcElement, matchedFunct);

        if (matchedCalcElement == null && matchedFunct) {
            console.log("GESTORE CHIAMATO")
            matchedFunct(parameters)
        }
        else if (matchedFunct == null && matchedCalcElement) {
            console.log("A")
            let $calcExp = calcExpValue;
            $calcExp = gestisciRadici(
                openRootStateParam,
                rootIndexStateParam,
                matchedCalcElement,
                $calcExp
            );
            setInputExpValue(inputExpValue + tasto);
            $calcExp += matchedCalcElement;
            setCalcExpValue($calcExp);
        }
        else {
            console.error("ERRORE")
        }

        if (indexElementValue < _delInputExpValue_.length - 1) {
            setIndexElementValue(indexElementValue + 1);
        } else {
            setIndexElementValue(null);
        }
    }
}