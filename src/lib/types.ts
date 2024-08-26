import { Estado, Prioridad } from "./enums"

export type Usuario = {
  Id_Usuario: string,
  Nombre: string,
  Email: string,
  Password: string,
  Fe_alta: string,
  Id_Departamento: string 
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
  Estado: Estado,
  Prioridad: Prioridad,
  Presupuesto: number,
  Id_Usuario: string 
}
