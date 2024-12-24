"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddCommerce = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Obtener token JWT desde el localStorage
      if (!token) {
        setError("No tienes permisos para realizar esta acción.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8081/api/commerces", // Endpoint del backend
        { name, city, activity }, // Datos del comercio
        { headers: { Authorization: token } } // Token en los headers
      );

      setSuccess("Comercio agregado exitosamente.");
      setName("");
      setCity("");
      setActivity("");
      console.log("Respuesta del servidor:", response.data);
    } catch (err) {
      console.error("Error al agregar comercio:", err);
      setError("Error al agregar el comercio. Verifica los datos o permisos.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Comercios</h1>

      {/* Formulario para agregar comercio */}
      <form onSubmit={handleAddCommerce} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del comercio"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ciudad"
          className="w-full p-2 border rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Actividad"
          className="w-full p-2 border rounded"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Agregar Comercio
        </button>
      </form>

      {/* Mensajes de error o éxito */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}

