export const removeNullValueFromAnObject = (OBJ)=>{
     const filteredObject = []
     
     
        Object.entries(OBJ).forEach(([key, value]) => {

          if (Array.isArray(value)){
            filteredObject.push([key,value])
            return
            }


            if(typeof(value) === "object" && value!== null && value !== undefined && value !== "" && !Array.isArray(value) )
            {
              filteredObject.push([key,removeNullValueFromAnObject(value)])
              return
            }   
          if (value !== null && value !== undefined && value !== "" && !Array.isArray(value))
          {
            filteredObject.push([key,value])
            return
          }
        
        }
        
        
        )

      return (Object.fromEntries(filteredObject))

}