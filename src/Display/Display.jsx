import "./Display.scss"

export default function Display(){
    return (
        <div id="Display">
            <div className="calcoli" id="input">
                1+1
            </div>
            <div className="calcoli" id="output">
                {String.fromCharCode(0x221a)}
            </div>
        </div>
    );
}