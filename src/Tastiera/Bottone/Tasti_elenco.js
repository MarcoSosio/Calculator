/* eslint-disable no-unused-vars */
import { calculateRoot, gestisciSeno, getRootIndex } from "./Funzioni";
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

function handlerEqual({
    resultStateParam,
    calcExpStateParam,
    ansStateParam,
    rootIndexStateParam,
    openRootStateParam
}) {
    const [resultValue, setResultValue] = resultStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    let risultato;
    let risposta = "";
    let exp = calcExpValue;

    //se non ho ancora calcolato radici le calcolo
    if (rootIndexValue.length != 0) {
        exp = calculateRoot(rootIndexStateParam, openRootStateParam, exp);
        console.log(exp);
    }

    try {
        risultato = eval(exp);
        risposta = risultato;
        if (!isFinite(risultato) || isNaN(risultato)) {
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
        const regExpr = new RegExp(`${nthRootSymbol}|Ans|Mod|.`, "g");
        let x;
        do {
            x = regExpr.exec(inputExpValue);
            if (x != null) {
                inputExpValueArray.push(x);
            }
        } while (x != null);
        return inputExpValueArray;
    }

    let newInputExpValueArray = splitInputExpValue(inputExpValue);
    newInputExpValueArray = newInputExpValueArray.slice(0, -1);
    const newInputExpValue= newInputExpValueArray.join();
    _setDelInputExpValue_(newInputExpValue);

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
    const [resultValue, setResultValue] = resultStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    if (ansValue) {
        setInputExpValue(inputExpValue + "Ans");
        setCalcExpValue(calcExpValue + ansValue);
    } else {
        console.log("No answer");
    }
}

function handlerSqrt({
    inputExpStateParam,
    rootIndexStateParam,
    openRootStateParam,
    calcExpStateParam
}) {
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
    setInputExpValue(inputExpValue + rootSymbol);
    setRootIndexValue([...rootIndexValue, 2]);
}

function handlerNthRoot({
    inputExpStateParam,
    calcExpStateParam,
    rootIndexStateParam,
    openRootStateParam
}) {
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
    setInputExpValue(inputExpValue + nthRootSymbol);
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

function handlerSin({ inputExpStateParam, calcExpStateParam }) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;

    let calcExp = gestisciSeno();
    setInputExpValue(inputExpValue + "sin");
}

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

    { tasto: piSymbol, inputElement: piSymbol, calcElement: String(Math.PI) },
    { tasto: "D/R", inputElement: "", calcElement: "", funct: handlerDegRad },
    { tasto: "sin", inputElement: "sin", calcElement: "", funct: handlerSin },
    {},
    {},

    {
        tasto: rootSymbol,
        inputElement: rootSymbol,
        calcElement: "",
        funct: handlerSqrt
    }, //radice quadrata
    {
        tasto: nthRootSymbol,
        inputElement: nthRootSymbol,
        calcElement: "",
        funct: handlerNthRoot
    }, //radice n-esima
    { tasto: "^", inputElement: "^", calcElement: "**" },
    { tasto: "(", inputElement: "(", calcElement: "(" },
    { tasto: ")", inputElement: ")", calcElement: ")" },

    //riga---

    { tasto: "7", inputElement: "7", calcElement: "7" },
    { tasto: "8", inputElement: "8", calcElement: "8" },
    { tasto: "9", inputElement: "9", calcElement: "9" },
    { tasto: "AC", inputElement: "", calcElement: "", funct: handlerAC },
    { tasto: "Del", inputElement: "", calcElement: "", funct: handlerDel },

    //riga---

    { tasto: "4", inputElement: "4", calcElement: "4" },
    { tasto: "5", inputElement: "5", calcElement: "5" },
    { tasto: "6", inputElement: "6", calcElement: "6" },
    { tasto: "x", inputElement: "x", calcElement: "*" },
    { tasto: "/", inputElement: String.fromCharCode(247), calcElement: "/" },

    //riga---

    { tasto: "1", inputElement: "1", calcElement: "1" },
    { tasto: "2", inputElement: "2", calcElement: "2" },
    { tasto: "3", inputElement: "3", calcElement: "3" },
    { tasto: "+", inputElement: "+", calcElement: "+" },
    { tasto: "-", inputElement: "-", calcElement: "-" },

    //riga---

    { tasto: ".", inputElement: "0", calcElement: "0" },
    { tasto: "0", inputElement: "0", calcElement: "0" },
    { tasto: "Ans", inputElement: "Ans", calcElement: "", funct: handlerAns },
    { tasto: "=", inputElement: "", calcElement: "", funct: handlerEqual },
    { tasto: "Mod", inputElement: "Mod", calcElement: "%" }
];
export default tasti;
