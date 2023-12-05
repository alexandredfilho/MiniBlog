import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom"

//Hooks
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useDeleteDocument } from "../../hooks/useDeleteDocument"

function Dashboard() {
  const {user} = useAuthValue()
  const uid = user.uid

  //User's posts
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  const { deleteDocument } = useDeleteDocument("posts")

  if(loading) {
    return <p>Loading...</p>
  }


  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Manage your posts!</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noPosts}>
          <p>No posts were found!</p>
          <Link to="/createPost" className="btn">
            Create your first post!
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.postHeader}>
            <div>Title</div>
            <div>Actions</div>
          </div>
            {posts && posts.map((post) => (
            <div key={post.id} className={styles.postRow}>
              <p>{post.title}</p>
              <div className={styles.actions}>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">See</Link>
                <Link to={`/editPost/${post.id}`} className="btn btn-outline">Edit</Link>
                <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default Dashboard
