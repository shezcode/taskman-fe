"use client";

import { deleteTarea } from "@/lib/fetch/deleteTarea";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/lib/fetch/deleteProject";

interface DeleteButtonProps {
  id: string;
}

export const DeleteProjectButton: React.FC<DeleteButtonProps> = ({id}) => {

  const router = useRouter();
  const handleDelete = async (id_tarea: string) => {
    const res = await deleteProject(id_tarea);
    if (!res.error){
      toast({
        title: `${res.message}`
      })
      router.refresh()
    } else {
      toast({
        title: `${res.error}`,
        description: "Refrescando la pagina..."
      })
      router.refresh();
    }
  }


  return (
    <Button onClick={() => handleDelete(id)}>Borrar proyecto</Button>
  );
}
