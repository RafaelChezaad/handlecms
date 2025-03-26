import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; // Componente de card
import Styles from "../css/PostList.module.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [loading, setLoading] = useState(true); // Estado para cargar
  const [error, setError] = useState(""); // Estado para error
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [postToDelete, setPostToDelete] = useState(null); // Estado para almacenar el post que se va a eliminar
  const [userId, setUserId] = useState(null); // Nuevo estado para el ID del usuario
  const navigate = useNavigate(); // Usar useNavigate para la navegación

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("No hay token disponible. Por favor, inicia sesión.");
        setLoading(false);
        return;
      }

      try {
        // Obtener el ID del usuario logeado (esto puede depender de tu implementación)
        const responseUser = await axios.get("https://teamelizabethmartinez.com/wp-json/wp/v2/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Almacenar el ID del usuario
        setUserId(responseUser.data.id);

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

        // Filtrar los posts por el ID del autor logeado
        const filteredPosts = postData.filter(post => post.author === responseUser.data.id);
        setPosts(filteredPosts);
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
    navigate(`/edit-post/${postId}`); // Usar navigate para redirigir
  };

  const handleDeleteRequest = (postId) => {
    setPostToDelete(postId);
    setShowModal(true); // Muestra el modal de confirmación
  };

  const handleDelete = async () => {
    if (!token || !postToDelete) {
      console.error("❌ No hay token o no se seleccionó post para eliminar");
      return;
    }

    try {
      await axios.delete(
        `https://teamelizabethmartinez.com/wp-json/wp/v2/posts/${postToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postToDelete));
      setShowModal(false); // Cierra el modal después de eliminar
      setPostToDelete(null); // Resetea el post seleccionado para eliminar
    } catch (error) {
      console.error("🚨 Error al eliminar el post:", error.response?.data || error.message);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Cierra el modal sin eliminar
    setPostToDelete(null); // Resetea el post seleccionado para eliminar
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
            onDelete={handleDeleteRequest} // Cambiado a la nueva función
          />
        ))
      ) : (
        <p>No se encontraron posts.</p>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className={Styles.modal}>
          <div className={Styles.modalContent}>
            <p>¿Estás seguro de que deseas eliminar este post?</p>
            <button onClick={handleDelete} className={Styles.modalButtonYes}>Sí, eliminar</button>
            <button onClick={handleCancelDelete} className={Styles.modalButtonNo}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
