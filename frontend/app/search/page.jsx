"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function SearchPage() {
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [commerces, setCommerces] = useState([]);
  const [error, setError] = useState("");

  // Obtener la lista de comercios
  const fetchCommerces = async () => {
    try {
      const response = await axios.get("/api/commerces", {
        params: { city, activity },
      });
      setCommerces(response.data);
      setError("");
    } catch (err) {
      console.error("Error al cargar los comercios:", err);
      setError("No se pudieron cargar los comercios.");
    }
  };

  useEffect(() => {
    fetchCommerces();
  }, [city, activity]);

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Buscar Comercios</h1>
        {/* Botón para iniciar sesión */}
        <Link
          href="/login"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Iniciar Sesión
        </Link>
      </div>

      {/* Filtros */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Ciudad"
          className="border p-2 w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Actividad"
          className="border p-2 w-full"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
      </div>

      {/* Errores */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Resultados */}
      <ul>
        {commerces.map((commerce) => (
          <li key={commerce.id} className="mb-4 border p-2 rounded">
            <h3 className="font-bold">{commerce.name}</h3>
            <p>{commerce.city} ({commerce.activity})</p>
            <Link
              href={`/commerce/${commerce.id}`}
              className="text-blue-500 hover:underline"
            >
              Ver detalles
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
