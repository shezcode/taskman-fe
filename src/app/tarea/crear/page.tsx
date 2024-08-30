import CrearTareaForm from "@/components/CrearTareaForm";
import { Separator } from "@/components/ui/separator";
import { fetchProjects } from "@/lib/fetch/fetchProjects";
import { fetchUsuarios } from "@/lib/fetch/fetchUsuarios";


export default async function Page(){

  const projects = await fetchProjects();

  const users = await fetchUsuarios();

  return (
    <div className="w-[50%] mt-8">
      <h1 className="hollow-text text-[32px]">CREAR TAREA</h1>
      <Separator />
      <CrearTareaForm projects={projects} users={users}/>
    </div>
  );
}


