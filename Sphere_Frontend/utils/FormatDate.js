export function formatDate(dateString) {
  const date = new Date(dateString);

  // Array de nombres de los meses
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  // Obtener el mes y el año
  const month = months[date.getUTCMonth()]; // getUTCMonth() devuelve el mes de 0 a 11
  const year = date.getUTCFullYear();

  // Formatear la cadena de salida
  return `Se unió en ${month} del ${year}`;
}
