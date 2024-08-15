export type Usuario = {
  id_Usuario: string,
  nombre: string,
  email: string,
  Password: string,
  fe_alta: string,
  departamento: Departamento
}

export type Departamento = {
  id_Departamento: string,
  nombre: string,
  email: string,
  fe_creacion: string,
  presupuesto: number
}

export type Project = {
  id_Proyecto: string,
  nombre: string,
  descripcion: string,
  fe_creacion: string,
  fe_actualizacion: string,
  fe_inicio: string,
  fe_fin: string,
  estado: "En progreso" | "Finalizado" | "Pendiente" | "Cancelado",
  prioridad: "Baja" | "Media" | "Alta" | "Urgente",
  presupuesto: number,
  usuario: Usuario
}
