import styles from  './Post.module.css'

//Hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
  const { id } = useParams()
  const { document: post, loading } = useFetchDocument("posts", id)

  return (
    <div className={styles.postContainer}>
      {loading && <p>Loading Post...</p>}
      {post && (
        <>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        <p>{post.body}</p>
        <h3>This post is about:</h3>
        <div className={styles.tags}>
          {post.tagsArray.map((tag) => (
            <p key={tag}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        </>
      )}
    </div>
  )
}

export default Post
