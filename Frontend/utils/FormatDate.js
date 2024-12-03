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

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Obtener el mes y el año
  const month = months[date.getUTCMonth()]; // getUTCMonth() devuelve el mes de 0 a 11
  const year = date.getUTCFullYear();

  // Formatear la cadena de salida
  return `Se unió en ${month} del ${year}`;
}

export function timeElapsed(dateString) {
  const date = new Date(dateString); // Convertir la cadena de fecha a un objeto Date
  const now = new Date(); // Obtener la fecha actual

  let diffMs = now - date; // Calcular la diferencia en milisegundos

  // Definir los valores en milisegundos para unidades de tiempo
  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;
  const msInYear = msInDay * 365.25;

  // Si la diferencia es mayor a un año, retornar la fecha en formato dd/mm/aa
  if (diffMs >= msInYear) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }

  // Si la diferencia es mayor a una semana y menor a un año, retornar en formato "6 de agosto"
  if (diffMs >= msInWeek) {
    const day = date.getDate();

    const month = months[date.getMonth()];
    return `${day} de ${month}`;
  }

  // Si la diferencia es mayor o igual a un día, retornar el número de días
  if (diffMs >= msInDay) {
    const days = Math.floor(diffMs / msInDay);
    return days === 1 ? `hace ${days} día` : `hace ${days} días`;
  }

  // Si la diferencia es mayor o igual a una hora, retornar el número de horas
  if (diffMs >= msInHour) {
    const hours = Math.floor(diffMs / msInHour);
    return hours === 1 ? `hace ${hours} hora` : `hace ${hours} horas`;
  }

  // Si la diferencia es mayor o igual a un minuto, retornar el número de minutos
  if (diffMs >= msInMinute) {
    const minutes = Math.floor(diffMs / msInMinute);
    return minutes === 1 ? `hace ${minutes} minuto` : `hace ${minutes} minutos`;
  }

  // Retornar el número de segundos, por defecto si es menos de un minuto
  const seconds = Math.floor(diffMs / msInSecond);
  return seconds === 1 ? `hace ${seconds} segundo` : `hace ${seconds} segundos`;
}

export function formatDMY(dateString) {
  const date = new Date(dateString);

  // Get the date parts in numerical format
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  // Pad single digits with zeros
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Return the formatted date as a string
  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function formatYMD(dateString) {
  const date = new Date(dateString);

  // Get the date parts in numerical format
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  // Pad single digits with zeros
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Return the formatted date as a string
  return `${year}-${formattedMonth}-${formattedDay}`;
}
