export const removeKeyValuePairsFromAnObject = (OBJ, listOfKeys) => {
  if (!(OBJ || listOfKeys)) {
    return "Object and List Of Key is missing!!!";
  }

  listOfKeys.forEach((key) => {
    delete OBJ[key];
  });

  return OBJ;
};
