import styles from "./CreatePost.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ushAuthValue } from "../../context/AuthContext"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.createPost}>
      <h2>Create Post</h2>
      <p>Write about you want and share with the community!</p>

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
        <button className="btn">Create Post</button>
        {/* {!loading && <button className="btn">Create Account</button>}
        {loading && <button className="btn" disabled>Creating your account...</button>}
        {error && <p className="error">{error}</p>} */}
      </form>
    </div>
  )
}

export default CreatePost
