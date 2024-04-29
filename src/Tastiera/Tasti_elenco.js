/* eslint-disable no-unused-vars */
import { getRootIndex } from "./functions/rootFunctions";
import { calculateRoot } from "./functions/rootFunctions";
import { gestisciRadici } from "./functions/rootFunctions";
import {
    calculateTrigonometric,
    gestisciTrigonometric
} from "./functions/trigFunctions";
/*
    ? "2nd","deg","?","??","???",
    ? "sin","cos","tan","log","ln",
    * "pi/e","rx","px","(",")",
    * "7","8","9","AC","Del",
    * "4","5","6","x","/",
    * "1","2","3","+","-",
    * ".","0","Ans","=","Mod",
*/

const rootSymbol = String.fromCharCode(0x221a);
const nthRootSymbol = String.fromCharCode(0x02e3) + rootSymbol;
const piSymbol = String.fromCharCode(960);
const divisionSymbol = String.fromCharCode(247);
// isNaN( NUmber(n) ) serve per controllare se una stringa è numerica

function handlerEqual({
    resultStateParam,
    calcExpStateParam,
    ansStateParam,
    rootIndexStateParam,
    openRootStateParam,
    degRadStateParam,
    funExpStateParam
}) {
    const [resultValue, setResultValue] = resultStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [degRadValue, setDegRadValue] = degRadStateParam;
    let risultato;
    let risposta = "";
    let exp = calcExpValue;

    //se non ho ancora calcolato radici le calcolo
    if (
        rootIndexValue.length != 0 &&
        !isNaN(Number(rootIndexValue[rootIndexValue.length - 1]))
    ) {
        exp = calculateRoot(rootIndexStateParam, openRootStateParam, exp);
        console.log(exp);
    } else if (
        rootIndexValue.length != 0 &&
        isNaN(Number(rootIndexValue[rootIndexValue.length - 1]))
    ) {
        exp = calculateTrigonometric(
            rootIndexStateParam,
            openRootStateParam,
            degRadValue,
            funExpStateParam,
            exp
        );
        console.log(exp);
    }

    try {
        risultato = eval(exp);
        risposta = risultato;
        if (
            //prettier-ignore
            (!isFinite(risultato) || isNaN(risultato)) && risultato != undefined
        ) {
            risultato = "Math Error";
            risposta = "";
        }
    } catch (error) {
        risposta = "";
        switch (error.name) {
            case "SyntaxError":
                risultato = "Syntax Error";
                break;
            default:
                console.error("Errore");
        }
    }
    setCalcExpValue(exp);
    setResultValue(risultato);
    setAnsValue(risposta);
}

function handlerAC({
    inputExpStateParam,
    calcExpStateParam,
    resultStateParam
}) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [resultValue, setResultValue] = resultStateParam;
    setInputExpValue("");
    setCalcExpValue("");
    setResultValue("");
}

function handlerDel(params) {
    const {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam,
        _delInputExpStateParam_,
        indexElementStateParam
    } = params;

    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpStateParam_;
    const [indexElementValue, setIndexElementValue] = indexElementStateParam;

    function splitInputExpValue(inputExpValue) {
        /* Spezzetta l'espressione in un array in cui ogni elemento corriponde al gruppo
        di caratteri da eleminare
        Se ho per esempio 3+ˣ√4+5Mod2 
        inputExpValueArray=["3", "+", "ˣ√", "4", "5", "Mod", "2"].
        Eliminerò l'ultimo elemento dell'array */
        let inputExpValueArray = [];
        const regExpr = new RegExp(`${nthRootSymbol}|Ans|Mod|sin |cos |tan |.`, "g");
        let x;
        do {
            x = regExpr.exec(inputExpValue);
            if (x != null) {
                //exec restituisce un array con varie informazioni
                inputExpValueArray.push(x[0]);
            }
        } while (x != null);
        return inputExpValueArray;
    }

    let newDelExpValue = splitInputExpValue(inputExpValue);
    console.log(newDelExpValue);
    newDelExpValue = newDelExpValue.slice(0, -1);
    _setDelInputExpValue_(newDelExpValue);

    //reset all to recalculate
    setInputExpValue("");
    setCalcExpValue("");
    setOpenRootValue([]);
    setRootIndexValue([]);

    setIndexElementValue(0); //set to 0 instead of null
}

