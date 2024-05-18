import React from 'react'
import { useSelector } from 'react-redux'

function index() {
    const { token, isLoggedIn } = useSelector((state) => {
        return {
          token: state.auth.token,
          isLoggedIn: state.auth.isLoggedIn
        }
      })

  return (
    <div>index</div>
  )
}

export default index