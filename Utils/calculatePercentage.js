export const calculatePercentage = (total,num)=>{
    const parameter_total = parseFloat(total.toFixed(2))
    const parameter_num = parseFloat(num.toFixed(2))
    if(!parameter_total || !parameter_num){
        return("Parameters missing!")
    }
    return(((num/total)*100).toFixed(2))
}