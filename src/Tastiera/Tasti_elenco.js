/* eslint-disable no-unused-vars */
import { calculateRoot,getRootIndex } from "./Funzioni";
/*
    ? "2nd","deg","?","??","???",
    ? "sin","cos","tan","log","ln",
    * "pi/e","rx","px","(",")",
    * "7","8","9","AC","Del",
    * "4","5","6","x","/",
    * "1","2","3","+","-",
    * ".","0","Ans","=","Mod",
*/

const rootSymbol = String.fromCharCode(0x221A);
const nthRootSymbol = String.fromCharCode(0x02E3) + rootSymbol;
const piSymbol = String.fromCharCode(960);

function handlerEqual({resultStateParam, calcExpStateParam, ansStateParam, rootIndexStateParam, openRootStateParam}){
    const [resultValue,setResultValue] = resultStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    const [rootIndexValue,setRootIndexValue] =rootIndexStateParam;
    let risultato;
    let risposta="";
    let exp=calcExpValue;

    if (rootIndexValue.length!=0){
        exp = calculateRoot(rootIndexStateParam, openRootStateParam ,exp);
        console.log(exp)
    }

    try {
        risultato=eval(exp);
        risposta=risultato;
        if( !isFinite(risultato) || isNaN(risultato)){
            risultato="Math Error";
            risposta="";
        }
    } catch (error) {
        risposta = "";
        switch(error.name){
            case "SyntaxError":
                risultato="Syntax Error";
                break;
            default:
                console.error("Errore")
        }
    }
    setCalcExpValue(exp);
    setResultValue(risultato);
    setAnsValue(risposta);
}

function handlerAC({inputExpStateParam, calcExpStateParam, resultStateParam}){
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [resultValue, setResultValue] = resultStateParam;
    setInputExpValue("");
    setCalcExpValue("");
    setResultValue("");
}

function handlerDel(params){
    /*
    1- Prendo la inputExp
    2- La copio in una variabile toglieno l'ultimo elemento
    3- Azzero tutti gli stati
    4- Scorro ogni elemento dell'espressione facendo ciò che faccio quando premo un tasto
        A- Aggiorno lo stato
        B- Rendring per rendere disponibile il nuovo valore

        Esegui il rendring non con un ciclo for ma con
        -useEffect
    */
    const {
        inputExpStateParam,
        calcExpStateParam,
        rootIndexStateParam,
        openRootStateParam,
        _delInputExpStateParam_,
        indexElementStateParam
    } = params;

    const [inputExpValue,setInputExpValue]=inputExpStateParam;
    const [calcExpValue,setCalcExpValue]=calcExpStateParam;
    const [openRootValue,setOpenRootValue]=openRootStateParam;
    const [rootIndexValue,setRootIndexValue]=rootIndexStateParam;
    const [_delInputExpValue_,_setDelInputExpValue_]=_delInputExpStateParam_
    const [indexElementValue,setIndexElementValue] = indexElementStateParam

    //! slice(0,-1) non gestisce correttamente la radice nesima perché lascia la x
    let newInputExpValue = inputExpValue.slice(0, -1);
    // se l'ultimo carattere e x apice (gestisce il caso delle radici n-esime)
    if (newInputExpValue[newInputExpValue.length - 1] === String.fromCharCode(0x02E3)){
        newInputExpValue.slice(0,-1);
    }
    _setDelInputExpValue_(newInputExpValue);

    //reset all to recalculate
    setInputExpValue("");
    setCalcExpValue("");
    setOpenRootValue([]);
    setRootIndexValue([]);

    setIndexElementValue(0); //set to 0 instead of null
}


