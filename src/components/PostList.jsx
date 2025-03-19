import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard'; // Componente de card
import Styles from '../css/PostList.module.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    // Función para obtener los posts de WordPress
    const fetchPosts = async () => {
      if (!token) {
        console.error("No token found.");
        return;
      }
      try {
        const response = await axios.get('https://teamelizabethmartinez.com/wp-json/wp/v2/posts/', {
          headers: {
            Authorization: `Bearer ${token}` // Asegúrate de que el token esté en los encabezados
          }
        });
        setPosts(response.data); // Asignar los posts al estado
      } catch (error) {
        console.error('Error fetching posts:', error.response ? error.response.data : error.message);
      }
    };

    fetchPosts();
  }, [token]); // Dependencia de token

  const handleEdit = (postId) => {
    console.log('Edit post with ID:', postId);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://teamelizabethmartinez.com/wp-json/wp/v2/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error.response ? error.response.data : error.message);
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


