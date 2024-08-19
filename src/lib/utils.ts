import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPARTAMENTOS = {
  "frontend": "1fa36637-9d16-02ee-e063-020011acb300",
  "backend": "1fa51829-e1cb-12ec-e063-020011ac59e3",
  "ui": "200ed912-b101-1762-e063-020011aca194"
}

export function getCurrentDateTimestamp() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
