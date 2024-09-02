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
import { capitalizeString, parseCurrency, parseDateString } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { fetchUserBy } from "@/lib/fetch/fetchUsuarios";
import Link from "next/link";
import { fetchTareaById } from "@/lib/fetch/fetchTareas";
import VolverButton from "@/components/VolverButton";
import { fetchDepById } from "@/lib/fetch/fetchDepartments";

export default async function Page({params}: {params: {id: string}} ){

  const data = await fetchDepById(params.id);

  return (
    <div className="mt-8">
      <Card className="w-[350px]">
        <CardHeader>
          <h1 className="hollow-text font-bold text-[32px] ">DEPARTAMENTO: </h1>
          <CardTitle>{data.Nombre}</CardTitle>
          <CardDescription>{data.Email}</CardDescription>
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
              <h2>Presupuesto</h2>
              <MoveRight className="size-4"/>
              <h3 className="font-bold">{parseCurrency(data.Presupuesto.toString())}</h3>
            </div>
          </div>
            <Separator />
        </CardContent>
        <CardFooter className="flex justify-between mt-4">
          <VolverButton />
        </CardFooter>
      </Card>
    </div>
  );
}
