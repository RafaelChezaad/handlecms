import React from 'react';
import Styles from '../css/PostCard.module.css';

const PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className={Styles.card}>
      <img src={post.featuredImage.url} alt={post.title} className={Styles.image} />
      <h3 className={Styles.title}>{post.title}</h3>
      <p className={Styles.excerpt}>{post.excerpt}</p>
      <div className={Styles.actions}>
        <button className={Styles.editButton} onClick={() => onEdit(post.id)}>
          Editar
        </button>
        <button className={Styles.deleteButton} onClick={() => onDelete(post.id)}>
          Borrar
        </button>
      </div>
    </div>
  );
};

export default PostCard;
