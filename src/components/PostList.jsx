import React, { useEffect, useState } from 'react';
import axiosClient from '../axiosClient'; // Axios con la configuración de tu API
import PostCard from './PostCard'; // Componente de card
import Styles from '../css/PostList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Función para obtener los posts de WordPress
    const fetchPosts = async () => {
      try {
        const response = await axiosClient.get('/wp-json/wp/v2/posts');
        setPosts(response.data); // Asignar los posts al estado
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    console.log('Edit post with ID:', postId);
    // Aquí puedes redirigir a la página de edición de post o mostrar el formulario
  };

  const handleDelete = async (postId) => {
    try {
      await axiosClient.delete(`/wp-json/wp/v2/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId)); // Eliminar el post de la lista
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className={Styles.container}>
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
