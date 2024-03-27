export const DateAndTimeInHuman = (DateAndTime)=>{
    const dateTime = new Date(DateAndTime);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
      };
      
      const formattedDateTime = dateTime.toLocaleString('en-US', options);
      return(formattedDateTime)

}