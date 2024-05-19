import React from 'react'
import { useSelector } from 'react-redux'
import "./style.css"

function index() {
    const { token,userid, isLoggedIn } = useSelector((state) => {
        return {
          token: state.auth.token,
          userid:state.auth.userid,
          isLoggedIn: state.auth.isLoggedIn
        }
      })

  return (
    <div>
          <div className="navBar">
            navbar
          </div>
          <div className="body_admin navBar">
            Bodddddddddy
          </div>
          <div className="footer navBar">
            footer
          </div>

    </div>
  )
}

export default index