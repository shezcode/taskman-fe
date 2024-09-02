import { Usuario } from "../types";
import { capitalizeString, capitalizeStringWithUnderscore } from "../utils";

export async function modificarUsuario(usuario: Usuario) {
  const response = await fetch(`http://localhost:8888/taskMan/modifyUser?id=${usuario.Id_Usuario}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      Nombre: usuario.Nombre,
      Email: usuario.Email,
      Id_Usuario: usuario.Id_Usuario,
      Id_Departamento: usuario.Id_Departamento
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  const data = await response.json();
  return data; 
}
