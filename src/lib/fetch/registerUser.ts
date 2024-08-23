import { redirect } from "next/navigation";
import { DEPARTAMENTOS, getCurrentDateTimestamp } from "../utils";

export type dep = "frontend" | "backend" | "ui";

export async function registerUser(nombre: string, email: string, password: string, departamento: dep) {

  let id_Dep: string;

  switch (departamento){
    case "frontend":
        id_Dep = DEPARTAMENTOS.frontend 
        break;
    case "backend":
        id_Dep = DEPARTAMENTOS.backend
        break;
    case "ui":
        id_Dep = DEPARTAMENTOS.ui
        break;
  }

  const date = getCurrentDateTimestamp(); 

  try {
    const response = await fetch('http://localhost:8888/taskMan/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre: nombre, email: email, password: password, departamento: {id_Departamento: id_Dep}, fe_alta: date}),
    });

    if (!response.ok) {
      throw new Error('Register failed');
    }

    const data = await response.json();

    return data

  } catch (e){
    console.error(e)
    redirect("/error")
  }

}

