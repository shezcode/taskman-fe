export async function loginUser(email: string, password: string) {
  const response = await fetch('http://localhost:8888/taskMan/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Email: email, Password: password}),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  const data = await response.json();
  return data; 
}
