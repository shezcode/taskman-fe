import { DEPARTAMENTOS, getCurrentDateTimestamp } from "../utils";

export type dep = "frontend" | "backend" | "ui" | "hr";

export async function registerUser(nombre: string, email: string, password: string, departamento: dep) {

  let id_Dep: string;

  switch (departamento){
    case "frontend":
        id_Dep = DEPARTAMENTOS.Frontend;
        break;
    case "backend":
        id_Dep = DEPARTAMENTOS.Backend;
        break;
    case "ui":
        id_Dep = DEPARTAMENTOS.UI
        break;
    case "hr": 
        id_Dep = DEPARTAMENTOS.HR;
        break;
  }

  try {
    const response = await fetch('http://localhost:8888/taskMan/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Nombre: nombre, Email: email, Password: password, Id_Departamento: id_Dep }),
    });

    if (response.status === 409){
      const errorData = await response.json();
      console.error(errorData.error);
      return errorData;
    }


    if (!response.ok) {
      throw new Error('Register failed');
    }

    const data = await response.json();

    return data; 

  } catch (e){
    console.error(e)
  }

}

