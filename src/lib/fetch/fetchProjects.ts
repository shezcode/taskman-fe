import { Project } from "../types";

export async function fetchProjects(): Promise<Project[]> {
  try{
    const res = await fetch("http://localhost:8888/taskMan/getProjects", {
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

export async function fetchProjectsById(id: string): Promise<Project> {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/getProjects?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data: Project = await res.json();

    return data;


  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}

export async function fetchProjectsByUserId(user_id: string): Promise<Project[]> {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/getProjects?user_id=${user_id}`, {
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

