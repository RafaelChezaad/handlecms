import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Styles from "../css/CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [status, setStatus] = useState("publish");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Nuevo mensaje de éxito
  const imageInputRef = useRef(null);
  const token = localStorage.getItem("authToken");

  // Obtener categorías de WordPress
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://teamelizabethmartinez.com/wp-json/wp/v2/categories"
        );
        setAllCategories(response.data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Limpiar errores previos
    setError("");
  
    // Remover espacios y etiquetas vacías en el contenido
    const cleanedContent = content.trim().replace(/<p><br><\/p>/g, "").trim();
  
    // Validación antes de enviar
    if (!title.trim()) {
      setError("El título es obligatorio");
      return;
    }
    if (!slug.trim()) {
      setError("El slug es obligatorio");
      return;
    }
    if (!cleanedContent) {
      setError("El contenido no puede estar vacío");
      return;
    }
    if (categories.length === 0) {
      setError("Debe seleccionar al menos una categoría");
      return;
    }
  
    let featuredImageId = null;
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const mediaResponse = await axios.post(
          "https://teamelizabethmartinez.com/wp-json/wp/v2/media",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        featuredImageId = mediaResponse.data.id;
      } catch (err) {
        console.error("Error al subir la imagen:", err);
        setError("Error al subir la imagen");
        return;
      }
    }
  
    const postData = {
      title,
      slug,
      content: cleanedContent,
      status,
      categories,
      featured_media: featuredImageId,
    };
  
    try {
      const response = await axios.post(
        "https://teamelizabethmartinez.com/wp-json/wp/v2/posts",
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("✅ Post creado:", response.data);
      setTitle("");
      setSlug("");
      setContent("");
      setImage(null);
      setCategories([]);
      setStatus("publish");
      setError("");
      setSuccessMessage("✅ Post creado exitosamente 🎉");
  
      if (imageInputRef.current) imageInputRef.current.value = "";
  
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("❌ Error al crear el post:", err);
      setError("Hubo un error al crear el post");
    }
  };
  

  return (
    <section className={Styles.createPost}>
      <form onSubmit={handleSubmit}>
        <div className={Styles.formGroup}>
          <label className={Styles.title}>Título del post</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={Styles.input}
          />
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.title}>Slug</label>
          <input
            type="text"
            value={slug}
            className={Styles.input}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.title}>Contenido</label>
          <SunEditor
            setContents={content}
            onChange={setContent}
            setOptions={{
              height: 300,
              buttonList: [
                ["undo", "redo"],
                ["bold", "italic", "underline", "strike"],
                ["formatBlock"],
                ["align", "list", "blockquote"],
                ["table", "link", "image", "video"],
                ["removeFormat"],
              ],
            }}
          />
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.title}>Imagen destacada</label>
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.title}>Categorías</label>
          <select
           
            value={categories}
            onChange={(e) =>
              setCategories(
                Array.from(e.target.selectedOptions, (option) =>
                  Number(option.value)
                )
              )
            }
          >
            {allCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.title}>Estado del post</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="publish">Publicado</option>
            <option value="draft">Borrador</option>
          </select>
        </div>

        {error && <div className={Styles.error}>{error}</div>}
        {successMessage && <div className={Styles.success}>{successMessage}</div>}

        <button type="submit" className={Styles.button}>
          Crear Post
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
