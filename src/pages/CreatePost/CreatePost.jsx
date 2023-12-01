import styles from "./CreatePost.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()
  const { insertDocument, response } = useInsertDocument("posts")
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


    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // Redirect to home page
    navigate("/")
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
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
