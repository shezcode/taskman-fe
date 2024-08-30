import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPARTAMENTOS = {
  "Frontend": "1FA366379D1602EEE063020011ACB300",
  "Backend": "1FA51829E1CB12ECE063020011AC59E3",
  "UI": "200ED912B1011762E063020011ACA194",
  "HR": "20912F05A40B0A51E063020011AC2622"
}

export function getKeyByValue(value: string) {
  return Object.keys(DEPARTAMENTOS).find(key => DEPARTAMENTOS[key] === value);
}

export function getCurrentDateTimestamp() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function parseCurrency(value: string){
      const amount = parseFloat(value)
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
      return formatted;
}

export function parseDatePicker(date: Date){

  const year = date.getFullYear(); // Get the year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-indexed, so +1) and pad with zero if necessary
  const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with zero if necessary

  return `${year}-${month}-${day}`; // Return formatted string
}



export function parseDateString(dateString: string) {
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  
  const [year, month, day] = dateString.split('-');
  
  const dayFormatted = parseInt(day, 10);  // Remove leading zeros from the day
  const monthFormatted = months[parseInt(month, 10) - 1];  // Get the month abbreviation
  const yearFormatted = year.slice(-2);  // Get the last two digits of the year
  
  return `${dayFormatted} ${monthFormatted} ${yearFormatted}`;
}


export function capitalizeString(str: string): string {
  if (str.length === 0) return str;

  // Replace underscores with spaces
  const replacedStr = str.replace(/_/g, ' ');

  // Convert the entire string to lowercase
  const lowerStr = replacedStr.toLocaleLowerCase();

  // Capitalize the first letter and combine with the rest of the string
  const capitalizedStr = lowerStr.charAt(0).toLocaleUpperCase() + lowerStr.slice(1);

  return capitalizedStr;
}

export function capitalizeStringWithUnderscore(str: string): string {
  if (str.length === 0) return str;

  // Convert the entire string to lowercase
  const lowerStr = str.toLocaleLowerCase();

  // Capitalize the first letter and combine with the rest of the string
  const capitalizedStr = lowerStr.charAt(0).toLocaleUpperCase() + lowerStr.slice(1);

  return capitalizedStr;
}

