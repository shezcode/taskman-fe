import { Departamento } from "../types";

export async function fetchDepartments(): Promise<Departamento[]> {
  try {
    const res = await fetch("http://localhost:8888/taskMan/getDepBy", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: "no-cache"
    },);

    if (!res.ok) {
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Departamento[] = await res.json();



    return data;

  } catch (e) {
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchDepBy(param: string, value: string): Promise<Departamento[]> {
  try {
    const res = await fetch(`http://localhost:8888/taskMan/getDepBy?${param}=${value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: "no-cache"
    });

    if (!res.ok) {
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Departamento[] = await res.json();

    return data;


  } catch (e) {
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchDepById(id: string): Promise<Departamento> {
  try {
    const res = await fetch(`http://localhost:8888/taskMan/getDepBy?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Departamento = await res.json();

    return data;


  } catch (e) {
    console.error("idek bro", e)
    throw e;
  }
}
