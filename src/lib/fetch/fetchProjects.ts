import { Project } from "../types";

export async function fetchProjects(): Promise<Project[]> {
  try{
    const res = await fetch("http://localhost:8081/proyecto/getAll", {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Project[] = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchProjectsById(id: string): Promise<Project[]> {
  try{
    const res = await fetch(`http://localhost:8081/proyecto/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Project[] = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchProjectsByUserId(user_id: string): Promise<Project[]> {
  try{
    const res = await fetch(`http://localhost:8081/proyecto/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Project[] = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}

