export async function loginUser(email: string, password: string) {
  const response = await fetch('http://localhost:8081/usuario/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
  return data; // Assumes response includes user info or token
}
