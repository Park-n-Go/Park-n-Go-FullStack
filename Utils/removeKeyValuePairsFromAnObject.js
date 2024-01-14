export const removeKeyValuePairsFromAnObject = (OBJ, listOfKeys) => {
  if (!(OBJ || listOfKeys)) {
    return "Object and List Of Key is missing!!!";
  }
  let keys;
  if (OBJ.hasOwnProperty("_doc")) {
    keys = Object.keys(OBJ?._doc);
  } else {
    keys = Object.keys(OBJ);
  }

  listOfKeys.forEach((key) => {
    if (keys.indexOf(key) === -1) {
      return OBJ;
    }

    if (OBJ.hasOwnProperty("_doc")) {
      delete OBJ?._doc[key];
    } else {
      delete OBJ[key];
    }
  });

  return OBJ;
};
