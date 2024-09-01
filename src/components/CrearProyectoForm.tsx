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
import { fetchMultipleUsersBy, fetchUserBy } from "@/lib/fetch/fetchUsuarios";
import { createTarea } from "@/lib/fetch/createTarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn, getCurrentDateTimestamp, parseDatePicker, parseDateString } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { createProject } from "@/lib/fetch/createProject";
import CancelButton from "./CancelButton";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "./useAuth";

interface crearProyectoProps {
  users: Usuario[]
}

const CrearProyectoForm: React.FC<crearProyectoProps> = ({ users }) => {

  const { getItem } = useLocalStorage();

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userData = getItem("user");
    let finalUser: {email: string};
    if (userData){
      finalUser = JSON.parse(userData); 
      setUserEmail(finalUser.email);
    }
  }, [getItem])



  const [startDate, setStartDate] = useState<Date>(new Date(getCurrentDateTimestamp()));
  const [endDate, setEndDate ] = useState<Date>();
  const [project, setProject] = useState<Project>({
    Nombre: "",
    Id_Proyecto: "",
    Descripcion: "",
    Fe_creacion: "",
    Fe_actualizacion: "",
    Fe_inicio: "",
    Fe_fin: "",
    Estado: "Pendiente",
    Prioridad: "Media",
    Presupuesto: 1000,
    Id_Usuario: users[0].Id_Usuario
  })

  const getUserId = async () => {
    const id = await fetchUserBy("email", userEmail);
    setProject((prev) => ({...prev, Id_Usuario: id.Id_Usuario}))
  }

  const handleSelectEstado = (value: Estado) => {
    setProject((prev) => ({...prev, Estado: value}))
  }

  const handleSelectPrioridad = (value: Prioridad) => {
    setProject((prev) => ({...prev, Prioridad: value}))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await getUserId();

    const res = await createProject(project.Nombre, project.Descripcion, parseDatePicker(startDate), parseDatePicker(endDate), project.Estado, project.Prioridad, parseInt(project.Presupuesto), project.Id_Usuario);

    if (!res.error){
      toast({
        title: `${res.message}`
      })
      setTimeout(() => {
        window.location.href="/proyecto"
      }, 2000)
    } else {
      toast({
        title: `${res.error}`,
      })
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
          value={project.Nombre}
          onChange={(e) => { setProject((prev: any) => ({ ...prev, Nombre: e.target.value })) }}
        />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripcion</Label>  
        <Textarea name="descripcion" id="descripcion" required autoComplete="off"
          value={project.Descripcion}
          onChange={(e) => { setProject((prev: any) => ({ ...prev, Descripcion: e.target.value })); }}
        />
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col w-[40%] gap-2">
          <Label htmlFor="estado">Estado del proyecto</Label>  
           <Select 
              name="estado"
              value={project.Estado}
              onValueChange={handleSelectEstado}
              required
            >
              <SelectTrigger 
                className="w-full" 
              >
                <SelectValue placeholder={project.Estado} defaultValue={project.Estado} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ESTADO</SelectLabel>
                  <SelectItem value={"En_progreso"}>En progreso</SelectItem>
                  <SelectItem value={"Pendiente"}>Pendiente</SelectItem>
                  <SelectItem value={"Cancelado"}>Cancelado</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

        </div>
        <div className="flex flex-col w-[40%] gap-2">
          <Label htmlFor="Prioridad">Prioridad del proyecto</Label>  
           <Select 
              name="Prioridad"
              value={project.Prioridad}
              onValueChange={handleSelectPrioridad}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={project.Prioridad} defaultValue={project.Prioridad} />
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

      <div className="flex flex-row w-full items-center justify-between">
        <Popover>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="date" className="mb-0">Selecciona fecha de inicio</Label>
            <PopoverTrigger asChild name="date" id="date">
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Elige una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                required
                onSelect={setStartDate} 
                initialFocus
                disabled={(date) =>
                  date < new Date() || date > new Date("2050-01-01")
                }
              />
            </PopoverContent>

          </div> 
        </Popover>

        <Popover>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="date" className="mb-0 self-end">Selecciona fecha limite</Label>
            <PopoverTrigger asChild name="date" id="date">
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Elige una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                required
                onSelect={setEndDate} 
                initialFocus
                disabled={(date) =>
                  date < startDate || date > new Date("2050-01-01")
                }
              />
            </PopoverContent>
          </div>
        </Popover>
      </div>
      <div className="w-[30%]">
        <Label htmlFor="presupuesto">Presupuesto</Label>
        <Input 
          type="number" name="presupuesto" min="1000" max="99999999"
          value={project.Presupuesto}
          onChange={(e) => { setProject((prev: any) => ({ ...prev, Presupuesto: parseInt(e.target.value )})) }}
        />
      </div>
      <div className="flex flex-row gap-8">
        <CancelButton /> 
        <Button type="submit">Crear</Button>
      </div>
    </form>

  );
}

export default CrearProyectoForm;

