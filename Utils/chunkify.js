export const chunkify=(array,start,end)=>{
if(!array && !start && !end){
    return ("Array is missing")
}
    return(array.filter((element)=>(element !== null)).slice(start, end))
}