function handlerAns({inputExpStateParam, calcExpStateParam, resultStateParam, ansStateParam}){
    const [inputExpValue, setInputExpValue] = inputExpStateParam
    const [resultValue, setResultValue]=resultStateParam
    const [calcExpValue, setCalcExpValue]=calcExpStateParam
    const [ansValue, setAnsValue] = ansStateParam;
    if(ansValue){
        setInputExpValue(inputExpValue + "Ans");
        setCalcExpValue(calcExpValue+ansValue);
    }
    else{
        console.log("No answer")
    }
}

function handlerSqrt({ inputExpStateParam, rootIndexStateParam, openRootStateParam, calcExpStateParam}){
    const [inputExpValue, setInputExpValue] = inputExpStateParam
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam
    const [openRootValue, setOpenRootValue] = openRootStateParam
    const [calcExpValue, setCalcExpValue] = calcExpStateParam
    
    let calcExp = calcExpValue
    console.log("PrevCalcExp " + calcExp)

    if (openRootValue[openRootValue.length - 1] == 0) {
        calcExp = calculateRoot(rootIndexStateParam, openRootStateParam, calcExpValue)
    }
    calcExp += "("
    setCalcExpValue(calcExp)
    setOpenRootValue([...openRootValue,0])
    setInputExpValue(inputExpValue+rootSymbol);
    setRootIndexValue([...rootIndexValue,2]);
}

function handlerNthRoot({ inputExpStateParam, calcExpStateParam, rootIndexStateParam, openRootStateParam }){
    const [inputExpValue, setInputExpValue] = inputExpStateParam
    const [calcExpValue, setCalcExpValue] = calcExpStateParam
    const [rootIndexValue,setRootIndexValue]=rootIndexStateParam
    const [openRootValue, setOpenRootValue] = openRootStateParam
    let calcExp=calcExpValue
    if (openRootValue[openRootValue.length - 1] == 0) {
        calcExp = calculateRoot(rootIndexStateParam, openRootStateParam, calcExpValue)
    }
    const rootIndex = getRootIndex(calcExp)
    setOpenRootValue([...openRootValue, 0])
    calcExp = calcExp.slice(0, -rootIndex.length);
    calcExp += "("
    setInputExpValue(inputExpValue+nthRootSymbol)
    /*Divido l'espressione a ogni operatore per determinare quale numero è l'indice di radice */

    setRootIndexValue([...rootIndexValue, rootIndex] )//prendo l'indice di radice (ultimo numero)
    /*Tolgo l'indice di radice togliendo tanti caratteri quanta la lunghezza dell'indice*/
    setCalcExpValue( calcExp ); 
}

export const tasti = [
    /*
    primo elemento: ciò che appare sul bottone,
    secondo elemento: ciò che l'utente inserisce,
    terzo elemento: espressione da valutare
    */

    { tasto: piSymbol, inputElement: piSymbol, calcElement: String(Math.PI) },
    {},
    {},
    {},
    {},

    { tasto: rootSymbol, inputElement: "", calcElement:"", funct:handlerSqrt},
    { tasto: nthRootSymbol, inputElement: "", calcElement: "",funct: handlerNthRoot},
    { tasto: "^", inputElement: "^", calcElement: "**" },
    { tasto: "(", inputElement: "(", calcElement: "(" },
    { tasto: ")", inputElement: ")", calcElement: ")" },

    //riga---

    { tasto: "7", inputElement: "7", calcElement: "7" },
    { tasto: "8", inputElement: "8", calcElement: "8" },
    { tasto: "9", inputElement: "9", calcElement: "9" },
    { tasto: "AC", inputElement: "", calcElement: "", funct:handlerAC},
    { tasto: "Del", inputElement: "", calcElement: "", funct:handlerDel},

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

    { tasto:".", inputElement:"0", calcElement:"0" },
    { tasto:"0", inputElement:"0", calcElement:"0" },
    { tasto:"Ans", inputElement:"", calcElement:"", funct:handlerAns},
    { tasto:"=", inputElement:"", calcElement:"", funct:handlerEqual},
    { tasto:"Mod", inputElement:"Mod", calcElement:"%" },

];
export default tasti;
