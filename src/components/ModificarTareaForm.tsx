"use client"
import { Tarea } from "@/lib/types"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";

const ModificarTareaForm: React.FC<Tarea> = (data) => {

  const [tarea, setTarea] = useState<Tarea>({
    Id_Tarea: data.Id_Tarea,
    Nombre: data.Nombre,
    Id_Proyecto: data.Id_Proyecto,
    Descripcion: data.Descripcion,
    Fe_creacion: data.Fe_creacion,
    Fe_limite: data.Fe_limite,
    Asignada_a_Id_Usuario: data.Asignada_a_Id_Usuario,
    estado: data.estado,
    prioridad: data.prioridad
    })

  return (
  <form method="POST">
      <div>
        <Label htmlFor=""></Label>  
        <Input name="nombre" id="nombre" required autoComplete="off"
          value={data.Nombre}
          onChange={(e) => { setTarea((prev: any) => ({ ...prev, Nombre: e.target.value })) }}
        />
      </div>

    </form>

  );
  }
