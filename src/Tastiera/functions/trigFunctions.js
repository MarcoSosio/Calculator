/* eslint-disable no-unused-vars */
export function gestisciTrigonometric(
    openRootStateParam,
    rootIndexStateParam,
    calcElementParam,
    funExpStateParam,
    degRadValueParam,
    calcExpParam
) {
    // I RAGIONAMENTI SONO ANALOGHI A QUELLI VISTI CON LE RADICI, MA IN QUESTI CASO
    // SEMPLICEMENTE CHIAMO UNA DIVERSA FUNZIONE DI CALCOLO
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    let calcExp = calcExpParam;
    function newOpenRootValue(x, pos, prevOpenRootValue) {
        let newValue = prevOpenRootValue;
        newValue[newValue.length - 1 - pos] += x;
        return newValue;
    }

    if ( rootIndexValue.length != 0 && isNaN( Number(rootIndexValue[rootIndexValue.length - 1]) ) ) {
        const operatori = ["+", "-", "*", "/", "**", "%"];
        
        if (operatori.includes(calcElementParam) &&
            openRootValue[openRootValue.length - 1] == 0) {
            calcExp = calculateTrigonometric(
                rootIndexStateParam,
                openRootStateParam,
                degRadValueParam,
                funExpStateParam,
                calcExp
            );
        } else if (calcElementParam == "(") {
            setOpenRootValue(newOpenRootValue(+1, 0, openRootValue));
        } else if (calcElementParam == ")") {
            let pos;
            if (openRootValue[openRootValue.length - 1] == 0) {
                calcExp = calculateTrigonometric(
                    rootIndexStateParam,
                    openRootStateParam,
                    degRadValueParam,
                    funExpStateParam,
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
export function calculateTrigonometric(
    rootIndexStateParam,
    openRootStateParam,
    degRadValueParam,
    funExpStateParam,
    calcExpParam
) {
    /*La funzione inserisce **(1/i) in modo da calcolare la radice*/
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [funExpValue, setFunExpValue]= funExpStateParam;
    const fromDegtoRad = (2 * Math.PI)/360; //rapporto radianti/gradi
    const fExp=calcExpParam.slice(funExpValue[funExpValue.length-1]+1);
    console.log(fExp);
    let fDtR=1;
    if(degRadValueParam=="deg"){
        fDtR=fromDegtoRad;
    }
    setRootIndexValue(rootIndexValue.slice(0, -1));
    setOpenRootValue(openRootValue.slice(0, -1));
    if(rootIndexValue[rootIndexValue.length-1]=="f"){
        return calcExpParam + `)*${fDtR}).toFixed(9))`;
    }
    else if (rootIndexValue[rootIndexValue.length - 1] =="t"){
        setFunExpValue(funExpValue.slice(0, -1));
        return calcExpParam + `)*${fDtR}  ).toFixed(9)  )/parseFloat(  Math.cos(  (${fExp})*${fDtR}  ).toFixed(9)  )  )`;
    }
}