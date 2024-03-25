import "./Bottone.scss";
import Context from "../Context.jsx";
import { useContext } from "react";
// eslint-disable-next-line react/prop-types
export default function Bottone({children, inputUtenteProp, valExpProp}){

    const $context=useContext(Context);
    const {expState}=$context;
    const [expValue,setExpValue]=expState;

    function handler(){
        setExpValue(expValue+inputUtenteProp)
    }
    return(
        <button className="tasto" onClick={handler}>{children}</button>
    )
}