export const filterOBJwithKeys= (OBJ,listOfKeys)=>{

    if (!(OBJ || listOfKeys)) {
        return "Object and List Of Key is missing!!!";
      }
      let filteredOBJ = {}

    
      listOfKeys.forEach((key)=>{
        if (OBJ.hasOwnProperty("_doc")) {

          if(OBJ._doc[key]){
          filteredOBJ[key]=OBJ._doc[key]
          }
        }
         else {
          if(OBJ[key]){
          filteredOBJ[key]=OBJ[key]
          }
        }
      })
      return filteredOBJ;

}