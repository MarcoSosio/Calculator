export function calculateRoot(rootIndexStateParam,openRootStateParam,calcExpParam){
    console.log(openRootStateParam)
    const [rootIndexValue, setRootIndexValue] = rootIndexStateParam
    const [openRootValue,setOpenRootValue]=openRootStateParam
    const index = rootIndexValue[rootIndexValue.length-1]
    //setRootNumberValue(rootNumberValue-1);
    setRootIndexValue(rootIndexValue.slice(0,-1));
    setOpenRootValue(openRootValue.slice(0, -1));
    return calcExpParam + `**(1/${index})`
}