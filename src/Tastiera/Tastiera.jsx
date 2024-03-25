import "./Tastiera.scss";
import Bottone from "../Bottone/Bottone.jsx";
import { useContext } from "react";
import Context from "../Context.jsx";
import tasti from "./Tasti_elenco.js"
export default function Tastiera(){
    const context=useContext(Context);
    const {exp}=context;
    const [espressione,setEspressione]=exp;
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
    return (
        <div id="Tastiera">
            {tasti.map((x) => (
                <Bottone key={x}>{x}</Bottone>
            ))}
        </div>
    );
}