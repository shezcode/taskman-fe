import { Usuario } from "../types";

export async function fetchUsuarios(): Promise<Usuario[]> {
  try{
    const res = await fetch("http://localhost:8888/taskMan/getUser", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: "no-cache"
      //next: {
      // revalidate: 180
      //}
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

export async function fetchUserBy(param: string, paramValue: string): Promise<Usuario> {
  try {
    const res = await fetch(`http://localhost:8888/taskMan/getUser?${param}=${paramValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Usuario = await res.json();

    return data;
  } catch(e){
    throw e;
  }
}
export async function fetchMultipleUsersBy(param: string, paramValue: string): Promise<Usuario[]> {
  try {
    const res = await fetch(`http://localhost:8888/taskMan/getUser?${param}=${paramValue}`, {
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
