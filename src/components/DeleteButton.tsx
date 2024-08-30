"use client";

import { deleteTarea } from "@/lib/fetch/deleteTarea";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({id}) => {

  const router = useRouter();
  const handleDelete = async (id_tarea: string) => {
    const res = await deleteTarea(id_tarea);
    if (!res.error){
      toast({
        title: `${res.message}`
      })
      router.refresh()
    }
  }


  return (
    <Button onClick={() => handleDelete(id)}>Borrar tarea</Button>
  );
}
