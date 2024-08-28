import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchProjects, fetchProjectsById } from "@/lib/fetch/fetchProjects";
import { fetchTareas } from "@/lib/fetch/fetchTareas";
import { capitalizeString, parseDateString } from "@/lib/utils";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { deleteTarea } from "@/lib/fetch/deleteTarea";
import { toast } from "@/components/ui/use-toast";
import { DeleteButton } from "@/components/DeleteButton";

const TareaPage = async () => {

  const data = await fetchTareas();

  const handleProject = async (id: string) => {
    const project = await fetchProjectsById(id)
    return project.Nombre;
  }

  return (
    <div className="mt-8 w-[60%] h-full flex flex-col items-center justify-center">
      <Table className="border-slate border-[1.5px] rounded">
        <TableCaption className="mt-8">Tareas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Fecha de creacion</TableHead>
              <TableHead>Fecha limite</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead className="text-right">Proyecto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tarea) => (
              <TableRow key={tarea.Id_Tarea}>
                <TableCell className="font-medium"><Link className="hover:underline" href={`/tarea/${tarea.Id_Tarea}`}>{tarea.Nombre}</Link></TableCell>
                <TableCell>{tarea.Descripcion}</TableCell>
                <TableCell>{parseDateString(tarea.Fe_creacion)}</TableCell>
                <TableCell>{parseDateString(tarea.Fe_limite)}</TableCell>
                <TableCell>{capitalizeString(tarea.estado)}</TableCell>
                <TableCell>{capitalizeString(tarea.prioridad)}</TableCell>
                <TableCell className="text-right">
                  <Link className="hover:underline" href={`/proyecto/${tarea.Id_Proyecto}`}>
                    {handleProject(tarea.Id_Proyecto)}
                  </Link>  
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant={"destructive"}>
                        <Trash2 className="size-4"/>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Estas seguro?</DialogTitle>
                        <DialogDescription>
                          Esta acción es irreversible y borrará la tarea de nuestros servidores.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild suppressHydrationWarning>
                          <DeleteButton id={tarea.Id_Tarea} />
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </div>
  );
}


export default TareaPage;

