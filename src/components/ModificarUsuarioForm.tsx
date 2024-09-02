"use client"
import { Departamento, Project, Tarea, Usuario } from "@/lib/types"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import CancelButton from "./CancelButton";
import { modificarUsuario } from "@/lib/fetch/modificarUsuario";

interface ModificarUsuarioProps {
  data: Usuario, 
  deps: Departamento[]
}

const ModificarUsuarioForm: React.FC<ModificarUsuarioProps> = ({ data, deps }) => {

  const [usuario, setUsuario] = useState<Usuario>({
    Id_Usuario: data.Id_Usuario,
    Nombre: data.Nombre,
    Email: data.Email,
    Password: data.Password,
    Fe_alta: data.Fe_alta,
    Id_Departamento: data.Id_Departamento
  })
  const handleSelectIdDepartamento = (value: string) => {
    setUsuario((prev) => ({...prev, Id_Departamento: value}))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await modificarUsuario(usuario);

    if (!res.error){
      toast({
        title: `${res.message}`
      })
      setTimeout(() => {
        window.location.href="/usuario"
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
          value={usuario.Nombre}
          onChange={(e) => { setUsuario((prev: any) => ({ ...prev, Nombre: e.target.value })) }}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="email">Email</Label>  
        <Input name="email" id="email" required autoComplete="off"
          value={usuario.Email}
          onChange={(e) => { setUsuario((prev: any) => ({ ...prev, Email: e.target.value })) }}
        />
      </div>

      <div>
        <Label htmlFor="dep">Departamento:</Label>  
         <Select 
            name="dep"
            value={usuario.Id_Departamento}
            required
            onValueChange={handleSelectIdDepartamento}
          >
            <SelectTrigger className="w-[50%]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                {deps && (
                  deps.map(dep => {
                    return (
                      <SelectItem 
                        className="w-full"
                        key={dep.Id_Departamento} value={dep.Id_Departamento}>{dep.Nombre}</SelectItem>
                    )
                  })
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
      </div>
  
      <div className="flex flex-row gap-8">
        <CancelButton />
        <Button type="submit">Modificar</Button>
      </div>
    </form>

  );
}

export default ModificarUsuarioForm;
