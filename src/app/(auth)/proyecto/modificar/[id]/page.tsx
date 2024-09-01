import ModificarProyectoForm from "@/components/ModificarProyectoForm"; 
import { Separator } from "@/components/ui/separator";
import { fetchProjectsById } from "@/lib/fetch/fetchProjects";
import { fetchUsuarios } from "@/lib/fetch/fetchUsuarios";

export default async function Page({params}: {params: {id: string}} ){

  const data = await fetchProjectsById(params.id);

  return (
    <div className="mt-8 w-[50%]">
      <h1 className="hollow-text font-extrabold text-[32px]">MODIFICAR PROYECTO</h1>
      <Separator />
      <ModificarProyectoForm data={data} />
    </div>
  );
}
