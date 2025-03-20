import React, { useEffect, useState } from "react";
import Styles from "../css/PostCard.module.css";

const PostCard = ({ post, onEdit, onDelete }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (post.featured_media) {
      // Hacer una segunda petición para obtener la imagen destacada
      fetch(
        `https://teamelizabethmartinez.com/wp-json/wp/v2/media/${post.featured_media}`
      )
        .then((res) => res.json())
        .then((data) => setImageUrl(data.source_url))
        .catch((err) => console.error("Error cargando la imagen:", err));
    }
  }, [post.featured_media]);

  return (
    <div className={Styles.card}>
      {/* Mostrar imagen si existe */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title.rendered}
          className={Styles.image}
          title={post.title.rendered}
          loading="lazy"
        />
      )}
      <div className={Styles.body}>
        <h2 className={Styles.title}>{post.title.rendered}</h2>
        <p
          className={Styles.excerpt}
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        ></p>
      </div>
      <div className={Styles.actions}>
        <button
          className={Styles.editButton}
          onClick={() => onEdit(post.id)}
          aria-label="boton para editar un post"
        >
          Editar
        </button>
        <button
          className={Styles.deleteButton}
          onClick={() => onDelete(post.id)}
          aria-label="boton para borrar un post"
        >
          Borrar
        </button>
      </div>
    </div>
  );
};

export default PostCard;
