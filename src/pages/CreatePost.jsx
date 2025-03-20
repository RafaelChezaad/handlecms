import React, { useState, useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import Styles from "../css/CreatePost.module.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const imageInputRef = useRef(null);
  const token = localStorage.getItem("authToken");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !content || !image) {
      setError("Todos los campos son obligatorios");
      return;
    }

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

      const featuredImageId = mediaResponse.data.id;

      const postData = {
        title,
        content: { rendered: content },
        status: "publish",
        categories,
        featured_media: featuredImageId,
        slug,
      };

      const response = await axios.post(
        "https://teamelizabethmartinez.com/wp-json/wp/v2/posts",
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Post creado:", response.data);

      setTitle("");
      setSlug("");
      setContent("");
      setImage(null);
      setCategories([]);
      setError("");

      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (err) {
      console.error("Error al crear el post:", err);
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
                ["removeFormat"]
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
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label className={Styles.title}>Categorías</label>
          <select
            multiple
            value={categories}
            onChange={(e) =>
              setCategories(Array.from(e.target.selectedOptions, (option) => Number(option.value)))
            }
          >
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
          </select>
        </div>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <button type="submit" className={Styles.button}>Crear Post</button>
      </form>
    </section>
  );
};

export default CreatePost;
