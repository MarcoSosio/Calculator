/* eslint-disable no-unused-vars */
export function gestisciRadici(states, calcElementParam, calcExpParam) {
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

    L'indice di radice è determinato da rootIndexValue
    */
    const { openRootStateParam, rootIndexStateParam } = states;
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

    if (
        rootIndexValue.length != 0 &&
        !isNaN(Number(rootIndexValue[rootIndexValue.length - 1]))
    ) {
        const operatori = ["+", "-", "*", "/", "**", "%"];
        if (
            operatori.includes(calcElementParam) &&
            openRootValue[openRootValue.length - 1] == 0
        ) {
            calcExp = calculateRoot(states, calcExp);
        } else if (calcElementParam == "(") {
            setOpenRootValue(newOpenRootValue(+1, 0, openRootValue));
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
                calcExp = calculateRoot(states, calcExp);
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
    { rootIndexStateParam, openRootStateParam },
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
        rootIndex = rootIndex.replaceAll("(", "");
    }
    return rootIndex;
}
