export function compararObjetos(obj1, obj2) {
  // Verificamos si ambos son objetos
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return obj1 === obj2; // Si no son objetos, comparamos por igualdad simple
  }

  // Verificamos si tienen el mismo número de propiedades
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iteramos sobre las propiedades y comparamos los valores
  for (const key of keys1) {
    if (!compararObjetos(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
