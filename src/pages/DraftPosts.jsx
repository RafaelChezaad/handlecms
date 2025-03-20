import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCardDraft from '../components/PostCardDraft'; // Componente de card
import Styles from "../css/PostList.module.css";

const DraftPosts = () => {
  const [draftPosts, setDraftPosts] = useState([]);
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
          "https://teamelizabethmartinez.com/wp-json/wp/v2/posts?status=draft", // Filtra solo los posts en borrador
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
        setDraftPosts(postData);
        setLoading(false); // Termina el estado de carga
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        setError("Hubo un error al cargar los posts en borrador.");
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchData();
  }, [token]);

  const handlePublish = async (postId) => {
    if (!token) {
      console.error("❌ No hay token para publicar");
      return;
    }

    try {
      await axios.post(
        `https://teamelizabethmartinez.com/wp-json/wp/v2/posts/${postId}`,
        {
          status: "publish", // Cambiamos el estado del post a "publicado"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizamos el estado para quitar el post publicado
      setDraftPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("🚨 Error al publicar el post:", error.response?.data || error.message);
    }
  };

  // Mientras se están cargando los posts, mostramos el estado de carga
  if (loading) {
    return <p>Cargando posts en borrador...</p>;
  }

  return (
    <div className={Styles.container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {draftPosts.length > 0 ? (
        draftPosts.map((post) => (
          <div key={post.id} className={Styles.postCard}>
            <PostCardDraft post={post} /> {/* Aquí usamos el componente PostCard para mostrar los posts */}
            <button 
              onClick={() => handlePublish(post.id)} 
              className={Styles.publishButton}
            >
              Publicar
            </button>
          </div>
        ))
      ) : (
        <p>No se encontraron posts en borrador.</p>
      )}
    </div>
  );
};

export default DraftPosts;
