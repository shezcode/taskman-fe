import ModificarTareaForm from "@/components/ModificarTareaForm";
import { Separator } from "@/components/ui/separator";
import { fetchProjects } from "@/lib/fetch/fetchProjects";
import { fetchTareaById } from "@/lib/fetch/fetchTareas";
import { fetchUsuarios } from "@/lib/fetch/fetchUsuarios";


export default async function Page({params}: {params: {id: string}} ){

  const data = await fetchTareaById(params.id); 

  const users = await fetchUsuarios();

  const projects = await fetchProjects();

  return (
    <div className="w-[50%] mt-8">
      <h1 className="hollow-text text-[32px]">MODIFICAR TAREA</h1>
      <Separator />
      <ModificarTareaForm data={data} projects={projects} users={users} />
    </div>
  );
}

{/*
  Id_Tarea: string,
  Nombre: string,
  Descripcion: string,
  Asignada_a_Id_Usuario: string,
  Fe_creacion: string,
  Fe_limite: string,
  estado: string,
  prioridad: string,
*/}

