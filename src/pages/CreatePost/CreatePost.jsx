import styles from "./CreatePost.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue, ushAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()
  const { insertDocument, response } = useInsertDocument("posts")

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    // Validate IMG URL

    // Create TAGS array

    // Validate all values
    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redirect to home page
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
        {!response.loading && <button className="btn">Create Post</button>}
        {response.loading && <button className="btn" disabled>Creating your post...</button>}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  )
}

export default CreatePost
