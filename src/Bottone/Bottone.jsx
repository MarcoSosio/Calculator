import "./Bottone.scss";

// eslint-disable-next-line react/prop-types
export default function Bottone({children}){
    return(
        <button className="tasto">{children}</button>
    )
}