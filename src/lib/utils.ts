import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPARTAMENTOS = {
  "frontend": "1FA366379D1602EEE063020011ACB300",
  "backend": "1FA51829E1CB12ECE063020011AC59E3",
  "ui": "200ED912B1011762E063020011ACA194"
}

export function getCurrentDateTimestamp() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
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


