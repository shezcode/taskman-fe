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
import { fetchDepById } from "@/lib/fetch/fetchDepartments";

export default async function Page({params}: {params: {id: string}} ){

  const data = await fetchUserBy("user_id", params.id);

  const dep = await fetchDepById(data.Id_Departamento);

  return (
    <div className="mt-8">
      <Card className="w-[350px]">
        <CardHeader>
          <h1 className="hollow-text font-bold text-[32px] ">USUARIO: </h1>
          <CardTitle>{data.Nombre}</CardTitle>
          <CardDescription>{data.Email}</CardDescription>
        </CardHeader>
        <CardContent>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Fecha de alta</h2>
              <MoveRight className="size-4"/>
              <h3 className="italic">{parseDateString(data.Fe_alta)}</h3>
            </div>
            <Separator />
            <div className="flex flex-row space-x-1.5 items-center">
              <h2>Departamento</h2>
              <MoveRight className="size-4"/>
              <h3 className="font-bold">{dep.Nombre}</h3>
            </div>
          </div>
            <Separator />
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <VolverButton />
          <Button>
            <Link href={`/usuario/modificar/${data.Id_Usuario}`}>
              Modificar perfil 
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
