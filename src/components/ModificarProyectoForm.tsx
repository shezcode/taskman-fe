"use client"

import { createProject } from "@/lib/fetch/createProject"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Project } from "@/lib/types"
import { useState } from "react"


const formSchema = z.object({
  Id_Proyecto: z.string(),
  Nombre: z.string(),
  Descripcion: z.string(),
  Fe_creacion: z.string(),
  Fe_actualizacion: z.string(),
  Fe_inicio: z.string(),
  Fe_fin: z.string(),
  Estado: z.enum(["EN_PROGRESO", "FINALIZADO", "PENDIENTE", "CANCELADO"]),
  Prioridad: z.enum(["BAJA", "MEDIA", "ALTA", "URGENTE"]),
  Presupuesto: z.number(),
  Id_Usuario: z.string()
});

const ModificarProyectoForm: React.FC<Project> = (data) => {

  const [formData, setFormData] = useState<Project>({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
 

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    modifyProject(values.Nombre, values.Descripcion, values.Fe_inicio, values.Fe_fin, values.Estado, values.Prioridad, values.Presupuesto, id_usuario);
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 flex flex-col justify-center">
        <div className="flex flex-col gap-8">
          <FormField
            control={form.control}
            name="Nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del proyecto</FormLabel>
                <FormControl>
                  <Input autoComplete="off" className="w-[80%]" 
                    value={formData.Nombre} 
                    onChange={(e) => { setFormData((prev) => ({ ...prev, Nombre: e.target.value })) }}
                  />
                </FormControl>
              </FormItem>
            )}
            />

          <FormField
          control={form.control}
          name="Descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea className="resize-none" placeholder="Describe el proyecto brevemente" 
                  value={formData.Descripcion} 
                  onChange={(e) => { setFormData((prev) => ({ ...prev, Descripcion: e.target.value })) }}
                />
              </FormControl>
            </FormItem>
          )}
          />


        </div>
        <Button type="submit" className="self-start">Submit</Button>
      </form>
    </Form>
  )
}

export default ModificarProyectoForm;