function handlerAns({
    inputExpStateParam,
    calcExpStateParam,
    resultStateParam,
    ansStateParam
}) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    if (ansValue) {
        setInputExpValue(inputExpValue + "Ans");
        setCalcExpValue(calcExpValue + ansValue);
    } else {
        console.log("No answer");
    }
}

function handlerSqrt(
    {
        inputExpStateParam,
        rootIndexStateParam,
        openRootStateParam,
        calcExpStateParam
    },
    { inputElementParam }
) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;

    let calcExp = calcExpValue;

    /* if (openRootValue[openRootValue.length - 1] == 0) {
        calcExp = calculateRoot(
            rootIndexStateParam,
            openRootStateParam,
            calcExpValue
        );
    } */ //? Necessità dubbia
    calcExp += "(";
    setCalcExpValue(calcExp);
    setOpenRootValue([...openRootValue, 0]);
    setInputExpValue(inputExpValue + inputElementParam);
    setRootIndexValue([...rootIndexValue, 2]);
}

function handlerNthRoot(
    {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam
    },
    { inputElementParam }
) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    let calcExp = calcExpValue;

    /*Anche la radice n-esima fa eseguire il calcolo della radice predecente come 
    fosse un altro operatore come + o un -, questo per gestire situazioni del tipo
    3ˣ√8ˣ√4 dove ci si aspetta (3ˣ√8)ˣ√4 = 2ˣ√4 = 2 */
    if (openRootValue[openRootValue.length - 1] == 0) {
        calcExp = calculateRoot(
            rootIndexStateParam,
            openRootStateParam,
            calcExpValue
        );
    }
    const rootIndex = getRootIndex(calcExp);
    setOpenRootValue([...openRootValue, 0]);
    calcExp = calcExp.slice(0, -rootIndex.length);
    calcExp += "(";
    setInputExpValue(inputExpValue + inputElementParam);
    /*Divido l'espressione a ogni operatore per determinare quale numero è l'indice di radice */

    setRootIndexValue([...rootIndexValue, rootIndex]); //prendo l'indice di radice (ultimo numero)
    /*Tolgo l'indice di radice togliendo tanti caratteri quanta la lunghezza dell'indice*/
    setCalcExpValue(calcExp);
}

function handlerDegRad({ degRadStateParam }) {
    const [degRadValue, setDegRadValue] = degRadStateParam;
    if (degRadValue == "rad") {
        setDegRadValue("deg");
    } else if (degRadValue == "deg") {
        setDegRadValue("rad");
    }
}

function handlerSinCos(
    {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam
    },
    { inputElementParam, calcElementParam }
) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;

    setInputExpValue(inputExpValue + inputElementParam);
    setCalcExpValue(calcExpValue + calcElementParam);
    setRootIndexValue([...rootIndexValue, "f"]);
    setOpenRootValue([...openRootValue, 0]);
}

function handlerTan(
    {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam,
        funExpStateParam
    },
    { inputElementParam, calcElementParam }
){
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [funExpValue, setFunExpValue] = funExpStateParam;

    let newCalcExpValue = calcExpValue + calcElementParam;
    setInputExpValue(inputExpValue + inputElementParam);
    setCalcExpValue(newCalcExpValue);
    setRootIndexValue([...rootIndexValue, "t"]);
    setFunExpValue([...funExpValue, newCalcExpValue.length - 1]);
    setOpenRootValue([...openRootValue, 0]);
}

