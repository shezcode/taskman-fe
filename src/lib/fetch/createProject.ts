import { Estado, Prioridad } from "../enums";

export async function createProject(nombre: string, descripcion: string,
                                    fe_inicio: Date, fe_fin: Date, estado: Estado, prioridad: Prioridad, presupuesto: number, id_usuario: string) {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/createProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        Nombre: nombre, 
        Descripcion: descripcion,
        Fe_inicio: fe_inicio,
        Fe_fin: fe_fin,
        Estado: estado,
        Prioridad: prioridad,
        Presupuesto: presupuesto,
        Id_Usuario: id_usuario
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
