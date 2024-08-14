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
