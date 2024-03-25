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
    { tasto:".", inputUtente:"0", espressione:"0" },
    { tasto:"0", inputUtente:"0", espressione:"0" },
    { tasto:"Ans", inputUtente:"Ans", espressione:"--?--" },
    { tasto:"=", inputUtente:"--?--", espressione:"--?--" },
    { tasto:"mod", inputUtente:"mod", espressione:"%" },

    //riga---

    { tasto: "1", inputUtente: "1", espressione: "1" },
    { tasto: "2", inputUtente: "2", espressione: "2" },
    { tasto: "3", inputUtente: "3", espressione: "3" },
    { tasto: "+", inputUtente: "+", espressione: "+" },
    { tasto: "-", inputUtente: "-", espressione: "-" },

    //riga---

    { tasto: "4", inputUtente: "4", espressione: "4" },
    { tasto: "5", inputUtente: "5", espressione: "5" },
    { tasto: "6", inputUtente: "6", espressione: "6" },
    { tasto: "x", inputUtente: "x", espressione: "*" },
    { tasto: "/", inputUtente: "/", espressione: "/" },

    //riga---

    { tasto:"7", inputUtente: "7", espressione:"7" },
    { tasto: "8", inputUtente: "8", espressione: "8" },
    { tasto: "9", inputUtente: "9", espressione: "9" },
    { tasto: "9", inputUtente: "9", espressione: "9" },
    { tasto: "AC", inputUtente: "--?--", espressione: "--?--" },
    { tasto: "Del", inputUtente: "--?--", espressione: "--?--" },

    //riga---

    { tasto: "pi", inputUtente: String.fromCharCode(960), espressione: String(Math.PI) },
    { tasto: "rx", inputUtente: String.fromCharCode(0x221A), espressione: "--?--"},
    { tasto: "px", inputUtente: "^" , espressione:"**" },
    { tasto: "(", inputUtente:"(", espressione:"("},
    { tasto: ")", inputUtente:")", espressione:")"}


];
export default tasti;