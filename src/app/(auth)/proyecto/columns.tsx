"use client"

import { ArrowUpDown, Trash2 } from "lucide-react"
import { Project } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { deleteProject } from "@/lib/fetch/deleteProject"
import { toast } from "@/components/ui/use-toast"
import { capitalizeString, parseCurrency } from "@/lib/utils"
import { revalidatePath } from "next/cache"


async function handleDelete(id: string){
  const res = await deleteProject(id);
  if (!res.error){
    toast({
      title: `${res.message}`,
    })
    setTimeout(() => {
      window.location.href="/proyecto"
    }, 2000)
  } else {
    toast({
      title: `${res.error}`
    })
  }
}

export const columns: ColumnDef<Project>[] = [
  {
    id: "Seleccionar",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    cell: ({row}) => {
      let str: string = capitalizeString(row.getValue("Estado"));
      return <div>{str}</div>
    }
  },
  {
    accessorKey: "Nombre",
    header: "Nombre",
  },
  {
    accessorKey: "Prioridad",
    header: "Prioridad",
    cell: ({row}) => {
      let str: string = capitalizeString(row.getValue("Prioridad"));
      return <div>{str}</div>
    }
  },
  {
    accessorKey: "Presupuesto",
    header: ({ column }) => {
      return (
        <Button 
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Presupuesto
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      )
    },
    cell: ({row}) => {
      const formatted = parseCurrency(row.original.Presupuesto.toString())
      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    id: "extra",
    cell: ({ row }) => {
      const accion = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mas acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(accion.Id_Proyecto)}
              className="hover:cursor-pointer"
            >
              Copiar ID del proyecto
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {window.location.href = `/proyecto/${accion.Id_Proyecto}`}}>Ver proyecto</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "delButton",
    cell: ({row}) => {
      return (
        <Button 
          onClick={() => handleDelete(row.original.Id_Proyecto)}
          className="p-2 h-8"
          variant={"ghost"}>
          <Trash2 />
        </Button>
      );
    }
  },

]
