import { Usuario } from "./types";

export async function fetchUsuarios(): Promise<Usuario[]> {
  try{
    const res = await fetch("http://localhost:8081/usuario/getAll", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Usuario[] = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchUserByDep(dep_name: string): Promise<Usuario[]> {
  try {
    const res = await fetch(`http://localhost:8081/usuario/dep/${dep_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Usuario[] = await res.json();

    return data;
  } catch(e){
    throw e;
  }
}
