import { Tarea } from "../types";
import { capitalizeString, capitalizeStringWithUnderscore } from "../utils";

export async function modificarTarea(tarea: Tarea) {
  const response = await fetch(`http://localhost:8888/taskMan/modifyTask?id=${tarea.Id_Tarea}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      Nombre: tarea.Nombre,
      Descripcion: tarea.Descripcion,
      Fe_limite: tarea.Fe_limite,
      Asignada_a_Id_Usuario: tarea.Asignada_a_Id_Usuario,
      Estado: tarea.Estado.replace(/ /g, '_'),
      Prioridad: tarea.Prioridad,
      Id_Tarea: tarea.Id_Tarea
    }),
  });




  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  const data = await response.json();
  return data; 
}
