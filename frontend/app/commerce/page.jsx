"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image"; // Importa Next Image

export default function CommerceDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newReview, setNewReview] = useState({
    user: "",
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`/api/commerces/${id}`);
        setDetails(response.data);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/commerces/${id}/reviews`, newReview);
      setReviews((prev) => [...prev, response.data]);
      setNewReview({ user: "", comment: "", rating: 0 });
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Error al enviar la reseña.");
    }
  };

  if (loading) return <p className="text-center">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {details && (
        <>
          <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
          <p className="text-gray-700">Ciudad: {details.city}</p>
          <p className="text-gray-700">Actividad: {details.activity}</p>

          {details.image && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Imagen del Comercio</h2>
              <Image
                src={`http://localhost:8081${details.image}`}
                alt={`Imagen de ${details.name}`}
                width={256}
                height={256}
                className="object-cover rounded shadow"
              />
            </div>
          )}

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
