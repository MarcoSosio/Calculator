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

const tasti = [
    /*
    primo elemento: ciò che appare sul bottone,
    secondo elemento: ciò che l'utente inserisce,
    terzo elemento: espressione da valutare
    */

    { tasto: "pi", inputUtente: String.fromCharCode(960), valExp: String(Math.PI) },
    { tasto: "rx", inputUtente: String.fromCharCode(0x221A), valExp: "--?--" },
    { tasto: "px", inputUtente: "^", valExp: "**" },
    { tasto: "(", inputUtente: "(", valExp: "(" },
    { tasto: ")", inputUtente: ")", valExp: ")" },

    //riga---

    { tasto: "7", inputUtente: "7", valExp: "7" },
    { tasto: "8", inputUtente: "8", valExp: "8" },
    { tasto: "9", inputUtente: "9", valExp: "9" },
    { tasto: "AC", inputUtente: "--?--", valExp: "--?--" },
    { tasto: "Del", inputUtente: "--?--", valExp: "--?--" },

    //riga---

    { tasto: "4", inputUtente: "4", valExp: "4" },
    { tasto: "5", inputUtente: "5", valExp: "5" },
    { tasto: "6", inputUtente: "6", valExp: "6" },
    { tasto: "x", inputUtente: "x", valExp: "*" },
    { tasto: "/", inputUtente: "/", valExp: "/" },

    //riga---

    { tasto: "1", inputUtente: "1", valExp: "1" },
    { tasto: "2", inputUtente: "2", valExp: "2" },
    { tasto: "3", inputUtente: "3", valExp: "3" },
    { tasto: "+", inputUtente: "+", valExp: "+" },
    { tasto: "-", inputUtente: "-", valExp: "-" },

    //riga---

    { tasto:".", inputUtente:"0", valExp:"0" },
    { tasto:"0", inputUtente:"0", valExp:"0" },
    { tasto:"Ans", inputUtente:"Ans", valExp:"--?--" },
    { tasto:"=", inputUtente:"--?--", valExp:"--?--" },
    { tasto:"mod", inputUtente:"mod", valExp:"%" },

];
export default tasti;