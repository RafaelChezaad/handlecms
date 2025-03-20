import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; // Componente de card
import Styles from "../css/PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
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
          "https://teamelizabethmartinez.com/wp-json/wp/v2/posts",
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
        setPosts(postData);
        setLoading(false); // Termina el estado de carga
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        setError("Hubo un error al cargar los posts.");
        setLoading(false); // Termina el estado de carga
      }
    };

    fetchData();
  }, [token]);

  const handleEdit = (postId) => {
    console.log("✏️ Editando post con ID:", postId);
  };

  const handleDelete = async (postId) => {
    if (!token) {
      console.error("❌ No hay token para eliminar");
      return;
    }

    try {
      await axios.delete(
        `https://teamelizabethmartinez.com/wp-json/wp/v2/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("🚨 Error al eliminar el post:", error.response?.data || error.message);
    }
  };

  // Mientras se están cargando los posts, mostramos el estado de carga
  if (loading) {
    return <p>Cargando posts...</p>;
  }

  return (
    <div className={Styles.container}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No se encontraron posts.</p>
      )}
    </div>
  );
};

export default PostList;

