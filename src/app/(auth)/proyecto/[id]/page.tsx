import { fetchProjectsById } from "@/lib/fetch/fetchProjects";
import { useParams } from "next/navigation";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoveRight } from "lucide-react";
import { capitalizeString, parseCurrency, parseDateString } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { fetchUserBy } from "@/lib/fetch/fetchUsuarios";
import Link from "next/link";
import { Router } from "next/router";
import { fetchDepById } from "@/lib/fetch/fetchDepartments";
import VolverButton from "@/components/VolverButton";

export default async function Page({ params }: { params: { id: string } }) {

  const data = await fetchProjectsById(params.id);

  const usuario = await fetchUserBy("user_id", data.Id_Usuario);

  const departamento = await fetchDepById(usuario.Id_Departamento);

  return (
    <div className="mt-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{data.Nombre}</CardTitle>
          <CardDescription>{data.Descripcion}</CardDescription>
        </CardHeader>
        <CardContent>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Fecha de inicio</h2>
              <MoveRight className="size-4" />
              <h3 className="italic">{parseDateString(data.Fe_inicio)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Fecha de entrega</h2>
              <MoveRight className="size-4" />
              <h3 className="italic">{parseDateString(data.Fe_fin)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Estado</h2>
              <MoveRight className="size-4" />
              <h3 className="font-bold">{capitalizeString(data.Estado)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Prioridad</h2>
              <MoveRight className="size-4" />
              <h3 className="font-bold">{capitalizeString(data.Prioridad)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Presupuesto</h2>
              <MoveRight className="size-4" />
              <h3 className="font-bold">{parseCurrency(data.Presupuesto.toString())}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Creado por</h2>
              <MoveRight className="size-4" />
              <h3 className="">
                <Link href={`/usuario/${usuario.Id_Usuario}`}>
                  {usuario.Email}
                </Link>
              </h3>
            </div>

            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Departamento</h2>
              <MoveRight className="size-4" />
              <h3 className="">
                <Link href={`/departamento/${departamento.Id_Departamento}`}>
                  {departamento.Nombre}
                </Link>
              </h3>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-between">
          <VolverButton />
          <Button>
            <Link href={`/proyecto/modificar/${data.Id_Proyecto}`}>
              Modificar proyecto
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

