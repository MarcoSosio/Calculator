import "./Display.scss"
import Context from "../Context";
import { useContext } from "react";

export default function Display(){
    const $context=useContext(Context);
    const {expState}=$context;
    const [expValue, setExpValue] = expState;

    return (
        <div id="Display">
            <div className="calcoli" id="input">
                {"1"+expValue}
            </div>
            <div className="calcoli" id="output">
                Result
            </div>
        </div>
    );
}