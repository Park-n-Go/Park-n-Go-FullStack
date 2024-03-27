export const removeNullValueFromAnObject = (OBJ)=>{

    const filteredObject = Object.fromEntries(
        Object.entries(OBJ).filter(([key, value]) => ((value !== null && value !== undefined && value !== "" ) || (Array.isArray(value) && value.length > 0)))
      );

      return (filteredObject)

}