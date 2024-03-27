import { calculateRoot } from "./Funzioni";
/*
const tasti=
    [
        "2nd","deg","?","??","???",
        "sin","cos","tan","log","ln",
        "pi/e","rx","px","(",")",
        "7","8","9","AC","Del",
        "4","5","6","x","/",
        "1","2","3","+","-",
        ".","0","Ans","=","Mod",
    ];
*/
const simboloRadice = String.fromCharCode(0x02E3) + String.fromCharCode(0x221A)

function handlerEqual({resultStateParam, calcExpStateParam, ansStateParam, rootIndexStateParam}){
    const [resultValue,setResultValue] = resultStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [ansValue, setAnsValue] = ansStateParam;
    const [rootIndexValue,setRootIndexValue] =rootIndexStateParam;
    //console.log(calcExpValue)
    let risultato;
    let risposta="";
    let exp=calcExpValue;

    if (rootIndexValue!=null){
        exp=calculateRoot(rootIndexValue,setRootIndexValue,exp);
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
    console.log(risultato);
    setCalcExpValue(exp);
    setResultValue(risultato);
    setAnsValue(risposta);
}

function handlerDel({inputExpStateParam}){
    const [inputExpValue,setInputExpValue]=inputExpStateParam;
    const newValue=inputExpValue.slice(0,inputExpValue.length-1);
    setInputExpValue(newValue);
    console.error("Not finished");
}

function handlerAC({inputExpStateParam, calcExpStateParam, resultStateParam}){
    const [inputExpValue, setInputExpValue] = inputExpStateParam;
    const [calcExpValue, setCalcExpValue] = calcExpStateParam;
    const [resultValue, setResultValue] = resultStateParam;
    setInputExpValue("");
    setCalcExpValue("");
    setResultValue("");
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

function handlerNthRoot({inputExpStateParam, calcExpStateParam, rootIndexStateParam}){
    const [inputExpValue, setInputExpValue] = inputExpStateParam
    const [calcExpValue, setCalcExpValue] = calcExpStateParam
    const [rootIndexValue,setRootIndexValue]=rootIndexStateParam
    setInputExpValue(inputExpValue+simboloRadice)
    // eslint-disable-next-line no-useless-escape
    const regExpr = /[-+*\/]/

    const arrayExp = calcExpValue.split(regExpr);
    setRootIndexValue( arrayExp[arrayExp.length-1] )//prendo l'indice di radice (ultimo numero)
    setCalcExpValue( calcExpValue.slice(0, calcExpValue.length - 1) );//tolgo l'indice di radice
    console.warn("TODO")
}

const tasti = [
    /*
    primo elemento: ciò che appare sul bottone,
    secondo elemento: ciò che l'utente inserisce,
    terzo elemento: espressione da valutare
    */

    { tasto: String.fromCharCode(960), inputElement: String.fromCharCode(960), calcElement: String(Math.PI) },
    { tasto: simboloRadice, inputElement: simboloRadice, calcElement: "",funct: handlerNthRoot},
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
    { tasto: "/", inputElement: "/", calcElement: "/" },

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