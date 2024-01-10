export const removeNullValueFromAnObject = (OBJ)=>{

    const filteredObject = Object.fromEntries(
        Object.entries(OBJ).filter(([key, value]) => (value !== null && value !== undefined))
      );

      return (filteredObject)

}