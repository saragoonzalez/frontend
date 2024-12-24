"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CommerceDetails() {
  const { id } = useParams(); // Obtiene el parámetro dinámico "id" de la URL
  const [details, setDetails] = useState(null); // Estado para los detalles del comercio
  const [reviews, setReviews] = useState([]); // Estado para las reseñas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [newReview, setNewReview] = useState({
    user: "",
    comment: "",
    rating: 0,
  }); // Estado del formulario de reseñas

  // Obtener detalles del comercio y sus reseñas
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/commerces/${id}`);
        setDetails(response.data);

        // Obtener reseñas del comercio
        const reviewsResponse = await axios.get(`/api/commerces/${id}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error al cargar los detalles del comercio.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // Manejar el envío de una nueva reseña
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/commerces/${id}/reviews`, newReview);
      setReviews((prev) => [...prev, response.data]); // Agregar la nueva reseña
      setNewReview({ user: "", comment: "", rating: 0 }); // Limpiar el formulario
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Error al enviar la reseña.");
    }
  };

  // Manejar la subida de imágenes
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const response = await axios.post(`/api/commerces/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Imagen subida correctamente");
      setDetails((prevDetails) => ({ ...prevDetails, image: response.data.image }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error al subir la imagen");
    }
  };

  if (loading) return <p className="text-center">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {details && (
        <>
          {/* Información del comercio */}
          <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
          <p className="text-gray-700">Ciudad: {details.city}</p>
          <p className="text-gray-700">Actividad: {details.activity}</p>

          {/* Mostrar imagen */}
          {details.image && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Imagen del Comercio</h2>
              <img
                src={`http://localhost:8081${details.image}`}
                alt={`Imagen de ${details.name}`}
                className="w-64 h-64 object-cover rounded shadow"
              />
            </div>
          )}

          {/* Formulario para subir imagen */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Subir Imagen</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
          </section>

          {/* Reseñas */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
            {reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded shadow">
                    <p>
                      <strong>{review.user}:</strong> {review.comment}
                    </p>
                    <p>Calificación: {review.rating}/5</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(review.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay reseñas aún.</p>
            )}
          </section>

          {/* Formulario para agregar reseña */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Agregar Reseña</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full p-2 border rounded"
                value={newReview.user}
                onChange={(e) =>
                  setNewReview({ ...newReview, user: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Tu comentario"
                className="w-full p-2 border rounded"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
              ></textarea>
              <input
                type="number"
                placeholder="Calificación (1-5)"
                className="w-full p-2 border rounded"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
                min="1"
                max="5"
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Enviar Reseña
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
}
