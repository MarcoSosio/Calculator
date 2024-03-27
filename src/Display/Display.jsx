import "./Display.scss"
import Context from "../Context";
import { useContext } from "react";

export default function Display(){
    const $context=useContext(Context);
    const {inputExpState, calcExpState, resultState} = $context;
    const [inputExpValue, setInputExpValue] = inputExpState;
    const [calcExpValue, setCalcExpValue] = calcExpState;
    const [resultValue, setResultValue] = resultState;

    return (
        <div id="Display">
            <div className="calcoli" id="input">
                {inputExpValue}
            </div>
            <div className="calcoli" id="output">
                {resultValue}
            </div>
        </div>
    );
}