"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { fetchTareaById } from "@/lib/fetch/fetchTareas";
import { Tarea } from "@/lib/types";
import { useEffect, useState } from "react";


export default async function Page({params}: {params: {id: string}} ){

  const getData = async () => {
    const res = await fetchTareaById(params.id)
    if (res) {
      return res;
    }
  }

  useEffect(() => {
    const data = getData();
    setTarea(data);
  }, [getData])

  const [tarea, setTarea] = useState<Tarea>()

  return (
    <div>
      <h1 className="hollow-text text-[32px]">MODIFICAR TAREA</h1>
      <Separator />
    </div>
  );
}

{/*
  Id_Tarea: string,
  Nombre: string,
  Descripcion: string,
  Asignada_a_Id_Usuario: string,
  Fe_creacion: string,
  Fe_limite: string,
  estado: string,
  prioridad: string,
*/}

