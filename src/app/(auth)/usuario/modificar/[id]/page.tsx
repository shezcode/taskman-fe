import ModificarTareaForm from "@/components/ModificarTareaForm";
import ModificarUsuarioForm from "@/components/ModificarUsuarioForm";
import { Separator } from "@/components/ui/separator";
import { fetchDepartments } from "@/lib/fetch/fetchDepartments";
import { fetchProjects } from "@/lib/fetch/fetchProjects";
import { fetchTareaById } from "@/lib/fetch/fetchTareas";
import { fetchUserBy, fetchUsuarios } from "@/lib/fetch/fetchUsuarios";


export default async function Page({params}: {params: {id: string}} ){

  const data = await fetchUserBy("user_id", params.id); 
  const deps = await fetchDepartments();

  return (
    <div className="w-[50%] mt-8">
      <h1 className="hollow-text text-[32px]">MODIFICAR USUARIO</h1>
      <Separator />
      <ModificarUsuarioForm data={data} deps={deps}/>
    </div>
  );
}

