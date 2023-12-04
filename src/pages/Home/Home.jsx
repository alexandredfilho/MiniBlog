// CSS import
import styles from "./Home.module.css"

// Hooks
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"

// Components
import PostDetails from "../../components/PostDetails"

const Home = () => {
  const [query, setQuery] = useState("")
  const { documents: posts, loading } = useFetchDocuments("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>See our most recent posts</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input type="text" placeholder="Or search by tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        {loading && <p>Loading data...</p>}
        {posts && posts.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>There isn't posts created already!</p>
            <Link to="/createPost" className="btn">Create your first post now!</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
