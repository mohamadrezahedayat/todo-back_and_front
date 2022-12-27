type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

function returnCorrectRequest(method: Method, data: unknown): RequestInit {
  if (method === 'GET') {
    return {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
  }
  return {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  };
}

export async function sendApiRequest<T>(data: {
  url: string;
  method: Method;
  data?: unknown;
}): Promise<T> {
  const response = await fetch(
    data.url,
    returnCorrectRequest(data.method, data.data),
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
