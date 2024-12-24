"use client";

export default function ApiPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Documentación de la API</h2>
      <ul>
        <li>GET /api/merchants - Listar comercios</li>
        <li>POST /api/merchants - Crear un nuevo comercio</li>
      </ul>
    </div>
  );
}

