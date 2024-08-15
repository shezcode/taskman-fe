"use client"

import { Project } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "prioridad",
    header: "Prioridad",
  },
  {
    accessorKey: "presupuesto",
    header: () => <div className="text-right">Presupuesto</div>,
    cell: ({row}) => {
      const amount = parseFloat(row.getValue("presupuesto"))
      const formatted = new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>
    }
  }
]
