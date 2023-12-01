import { db } from "../../firebase/config"
import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "./Register.module.css"

import { useState, useEffect } from "react"

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user ={
      displayName,
      email,
      password
    }

    if(password !== passwordConfirmation) {
      setError("Passwords do not match")
      return
    }

    const res = await createUser(user)

    console.log(res)
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Create your account now!</h1>
      <p>Create your account and share your stories!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="John Doe"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="john_doe@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Password Confirmation:</span>
          <input
            type="password"
            name="passwordConfirmation"
            required
            placeholder="Password Confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Create Account</button>}
        {loading && <button className="btn" disabled>Creating your account...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register