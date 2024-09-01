import CrearProyectoForm from "@/components/CrearProyectoForm";
import { fetchUserBy, fetchUsuarios } from "@/lib/fetch/fetchUsuarios";

export default async function CrearProyectoPage(){
  
  const users = await fetchUsuarios();

  return (
    <div className="mt-12 w-[50%] border-[1.5px] border-slate p-6 rounded-lg">
      <h1 className="hollow-text font-extrabold text-[32px] self-start">CREAR PROYECTO</h1>
      <CrearProyectoForm users={users}/>
    </div>
  );
}
