export type Usuario = {
  Id_Usuario: string,
  Nombre: string,
  Email: string,
  Password: string,
  Fe_alta: string,
  departamento: Departamento
}

export type Departamento = {
  Id_Departamento: string,
  Nombre: string,
  Email: string,
  Fe_creacion: string,
  Presupuesto: number
}

export type Project = {
  Id_Proyecto: string,
  Nombre: string,
  Descripcion: string,
  Fe_creacion: string,
  Fe_actualizacion: string,
  Fe_inicio: string,
  Fe_fin: string,
  Estado: "En progreso" | "Finalizado" | "Pendiente" | "Cancelado",
  Prioridad: "Baja" | "Media" | "Alta" | "Urgente",
  Presupuesto: number,
  usuario: Usuario
}
