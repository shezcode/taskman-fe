"use client";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchProjects, fetchProjectsById } from "@/lib/fetch/fetchProjects";
import { fetchTareas, fetchTareasBy } from "@/lib/fetch/fetchTareas";
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
import { Search, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { DeleteButton } from "@/components/DeleteButton";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Tarea, Project } from "@/lib/types";

const TareaPage = () => {

  const [data, setData] = useState<Tarea[] | null>(null);
  const [searchParam, setSearchParam] = useState<string>("");
  const [nombreClicked, setNombreClicked] = useState(false);
  const [proyectoClicked, setProyectoClicked] = useState(false);

  const getData = async () => {
    const res = await fetchTareas();
    setData(res);
  }

  const [projectNames, setProjectNames] = useState<{ [key: string]: string }>({}); // State to store project names by task ID

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const fetchProjectNames = async () => {
      // Iterate over the tasks and fetch project names for each
      if (data){
        for (const tarea of data) {
          if (!projectNames[tarea.Id_Proyecto]) { // Avoid refetching if already fetched
            try {
              const project = await fetchProjectsById(tarea.Id_Proyecto);
              setProjectNames(prev => ({ ...prev, [tarea.Id_Proyecto]: project.Nombre }));
            } catch (error) {
              console.error(`Error fetching project for tarea ${tarea.Id_Proyecto}:`, error);
            }
          }
        }
      }
    };

    if (data) {
      fetchProjectNames();
    }
  }, [data, projectNames]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchParam === ""){
      getData();
    } else {
      if (nombreClicked || (!nombreClicked && !proyectoClicked)){
        let newData = await fetchTareasBy("name", searchParam);
        setData(newData);
      }

      if (proyectoClicked){
        let newData = await fetchTareasBy("proyecto", searchParam);
        setData(newData);
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
    if(searchParam === ""){
      getData();
    }
  }

  const handleCancel = () => {
    setSearchParam("");
    getData();
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as unknown as FormEvent<HTMLFormElement>);
    }
  };
  return (
    <div className="mt-8 w-[80%] p-4 border-[1.5px] border-slate rounded-xl min-h-[700px] h-full flex flex-col items-center">
      <h1 className="hollow-text text-[40px] self-start mt-8">TAREAS</h1>
      <Separator />
      <form 
        onSubmit={handleSearch}
        className="flex flex-col gap-4 self-start mb-8"
        action="">
        <Label htmlFor="search">Filtrar por:</Label>
        <div>
          <Button 
            onClick={() => {setNombreClicked((prev) => !prev); setProyectoClicked(false)}}
            className={nombreClicked ? `rounded-r-none bg-green-400 hover:bg-green-400` : "rounded-r-none"}
          >Nombre</Button>

          <Button 
            onClick={() => {setProyectoClicked((prev) => !prev); setNombreClicked(false)}}
            className={proyectoClicked ? `rounded-l-none bg-green-400 hover:bg-green-400` : "rounded-l-none"}
          >Proyecto</Button>
        </div>
        <div className="w-full relative">
          {searchParam && (
            <Button variant={"ghost"} onClick={handleCancel} className="absolute top-0 left-0 w-12">
              <X className="w-full"/>
            </Button>
          )}
          <div className="flex items-center">
            <Input className="w-80 px-12" placeholder="Buscar..." name="search" aria-label="Search" value={searchParam} onChange={handleChange} onKeyDown={handleEnter} />
            <Button type="submit" variant={"ghost"} className="absolute top-0 right-0">
              <Search />
            </Button>
          </div>
        </div>
      </form>
      <Table className="border-slate border-[1.5px] rounded">
          <TableHeader>
            <TableRow>
              <TableHead className="">Nombre</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead>Fecha de creacion</TableHead>
              <TableHead>Fecha limite</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead className="text-right">Proyecto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.map((tarea) => (
              <TableRow key={tarea.Id_Tarea}>
                <TableCell className="font-large w-[20%]"><Link className="hover:underline" href={`/tarea/${tarea.Id_Tarea}`}>{tarea.Nombre}</Link></TableCell>
                <TableCell>{tarea.Descripcion}</TableCell>
                <TableCell>{parseDateString(tarea.Fe_creacion)}</TableCell>
                <TableCell>{parseDateString(tarea.Fe_limite)}</TableCell>
                <TableCell>{tarea.Estado}</TableCell>
                <TableCell>{tarea.Prioridad}</TableCell>
                <TableCell className="text-right">
                  <Link className="hover:underline" href={`/proyecto/${tarea.Id_Proyecto}`}>
                    {projectNames[tarea.Id_Proyecto]}
                  </Link>  
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
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
                        <DialogClose asChild>
                          <DeleteButton id={tarea.Id_Tarea} />
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Link href={`/tarea/modificar/${tarea.Id_Tarea}`}>
                    <Button>Modificar</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      <Link href={"/tarea/crear"} className="self-start my-8">
        <Button>Crear nueva tarea</Button>
      </Link>
    </div>
  );
}


export default TareaPage;

