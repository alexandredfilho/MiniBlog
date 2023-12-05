import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  // fill form data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);


  const { user } = useAuthValue()
  const { updateDocument, response } = useUpdateDocument("posts")
  const navigate = useNavigate ()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    // Validate IMG URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("The image should be a valid IMG URL")
    }

    // Create TAGS array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    // Validate all values
    if(!title || !image || !tags || !body){
      setFormError("All fields are required")
    }
    if(formError) return

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    // Redirect to home page
    navigate("/dashboard")
  }

  return (
    <div className={styles.editPost}>
      {post &&  (
        <>
          <h2>Edit Post</h2>
          <p>Editing a post!</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Title:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <span>Image URL:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Enter an image URL"
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <p className={styles.previewTitle}>Image preview</p>
            <img className={styles.imagePreview} src={post.image} alt={post.title} />
            <label>
              <span>Content:</span>
              <textarea
                type="text"
                name="content"
                required
                placeholder="Content of the post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label>
              <span>TAGS:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Enter your tags"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Update Post</button>}
            {response.loading && <button className="btn" disabled>Updating your post...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}

export default EditPost
