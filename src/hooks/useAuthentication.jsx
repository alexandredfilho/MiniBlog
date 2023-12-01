import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  //Clean up
  // Deal with memory leaks
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if(cancelled) {
      return
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(null)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await updateProfile(user, {
        displayName: data.displayName,
      })

      setLoading(false)

      return user
    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message)

      setLoading(false)
      setError(error.message)
    }
  }

  // Logout
  const logout = () => {
    checkIfIsCancelled()

    signOut(auth)
  }

  //login
  const login = async(data) => {
    checkIfIsCancelled()
    setLoading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)

      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
}
