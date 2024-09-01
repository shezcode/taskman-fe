import { Tarea } from "../types";

export async function fetchTareas(): Promise<Tarea[]> {
  try{
    const res = await fetch("http://localhost:8888/taskMan/getAllTasks", {
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

    const data: Tarea[] = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}


export async function fetchTareaById(id: string): Promise<Tarea> {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/getAllTasks?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: "no-store",
      //next: {
      // revalidate: 180
      //}
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Tarea = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchTareasBy(param: string, value: string): Promise<Tarea[]> {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/getAllTasks?${param}=${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: "no-store",
      //next: {
      // revalidate: 180
      //}
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Tarea[] = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}
