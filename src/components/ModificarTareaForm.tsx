"use client"
import { Tarea, Usuario } from "@/lib/types"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Estado, Prioridad } from "@/lib/enums";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { modificarTarea } from "@/lib/fetch/modificarTarea";
import { toast } from "./ui/use-toast";

interface ModificarTareaFormProps {
  data: Tarea;  
  users: Usuario[]; 
}

const ModificarTareaForm: React.FC<ModificarTareaFormProps> = ({ data, users }) => {

  const [tarea, setTarea] = useState<Tarea>({
    Id_Tarea: data.Id_Tarea,
    Nombre: data.Nombre,
    Id_Proyecto: data.Id_Proyecto,
    Descripcion: data.Descripcion,
    Fe_creacion: data.Fe_creacion,
    Fe_limite: data.Fe_limite,
    Asignada_a_Id_Usuario: data.Asignada_a_Id_Usuario,
    Estado: data.Estado,
    Prioridad: data.Prioridad
    })

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

  const handleRefresh = () => {
    router.refresh();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await modificarTarea(tarea);
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
              <SelectGroup>
                <SelectLabel></SelectLabel>
                {users && (
                  users.map(user => {
                    return (
                      <SelectItem 
                        className="w-full"
                        key={user.Id_Usuario} value={user.Id_Usuario}>{user.Email}</SelectItem>
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
      <div className="flex flex-row gap-8">
        <Button onClick={handleRefresh}>Cancelar</Button>
        <Button type="submit">Modificar</Button>
      </div>
    </form>

  );
}

export default ModificarTareaForm;
