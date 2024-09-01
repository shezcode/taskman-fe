import { fetchProjectsById } from "@/lib/fetch/fetchProjects";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MoveRight } from "lucide-react";
import { capitalizeString, parseDateString } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { fetchUserBy } from "@/lib/fetch/fetchUsuarios";
import Link from "next/link";
import { fetchTareaById } from "@/lib/fetch/fetchTareas";
import VolverButton from "@/components/VolverButton";

export default async function Page({params}: {params: {id: string}} ){

  const data = await fetchTareaById(params.id);

  const usuario = await fetchUserBy("user_id", data.Asignada_a_Id_Usuario);

  const proyecto = await fetchProjectsById(data.Id_Proyecto);

  return (
    <div className="mt-8">
      <Card className="w-[350px]">
        <CardHeader>
          <h1 className="hollow-text font-bold text-[32px] ">TAREA: </h1>
          <CardTitle>{data.Nombre}</CardTitle>
          <CardDescription>{data.Descripcion}</CardDescription>
        </CardHeader>
        <CardContent>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Fecha de creacion</h2>
              <MoveRight className="size-4"/>
              <h3 className="italic">{parseDateString(data.Fe_creacion)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Fecha de entrega</h2>
              <MoveRight className="size-4"/>
              <h3 className="italic">{parseDateString(data.Fe_limite)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Estado</h2>
              <MoveRight className="size-4"/>
              <h3 className="font-bold">{capitalizeString(data.Estado)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Prioridad</h2>
              <MoveRight className="size-4"/>
              <h3 className="font-bold">{capitalizeString(data.Prioridad)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Asignada a:</h2>
              <MoveRight className="size-4"/>
              <h3 className="">
                <Link href={`/usuario/${usuario.Id_Usuario}`}>
                  {usuario.Email}
                </Link>
              </h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Proyecto al que pertenece</h2>
              <MoveRight className="size-4"/>
              <h3 className="">
                <Link href={`/proyecto/${proyecto.Id_Proyecto}`}>
                  {proyecto.Nombre}
                </Link>
              </h3>
            </div>
          </div>

        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <VolverButton />
          <Button>
            <Link href={`/tarea/modificar/${data.Id_Tarea}`}>
              Modificar tarea 
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
