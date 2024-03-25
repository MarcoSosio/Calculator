import "./Tastiera.scss";
import Bottone from "../Bottone/Bottone.jsx";
import tasti from "./Tasti_elenco.js"
export default function Tastiera(){
    return (
        <div id="Tastiera">
            {tasti.map((x) => (
                <Bottone key={x.tasto} inputUtenteProp={x.inputUtente} valExpProp={x.valExp}>
                    {x.tasto}
                </Bottone>
            ))}
        </div>
    );
}