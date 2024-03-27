export const returnOccupiedParkingSpace = (array)=>{
return(array.map((obj)=>(obj.value)).reduce((totalValue,currentValue)=>(totalValue += currentValue)))
}