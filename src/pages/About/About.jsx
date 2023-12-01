// CSS import
import { Link } from "react-router-dom"
import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles.about}>
      <h2>About Mini <span>Blog</span></h2>
      <p>This is project aims to create a mini blog using React and Firebase as a back-end!</p>

      <Link to="/posts/create" className="btn">Create a Post</Link>
    </div>
  )
}

export default About