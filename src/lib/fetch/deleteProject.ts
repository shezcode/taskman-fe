export async function deleteProject(id: string) {
  try{
    const res = await fetch(`http://localhost:8888/taskMan/deleteProject?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok){
      throw new Error(`http error, status: ${res.status}`)
    }

    const data = await res.json();

    return data;

  } catch (e){
    console.error("idek bro", e)
    throw e;
  }
}
