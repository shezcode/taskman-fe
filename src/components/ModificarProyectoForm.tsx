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
import CancelButton from "./CancelButton";
import { modificarProyecto } from "@/lib/fetch/modificarProyecto";
import { useLocalStorage } from "./useLocalStorage";
import { useAuth } from "./useAuth";



interface ModificarProyectoFormProps {
  data: Project;  
}

const ModificarProyectoForm: React.FC<ModificarProyectoFormProps> = ({ data }) => {

  const { getItem } = useLocalStorage();


  const {realUser} = useAuth();

  const [project, setProject] = useState<Project>({
    Id_Proyecto: data.Id_Proyecto,
    Nombre: data.Nombre,
    Descripcion: data.Descripcion,
    Fe_creacion: data.Fe_creacion,
    Fe_actualizacion: data.Fe_actualizacion,
    Fe_inicio: data.Fe_inicio,
    Fe_fin: data.Fe_fin,
    Estado: data.Estado,
    Prioridad: data.Prioridad,
    Presupuesto: data.Presupuesto,
    Id_Usuario: data.Id_Usuario
  })


  const [startDate, setStartDate] = useState<Date>(new Date(data.Fe_inicio));
  const [endDate, setEndDate ] = useState<Date>(new Date(data.Fe_fin));

  const handleSelectEstado = (value: Estado) => {
    setProject((prev) => ({...prev, Estado: value}))
  }

  const handleSelectPrioridad = (value: Prioridad) => {
    setProject((prev) => ({...prev, Prioridad: value}))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = await fetchUserBy("email", realUser);

    setProject((prev) => ({...prev, Id_Usuario: userData.Id_Usuario}))

    const res = await modificarProyecto(project);

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
              defaultValue={project.Estado}
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
                  <SelectItem value={"Finalizado"}>Finalizado</SelectItem>
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
            <Label htmlFor="startdate" className="mb-0">Selecciona fecha de inicio</Label>
            <PopoverTrigger asChild name="startdate" id="startdate">
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
                disabled={(startDate) =>
                  startDate < new Date(getCurrentDateTimestamp()) || startDate > new Date("2050-01-01")
                }
              />
            </PopoverContent>

          </div> 
        </Popover>

        <Popover>
          <div className="flex flex-col gap-4 items-start">
            <Label htmlFor="enddate" className="mb-0 self-end">Selecciona fecha limite</Label>
            <PopoverTrigger asChild>
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
                disabled={(endDate) => endDate < startDate || endDate > new Date("2050-01-01")}
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
        <Button type="submit">Modificar</Button>
      </div>
    </form>

  );
}

export default ModificarProyectoForm;
