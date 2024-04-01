export function gestisciRadici(openRootStateParam, rootIndexStateParam, calcElementPropParam,calcExpParam) {

    const [openRootValue,setOpenRootValue]=openRootStateParam;
    const [rootIndexValue,setRootIndexValue]=rootIndexStateParam;
    let calcExp=calcExpParam;
    function newOpenRootValue(x, pos) {
        /*
        x - valore da sommare o sottrarre (+|- 1)
        pos - numero di posizioni da indietreggiare rispetto all'ultima (che ha valore di pos=0)
        */
        let newValue = openRootValue;
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
                newOpenRootValue(+1, 0)
            );
        } else if (calcElementPropParam == ')') {
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
                calcExp = calculateRoot(
                    rootIndexStateParam,
                    openRootStateParam,
                    calcExp
                );
                $openRootValue = newOpenRootValue(-1, 1);
            } else {
                $openRootValue = newOpenRootValue(-1, 0);
            }
            setOpenRootValue($openRootValue);
        }
    }
    return calcExp;
}

export function calculateRoot(rootIndexStateParam,openRootStateParam,calcExpParam){
    console.log(openRootStateParam)
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam
    const [openRootValue,setOpenRootValue]=openRootStateParam
    const index = rootIndexValue[rootIndexValue.length-1]
    setRootIndexValue(rootIndexValue.slice(0,-1));
    setOpenRootValue(openRootValue.slice(0, -1));
    return calcExpParam + `**(1/${index}))`
}

export function getRootIndex(calcExp){
    let rootIndex = ""
    //console.log(calcExp[calcExp.length-2], calcExp.length-2)
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