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

function handlerEqual(states) {
    const {
        resultStateParam,
        calcExpStateParam,
        ansStateParam,
        rootIndexStateParam
    } = states;
    const [resultValue, setResultValue] = resultStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    let risultato;
    let risposta = "";
    let exp = calcExpValue;

    //se non ho ancora calcolato radici le calcolo
    if (
        rootIndexValue.length != 0 &&
        !isNaN(Number(rootIndexValue[rootIndexValue.length - 1]))
    ) {
        exp = calculateRoot(states, exp);
        console.log(exp);
    } else if (
        rootIndexValue.length != 0 &&
        isNaN(Number(rootIndexValue[rootIndexValue.length - 1]))
    ) {
        exp = calculateTrigonometric(states, exp);
        console.log(exp);
    }

    try {
        risultato = eval(exp);
        risposta = risultato;
        //prettier-ignore
        if ((!isFinite(risultato) || isNaN(risultato)) && risultato != undefined) {
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
    resultStateParam,
    rootIndexStateParam,
    openRootStateParam,
    _delInputExpStateParam_,
    funExpStateParam
}) {
    /*Tasto per eliminare tutti i calcoli
    Resetta tutto a parte il valore della risposta predecente ansValue
    Non resetto indexElementValue perché è uno stato che si resetta da solo*/
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [resultValue, setResultValue] = resultStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpStateParam_;
    const [funExpValue, setFunExpValue] = funExpStateParam;
    setInputExpValue("");
    setCalcExpValue("");
    setResultValue("");
    setRootIndexValue([]);
    setOpenRootValue([]);
    _setDelInputExpValue_([]);
    setFunExpValue([]);
}

function handlerDel(params) {
    //rimuovo l'ultimo elemento (numero, operatore, funzione, parentesi ...)
    const {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam,
        _delInputExpStateParam_,
        indexElementStateParam,
        funExpStateParam
    } = params;

    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [_delInputExpValue_, _setDelInputExpValue_] = _delInputExpStateParam_;
    const [indexElementValue, setIndexElementValue] = indexElementStateParam;
    const [funExpValue, setFunExpValue] = funExpStateParam;

    function splitInputExpValue(inputExpValue) {
        /* Spezzetta (Tokenizza) l'espressione in un array in cui ogni elemento 
        corriponde al gruppo di caratteri da eleminare, dunque corrisponde a 
        un inputElement di un tasto.
        Se ho per esempio 3+ˣ√4+5Mod2 
        inputExpValueArray=["3", "+", "ˣ√", "4", "5", "Mod", "2"].
        Eliminerò l'ultimo elemento dell'array */
        let inputExpValueArray = [];
        const regExpr = new RegExp(
            `${nthRootSymbol}|Ans|Mod|sin |cos |tan |.`,
            "g"
        );
        let x;
        do {
            x = regExpr.exec(inputExpValue);
            if (x != null) {
                /*exec restituisce un array con varie informazioni a me serve
                l'informazione che mi esplicita la corrispondenza trovata*/
                inputExpValueArray.push(x[0]);
            }
        } while (x != null);
        return inputExpValueArray;
    }

    let newDelExpValue = splitInputExpValue(inputExpValue);
    newDelExpValue = newDelExpValue.slice(0, -1); //elimino l'ultimo elemento

    /*la modidica degli stati _delInputExpValue_ e indexElementValue scatenerà 
    un effetto (vedi Tastiera.jsx)
    Questa funzione rileggerà da capo la nuova inputExpValue e ne dedurrà la 
    corripondente calcExpValue. Per questo è necessario che gli stati vengano azzerati
    */

    _setDelInputExpValue_(newDelExpValue);

    setInputExpValue("");
    setCalcExpValue("");
    setOpenRootValue([]);
    setRootIndexValue([]);
    setFunExpValue([]);

    setIndexElementValue(0); //set to 0 instead of null
}

function handlerAns({ inputExpStateParam, calcExpStateParam, ansStateParam }) {
    //ottieni l'ultimo risultato
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

function handlerNthRoot(states, { inputElementParam }) {
    /*
    Per calcolare le radici eseguiamo **(1/i) sul radicando (dove i è l'indice
    di radice) ma non immediatamente ma solo dopo che è stato determinato tutto il radicando.
    Utilizziamo rootIndexValue per capire se ci sono calcoli di radici da eseguire in sospeso .
    Nell'attesa di eseguire questo calcolo utilizziamo degli stati
    (openRootValue, rootIndexValue) per memorizzare delle informazioni necessarie
    a capire quando eseguire il calcolo (openRootValue) e qual'è l'indice di radice
    (rootIndexValue).
    Utilizziamo degli stati in forma di array per fare in modo che possano essere
    memorizzati dati relativi a diversi calcoli di radici in sospeso, aspetto che 
    può essere utile nel caso di radici innestate

    > vedi per dettagli rootFunctions.js --> gestisciRadici
    */
    const {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam
    } = states;
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    let calcExp = calcExpValue;

    /*Anche la radice n-esima fa eseguire il calcolo della radice predecente come 
    fosse un altro operatore come + o un -, questo per gestire situazioni del tipo
    3ˣ√8ˣ√4 dove ci si aspetta (3ˣ√8)ˣ√4 = 2ˣ√4 = 2 */
    if (openRootValue[openRootValue.length - 1] == 0) {
        calcExp = calculateRoot(states, calcExpValue);
    }


    const rootIndex = getRootIndex(calcExp);
    /*Tolgo l'indice di radice togliendo tanti caratteri quanta la lunghezza dell'indice
    L'indice di radici infatti deve essere acquisito ora ma (perché si scrive davanti
    alla radice) ma deve essere inserito solo al momento del calcolo nell' operazione **(1/i) */
    calcExp = calcExp.slice(0, -rootIndex.length);
    /*apriamo una parentesi che chiuderemo al momento del calcolo per tenere assieme
    tutto il radicando*/
    calcExp += "(";
    setInputExpValue(inputExpValue + inputElementParam);
    setCalcExpValue(calcExp);

    setRootIndexValue([...rootIndexValue, rootIndex]);
    setOpenRootValue([...openRootValue, 0]);
}

function handlerSqrt(states, { inputElementParam }) {

    const {
        inputExpStateParam,
        rootIndexStateParam,
        openRootStateParam,
        calcExpStateParam
    } = states;
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;

    let calcExp = calcExpValue;

    /* if (openRootValue[openRootValue.length - 1] == 0) {
        calcExp = calculateRoot(
            states,
            calcExpValue
        );
    } */ //? Necessità dubbia

    calcExp += "(";
    setCalcExpValue(calcExp);
    setInputExpValue(inputExpValue + inputElementParam);

    setOpenRootValue([...openRootValue, 0]);
    setRootIndexValue([...rootIndexValue, 2]);
}

function handlerDegRad({ degRadStateParam }) {
    //imposta gradi-radianti
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

    /*Con le funzioni trigonometriche inserisco nella calcExpValue una funzione 
    aperta (vedi sotto la calcExp corrispondente) che verrà chiusa una volta determinata
    l'espressione argomento della funzione. Questo processo che determina quando 
    chiudere la funzione è analogo a quello usato nelle radici 
    Utilizzo openRootValue con valore speciale "f" per sapere che ho una funzione
    da chiudere ma ovviamente in questo caso non ho un indice di radice e non devo 
    calcolare una radice*/
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
) {
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam;
    const [openRootValue, setOpenRootValue] = openRootStateParam;
    const [funExpValue, setFunExpValue] = funExpStateParam;

    /*Nel caso della tangente faccio tutto ciò che ho fatto prima ma utilizzo uno
    stato funExpValue che memorizza l'indice del carattere dopo di cui inizia l'espressione 
    argomento della tangente (per risalire facilmente all'argomento della tangente).
    Utilizzo un array sempre per il fatto che posso avere più funzioni aperte 
    contemporaneamente similmente alle radici
    Devo fare questo perché per calcolare la tangente non utilizzo semplicemente 
    Math.tan() divido il seno per il coseno. Questo perché Math.tan(90°) restituisce
    un numero mentre in realtà è un operazione impossibile
    Imposto rootIndexValue su t per ricordare che ho in sospeso il calcolo di una tangente*/
    let newCalcExpValue = calcExpValue + calcElementParam;
    setInputExpValue(inputExpValue + inputElementParam);
    setCalcExpValue(newCalcExpValue);
    setRootIndexValue([...rootIndexValue, "t"]);
    setFunExpValue([...funExpValue, newCalcExpValue.length - 1]);
    setOpenRootValue([...openRootValue, 0]);
}

function $handlerGENERIC(states, { inputElementParam, calcElementParam }) {
    const {
        inputExpStateParam,
        calcExpStateParam
    } = states;
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    //! Come si può notare si imposta lo stato sul nuovo valore di calcExpValue
    //! solo dopo aver fatto i calcoli, dunque il valore appena inserito
    //! (calcElementProp) non sarà parte dell'espressione al momento dei calcoli
    let calcExp = calcExpValue;
    //eseguo le funzioni che consentono di gestire e calcolare radici e funzioni
    //prettier-ignore
    calcExp = gestisciRadici(states, calcElementParam, calcExp);
    calcExp = gestisciTrigonometric(states, calcElementParam, calcExp);
    setInputExpValue(inputExpValue + inputElementParam);
    calcExp += calcElementParam;
    setCalcExpValue(calcExp);
}
const calcElementTan = "parseFloat(  parseFloat(  Math.sin(  (";
// complementare di chiusura
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
    { tasto: "sin", inputElement: "sin ", calcElement: "parseFloat(Math.sin((", funct: handlerSinCos },
    //prettier-ignore
    { tasto: "cos", inputElement: "cos ", calcElement: "parseFloat(Math.cos((", funct: handlerSinCos },
    //prettier-ignore
    { tasto: "tan", inputElement: "tan ", calcElement: calcElementTan, funct: handlerTan },

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
    { tasto: "/", inputElement: divisionSymbol, calcElement: "/", funct: $handlerGENERIC },

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
