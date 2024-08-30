import { Estado, Prioridad } from "../enums";

export async function createTarea(nombre: string, descripcion: string, id_usuario: string, fe_limite: string, estado: Estado, prioridad: Prioridad, id_proyecto: string) {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        Nombre: nombre, 
        Descripcion: descripcion,
        Asignada_a_Id_Usuario: id_usuario,
        Fe_limite: fe_limite,
        Estado: estado,
        Prioridad: prioridad,
        Id_Proyecto: id_proyecto,
      })
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data = await res.json();

    return data;

  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}
