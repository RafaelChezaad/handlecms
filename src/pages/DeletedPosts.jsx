import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCardDelete from "../components/PostCardDelete"; // Componente de card
import Styles from "../css/PostList.module.css";

const DeletedPosts = () => {
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true); // Estado para cargar
  const [error, setError] = useState(""); // Estado para error

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No hay token disponible. Por favor, inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://teamelizabethmartinez.com/wp-json/wp/v2/posts?status=trash", // Filtra solo los posts eliminados
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("No tienes autorización para acceder a los posts.");
        }

        const postData = await response.json();
        setDeletedPosts(postData);
        setLoading(false); // Termina el estado de carga
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        setError("Hubo un error al cargar los posts eliminados.");
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchData();
  }, [token]);

  const handleRestore = async (postId) => {
    if (!token) {
      console.error("❌ No hay token para restaurar");
      return;
    }
  
    // Mostrar confirmación antes de restaurar
    const confirmRestore = window.confirm("¿Estás seguro de que quieres restaurar este post?");
    if (!confirmRestore) return;
  
    try {
      const response = await axios.post(
        `https://teamelizabethmartinez.com/wp-json/wp/v2/posts/${postId}`,
        { status: "publish" }, // Cambia el estado del post
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        alert("✅ Post restaurado con éxito");
        setDeletedPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== postId)
        );
      }
    } catch (error) {
      alert("🚨 Error al restaurar el post: " + (error.response?.data || error.message));
      console.error("🚨 Error al restaurar el post:", error.response?.data || error.message);
    }
  };
  

  // Mientras se están cargando los posts, mostramos el estado de carga
  if (loading) {
    return <p>Cargando posts eliminados...</p>;
  }

  return (
    <div className={Styles.container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {deletedPosts.length > 0 ? (
        deletedPosts.map((post) => (
          <div key={post.id} className={Styles.postCard}>
            <PostCardDelete post={post} onRestore={handleRestore} />
            {/* Aquí usamos el componente PostCard para mostrar los posts */}
          </div>
        ))
      ) : (
        <p>No se encontraron posts eliminados.</p>
      )}
    </div>
  );
};

export default DeletedPosts;
