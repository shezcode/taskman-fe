import { Project, Tarea } from "../types";

export async function modificarProyecto(project: Project) {
  const response = await fetch(`http://localhost:8888/taskMan/modifyProject?id=${project.Id_Proyecto}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      Nombre: project.Nombre,
      Descripcion: project.Descripcion,
      Fe_inicio: project.Fe_inicio,
      Fe_fin: project.Fe_fin,
      Estado: project.Estado.replace(/ /g, '_'),
      Prioridad: project.Prioridad,
      Presupuesto: project.Presupuesto,
      Id_Usuario: project.Id_Usuario,
      Id_Proyecto: project.Id_Proyecto
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  const data = await response.json();
  return data; 
}
