// CSS
import styles from './Search.module.css'

// Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery.'

// Components
import PostDetails from '../../components/PostDetails'
import { Link } from 'react-router-dom'

const Search = () => {
  const query = useQuery()
  const search = query.get("q")
  const { documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.searchContainer}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>No posts were found from your search...</p>
            <Link to="/" className='btn btn-dark'>Back to home</Link>
          </div>
        )}
        {posts && posts.map((post) => (
          <PostDetails key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search