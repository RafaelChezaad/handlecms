import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; // Componente de card
import Styles from "../css/PostList.module.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    console.log("Token actual:", token);

    const fetchData = async () => {
      if (!token) {
        console.error("No hay token disponible");
        return;
      }
    
      try {
        const response = await fetch(
          "https://teamelizabethmartinez.com/wp-json/wp/v2/posts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,  // Asegúrate de que token sea válido
              "Content-Type": "application/json",
            },
          }
        );
    
        if (!response.ok) {
          throw new Error("No tienes autorización");
        }
    
        const postData = await response.json();
        setPosts(postData);
      } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
      }
    };

    fetchData();
  }, [token]); // 🔹 Se ejecuta solo cuando cambia el token

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

  return (
    <div className={Styles.container}>
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
