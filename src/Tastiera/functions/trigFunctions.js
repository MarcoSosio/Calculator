/* eslint-disable no-unused-vars */
export function gestisciTrigonometric(
    openRootStateParam,
    rootIndexStateParam,
    calcElementParam,
    funExpStateParam,
    degRadValueParam,
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
    const [funExpValue, setFunExpValue]=funExpStateParam;
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

    if ( rootIndexValue.length != 0 && isNaN( Number(rootIndexValue[rootIndexValue.length - 1]) ) ) {
        const operatori = ["+", "-", "*", "/", "**", "%"];
        
        if (operatori.includes(calcElementParam) &&
            openRootValue[openRootValue.length - 1] == 0) {
            console.log("AA");
            calcExp = calculateTrigonometric(
                rootIndexStateParam,
                openRootStateParam,
                degRadValueParam,
                calcExp
            );
        } else if (calcElementParam == "(") {
            setOpenRootValue(newOpenRootValue(+1, 0, openRootValue));
            setFunExpValue(funExpValue+calcElementParam);
        } else if (calcElementParam == ")") {
            let pos;
            if (openRootValue[openRootValue.length - 1] == 0) {
                /*
                Questo blocco di codice permette di gestire casi in cui
                chiudo le parentesi subito dopo aver inserito il radicando senza
                mettere davanti un operatore. In questo caso dovrò calcolare la radice.
                Un esempio potrebbe essere il seguente:
                √(√4)
                in questo caso avremmo openRootValue =  [1,0]
                in questo caso la parentesi di chiusura chiude la parentesi
                relativa alla prima radice e non all'ultima, quindi avremo che
                openRootValue = [0,0] piuttosto che [1,-1]
                */
                calcExp = calculateTrigonometric(
                    rootIndexStateParam,
                    openRootStateParam,
                    degRadValueParam,
                    calcExp
                );
                pos = 1;
            } else {
                setFunExpValue(funExpValue+calcElementParam);
                pos = 0;
            }
            setOpenRootValue(newOpenRootValue(-1, pos, openRootValue));
        }
        else{
            setFunExpValue(funExpValue + calcElementParam);
        }
    }
    return calcExp;
}
export function calculateTrigonometric(
    rootIndexStateParam,
    openRootStateParam,
    degRadValueParam,
    calcExpParam
) {
    /*La funzione inserisce **(1/i) in modo da calcolare la radice*/
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const index = rootIndexValue[rootIndexValue.length - 1];
    const fromDegtoRad = (2 * Math.PI)/360; //rapporto radianti/gradi
    let fDtR=1;
    if(degRadValueParam=="deg"){
        fDtR=fromDegtoRad;
    }
    setRootIndexValue(rootIndexValue.slice(0, -1));
    setOpenRootValue(openRootValue.slice(0, -1));
    return calcExpParam + `)*${fDtR}).toFixed(12))`;
}