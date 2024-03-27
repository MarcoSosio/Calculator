export function calculateRoot(rootIndexValue,setRootIndexValue,calcExp){
    const index = rootIndexValue
    setRootIndexValue(null);
    return calcExp + `**(1/${index})`
}