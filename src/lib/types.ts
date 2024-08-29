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

export type Tarea = {
  Id_Tarea: string,
  Nombre: string,
  Descripcion: string,
  Asignada_a_Id_Usuario: string,
  Fe_creacion: string,
  Fe_limite: string,
  estado: Estado,
  prioridad: Prioridad,
  Id_Proyecto: string
}

export interface AuthContextType {
  user: {} | null;
  login: (email: string, password: string) => Promise<Usuario | null>;
  logout: () => void;
}
