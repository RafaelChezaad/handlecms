import React, { useEffect, useState } from "react";
import Styles from "../css/PostCardDelete.module.css";

const PostCardDraft = ({ post, onRestore }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (post.featured_media) {
      fetch(`https://teamelizabethmartinez.com/wp-json/wp/v2/media/${post.featured_media}`)
        .then((res) => res.json())
        .then((data) => setImageUrl(data.source_url))
        .catch((err) => {
          console.error("Error cargando la imagen:", err);
          setImageError(true); // Marcar error si la imagen no carga
        });
    }
  }, [post.featured_media]);

  return (
    <div className={Styles.card}>
      {/* Mostrar imagen si existe, o un mensaje de error si no se pudo cargar */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Imagen destacada de ${post.title.rendered}`}
          className={Styles.image}
          title={post.title.rendered}
          loading="lazy"
        />
      ) : imageError ? (
        <p className={Styles.errorText}>Error al cargar la imagen.</p>
      ) : (
        <p className={Styles.loadingText}>Cargando imagen...</p>
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
          className={Styles.restoreButton}
          onClick={() => onRestore(post.id)}
          aria-label="Restaurar post"
        >
          🔄 Restaurar
        </button>
      </div>
    </div>
  );
};

export default PostCardDraft;
