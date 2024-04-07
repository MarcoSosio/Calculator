/* eslint-disable no-unused-vars */
import "./Display.scss"
import Context from "../Context";
import { useContext, useEffect, useRef, useState } from "react";

export default function Display(){
    //*copia della funzione presente in index.scss
    const stdProporzione = 2 / 1; // vw/rem
    function calc_dim(vw_rem, scala) {
        return `calc(${vw_rem * scala}vw + ${scala}rem)`;
    }

    const $context = useContext(Context);
    const { inputExpState, resultState } = $context;
    const [inputExpValue, setInputExpValue] = inputExpState;
    const [resultValue, setResultValue] = resultState;

    const [scalaFontSizeExp, setScalaFontSizeExp] = useState(1.5);

    const [scalaFontSizeResult, setScalaFontSizeResult] = useState(2);

    const refs = {
        inputExpDiv: useRef(),
        inputExpSpan: useRef(),

        resultDiv: useRef(),
        resultSpan: useRef(),
    };

    function handleOverflow({div, span, minSize, reduction, scalaFontSizeState, type}){
        const [scalaFontSize,setScalaFontSize]=scalaFontSizeState;
        if(span.offsetWidth > div.offsetWidth && scalaFontSize>minSize){
            setScalaFontSize(scalaFontSize-reduction);
        }
        else if(scalaFontSize<minSize){
            div.style.overflowX = 'scroll';
        }
    }

    useEffect(
        function () {
            handleOverflow({
                type:"exp",
                div: refs.inputExpDiv.current,
                span: refs.inputExpSpan.current,
                minSize: 1,
                reduction: 0.05,
                scalaFontSizeState: [scalaFontSizeExp, setScalaFontSizeExp],
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [inputExpValue,scalaFontSizeExp]
    );
    useEffect(
        function () {
            handleOverflow({
                type:"result",
                div: refs.resultDiv.current,
                span: refs.resultSpan.current,
                minSize: 1.4,
                reduction: 0.05,
                scalaFontSizeState: [scalaFontSizeResult, setScalaFontSizeResult],
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [resultValue,scalaFontSizeResult]
    );

    return (
        <div id="Display">
            <div
                ref={refs.inputExpDiv}
                className="calcoli"
                style={{ fontSize: calc_dim(stdProporzione,scalaFontSizeExp)}}
            >
                <span ref={refs.inputExpSpan}>{inputExpValue}</span>
            </div>
            <div
                ref={refs.resultDiv}
                className="calcoli"
                id="output"
                style={{ fontSize: calc_dim(stdProporzione,scalaFontSizeResult) }}
            >
                <span ref={refs.resultSpan}>{resultValue}</span>
            </div>
        </div>
    );
}