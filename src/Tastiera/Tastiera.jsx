import "./Tastiera.scss";
import Bottone from "../Bottone/Bottone.jsx";
import tasti from "./Tasti_elenco.js"
export default function Tastiera(){
    let k=0;
    return (
        <div id="Tastiera">
            {tasti.map((btn) => (
                <Bottone key={btn.tasto} 
                    inputElementProp={btn.inputElement} calcElementProp={btn.calcElement}
                    functProp={btn.funct}
                >
                    {btn.tasto}
                </Bottone>
            ))}
        </div>
    );
}