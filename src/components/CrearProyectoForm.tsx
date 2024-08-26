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

const formSchema = z.object({
  Nombre: z.string().min(2).max(50),
  Descripcion: z.string().min(2).max(50),
  Fe_inicio: z.string().date(),
  Fe_fin: z.string().date(),
  Estado: z.enum(["En progreso", "Finalizado", "Pendiente", "Cancelado"]),
  Prioridad: z.enum(["Baja", "Media", "Alta", "Urgente"]),
  Presupuesto: z.number()
})


const CrearProyectoForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createProject(values.Nombre, values.Descripcion, values.Fe_inicio, values.Fe_fin, values.Estado, values.Prioridad, values.Presupuesto, id_usuario);
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
                  <Input autoComplete="off" placeholder="Nombre" className="w-[50%]" {...field} />
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
                <Textarea className="resize-none" placeholder="Describe el proyecto brevemente" {...field} />
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

export default CrearProyectoForm;
