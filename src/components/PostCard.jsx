import React from 'react';
import Styles from '../css/PostCard.module.css';

const PostCard = ({ post, onEdit, onDelete }) => {
  return (
    <div>
      <h3>{post.title.rendered}</h3> {/* Asegúrate de acceder a .rendered si es un objeto */}
      <p>{post.excerpt.rendered}</p> {/* De nuevo, verifica que sea .rendered */}
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> {/* Renderiza el HTML seguro si es necesario */}
      <button onClick={() => onEdit(post.id)}>Edit</button>
      <button onClick={() => onDelete(post.id)}>Delete</button>
    </div>
  );
};


export default PostCard;
