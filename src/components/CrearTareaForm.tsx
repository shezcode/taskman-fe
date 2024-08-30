"use client"

import { format } from "date-fns"
import { Project, Tarea, Usuario } from "@/lib/types"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Estado, Prioridad } from "@/lib/enums";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { modificarTarea } from "@/lib/fetch/modificarTarea";
import { toast } from "./ui/use-toast";
import { CalendarIcon, Search, X } from "lucide-react";
import { fetchMultipleUsersBy } from "@/lib/fetch/fetchUsuarios";
import { createTarea } from "@/lib/fetch/createTarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn, getCurrentDateTimestamp, parseDatePicker, parseDateString } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

interface crearTareaProps {
  projects: Project[],
  users: Usuario[]
}

const CrearTareaForm: React.FC<crearTareaProps> = ({projects, users}) => {


  const [date, setDate] = useState<Date>();
  const [tarea, setTarea] = useState<Tarea>({
    Id_Tarea: "",
    Nombre: "",
    Id_Proyecto: "",
    Descripcion: "",
    Fe_creacion: "",
    Fe_limite: "",
    Asignada_a_Id_Usuario: "",
    Estado: "Pendiente",
    Prioridad: "Media"
  })

  const [userData, setUserData] = useState<Usuario[]>(users);
  const [searchParam, setSearchParam] = useState<string>("");

  const handleSearch = async () => {
    if (searchParam !== ""){
      let newUsers = await fetchMultipleUsersBy("name", searchParam);
      setUserData(newUsers);
    } else {
      setUserData(users);
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  }

  const handleCancel = () => {
    setSearchParam("");
    setUserData(users);
  }

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const router = useRouter();

  const handleSelectUser = (value: string) => {
    setTarea((prev) => ({ ...prev, Asignada_a_Id_Usuario: value }))
  }

  const handleSelectEstado = (value: Estado) => {
    setTarea((prev) => ({...prev, Estado: value}))
  }

  const handleSelectPrioridad = (value: Prioridad) => {
    setTarea((prev) => ({...prev, Prioridad: value}))
  }

  const handleSelectIdProyecto = (value: string) => {
    setTarea((prev) => ({...prev, Id_Proyecto: value}))
  }

  const handleRefresh = () => {
    router.refresh();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date){
      const res = await createTarea(tarea.Nombre, tarea.Descripcion, tarea.Asignada_a_Id_Usuario, parseDatePicker(date), tarea.Estado, tarea.Prioridad, tarea.Id_Proyecto);
    
      if (!res.error){
        toast({
          title: `${res.message}`
        })
        setTimeout(() => {
          window.location.href="/tarea"
        }, 2000)
      } else {
        toast({
          title: `${res.error}`,
        })
      }
    }

  }


  return (
  <form 
    method="POST"
    onSubmit={handleSubmit}
    className="w-full flex flex-col gap-8"
  >
      <div className="mt-4">
        <Label htmlFor="nombre">Nombre</Label>  
        <Input name="nombre" id="nombre" required autoComplete="off"
          value={tarea.Nombre}
          onChange={(e) => { setTarea((prev: any) => ({ ...prev, Nombre: e.target.value })) }}
        />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripcion</Label>  
        <Textarea name="descripcion" id="descripcion" required autoComplete="off"
          value={tarea.Descripcion}
          onChange={(e) => { setTarea((prev: any) => ({ ...prev, Descripcion: e.target.value })); }}
        />
      </div>

      <div>
        <Label htmlFor="usuario">Usuario asignado</Label>  
         <Select 
            name="usuario"
            value={tarea.Asignada_a_Id_Usuario}
            onValueChange={handleSelectUser}
          >
            <SelectTrigger className="w-[50%]">
              <SelectValue placeholder="Usuario asignado" />
            </SelectTrigger>
            <SelectContent>

              <div className="relative w-full">
                {searchParam && (
                  <Button variant={"ghost"} onClick={handleCancel} className="absolute top-0 left-0 w-12">
                    <X className="w-full"/>
                  </Button>
                )}
                <Input className="w-80 px-12" aria-label="Search" value={searchParam} onChange={handleChange} onKeyDown={handleEnter}/>
                <Button  onClick={handleSearch} variant={"ghost"} className="absolute top-0 right-0">
                  <Search />
                </Button>
              </div>

              <SelectGroup>

                <SelectLabel></SelectLabel>
                {userData && (
                  userData.map(user => {
                    return (
                      <SelectItem 
                        className="w-full"
                        key={user.Id_Usuario} value={user.Id_Usuario}>{user.Nombre}</SelectItem>
                    )
                  })
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col w-[40%] gap-2">
          <Label htmlFor="estado">Estado de la tarea</Label>  
           <Select 
              name="estado"
              value={tarea.Estado}
              onValueChange={handleSelectEstado}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={tarea.Estado} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ESTADO</SelectLabel>
                  <SelectItem value={"En_progreso"}>En progreso</SelectItem>
                  <SelectItem value={"Finalizado"}>Finalizado</SelectItem>
                  <SelectItem value={"Pendiente"}>Pendiente</SelectItem>
                  <SelectItem value={"Cancelado"}>Cancelado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

        </div>
        <div className="flex flex-col w-[40%] gap-2">
          <Label htmlFor="Prioridad">Prioridad de la tarea</Label>  
           <Select 
              name="Prioridad"
              value={tarea.Prioridad}
              onValueChange={handleSelectPrioridad}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={tarea.Prioridad}/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>PRIORIDAD</SelectLabel>
                  <SelectItem value={"Baja"}>Baja</SelectItem>
                  <SelectItem value={"Media"}>Media</SelectItem>
                  <SelectItem value={"Alta"}>Alta</SelectItem>
                  <SelectItem value={"Urgente"}>Urgente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
      </div>


      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            required
            onSelect={setDate} 
            initialFocus
            disabled={(date) =>
              date < new Date() || date > new Date("2050-01-01")
            }
          />
        </PopoverContent>
      </Popover>

      <div className="flex flex-col w-[50%] gap-2">
        <Label htmlFor="proyecto">Proyecto asignado</Label>  
         <Select 
            name="Proyecto"
            value={tarea.Id_Proyecto}
            onValueChange={handleSelectIdProyecto}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el proyecto"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Proyecto</SelectLabel>

                {projects && (
                  projects.map(project => {
                    return (
                      <SelectItem 
                        className="w-full"
                        key={project.Id_Proyecto} value={project.Id_Proyecto}>{project.Nombre}</SelectItem>
                    )
                  })
                )}



              </SelectGroup>
            </SelectContent>
          </Select>
      </div>
   
      <div className="flex flex-row gap-8">
        <Button onClick={handleRefresh}>Cancelar</Button>
        <Button type="submit">Crear</Button>
      </div>
    </form>

  );
}

export default CrearTareaForm;
