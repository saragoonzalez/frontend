const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    throw error;
  }
};