function $handlerGENERIC(
    {
        inputExpStateParam,
        calcExpStateParam,
        openRootStateParam,
        rootIndexStateParam,
        degRadStateParam,
        funExpStateParam
    },
    { inputElementParam, calcElementParam }
) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [degRadValue, setDegRadValue] = degRadStateParam;
    //! Come si può notare si imposta lo stato sul nuovo valore di calcExpValue
    //! solo dopo aver fatto i calcoli, dunque il valore appena inserito
    //! (calcElementProp) non sarà parte dell'espressione al momento dei calcoli
    let calcExp = calcExpValue;
    //prettier-ignore
    calcExp = gestisciRadici(
        openRootStateParam, rootIndexStateParam, calcElementParam, calcExp
    );
    calcExp = gestisciTrigonometric(
        openRootStateParam,
        rootIndexStateParam,
        calcElementParam,
        funExpStateParam,
        degRadValue,
        calcExp
    );
    setInputExpValue(inputExpValue + inputElementParam);
    calcExp += calcElementParam;
    setCalcExpValue(calcExp);
}
const calcElementTan = "parseFloat(  parseFloat(  Math.sin(  (";
// ")*${fDtR}  ).toFixed(9)  )/parseFloat(  Math.cos(  (${funExpValue})*${fDtR}  ).toFixed(9)  )  )"
export const tasti = [
    /*
    tasto: ciò che appare sul bottone,
    inputElement: ciò che viene inserito nel display della calcolatrice,
    calcElement: valore da inserire nell'espressione che verrà valutata
    funct: eventuale funzione speciale di un tasto
    */
    //metto SEMPRE inputElement anche se ho una funzione per garantire il funzionamento di Del

    /*
    ==Legenda tasti==
    Ans --> risultato precedente
    Mod --> resto divisione
    AC --> Elimina tutta l'espressione sul display
    Del --> Elimina ultimo carattere dell'espressione sul display
    D/R --> gradi/radianti
    */

    { tasto: "D/R", inputElement: "", calcElement: "", funct: handlerDegRad },
    //prettier-ignore
    { tasto: piSymbol, inputElement: piSymbol, calcElement: String(Math.PI), funct: $handlerGENERIC },
    //prettier-ignore
    { tasto: "sin", inputElement: "sin ", calcElement:"parseFloat(Math.sin((", funct:handlerSinCos},
    //prettier-ignore
    { tasto: "cos", inputElement: "cos ", calcElement:"parseFloat(Math.cos((", funct:handlerSinCos},
    //prettier-ignore
    { tasto: "tan", inputElement: "tan ", calcElement:calcElementTan, funct:handlerTan},

    //prettier-ignore
    { tasto: rootSymbol, inputElement: rootSymbol, calcElement: "", funct: handlerSqrt }, //radice quadrata
    //prettier-ignore
    { tasto: nthRootSymbol, inputElement: nthRootSymbol, calcElement: "", funct: handlerNthRoot }, //radice n-esima
    //prettier-ignore
    { tasto: "^", inputElement: "^", calcElement: "**", funct: $handlerGENERIC },
    { tasto: "(", inputElement: "(", calcElement: "(", funct: $handlerGENERIC },
    { tasto: ")", inputElement: ")", calcElement: ")", funct: $handlerGENERIC },

    //riga---

    { tasto: "7", inputElement: "7", calcElement: "7", funct: $handlerGENERIC },
    { tasto: "8", inputElement: "8", calcElement: "8", funct: $handlerGENERIC },
    { tasto: "9", inputElement: "9", calcElement: "9", funct: $handlerGENERIC },
    { tasto: "AC", inputElement: "", calcElement: "", funct: handlerAC },
    { tasto: "Del", inputElement: "", calcElement: "", funct: handlerDel },

    //riga---

    { tasto: "4", inputElement: "4", calcElement: "4", funct: $handlerGENERIC },
    { tasto: "5", inputElement: "5", calcElement: "5", funct: $handlerGENERIC },
    { tasto: "6", inputElement: "6", calcElement: "6", funct: $handlerGENERIC },
    { tasto: "x", inputElement: "x", calcElement: "*", funct: $handlerGENERIC },
    //prettier-ignore
    { tasto: "/", inputElement: divisionSymbol, calcElement: "/", funct: $handlerGENERIC},

    //riga---

    { tasto: "1", inputElement: "1", calcElement: "1", funct: $handlerGENERIC },
    { tasto: "2", inputElement: "2", calcElement: "2", funct: $handlerGENERIC },
    { tasto: "3", inputElement: "3", calcElement: "3", funct: $handlerGENERIC },
    { tasto: "+", inputElement: "+", calcElement: "+", funct: $handlerGENERIC },
    { tasto: "-", inputElement: "-", calcElement: "-", funct: $handlerGENERIC },

    //riga---

    { tasto: ".", inputElement: ".", calcElement: ".", funct: $handlerGENERIC },
    { tasto: "0", inputElement: "0", calcElement: "0", funct: $handlerGENERIC },
    { tasto: "Ans", inputElement: "Ans", calcElement: "", funct: handlerAns },
    { tasto: "=", inputElement: "", calcElement: "", funct: handlerEqual },
    //prettier-ignore
    { tasto: "Mod", inputElement: "Mod", calcElement: "%", funct: $handlerGENERIC }
];
export default tasti;
