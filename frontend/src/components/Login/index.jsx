import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setLogin,
    setUserId,
    setLogout,} from "../../redux/reducers/auth/index"
    import { Button, Modal } from 'antd';

//===============================================================

const Login = () => {

  const dispatch =useDispatch();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
const {token,userid,isLoggedIn}=useSelector((state)=>{
  return{
token:state.auth.token
,userid:state.auth.userid,
isLoggedIn:state.auth.isLoggedIn
  }
})


  console.log(token);
  console.log(userid);
  console.log(isLoggedIn);
  const login = async (e) => {
   
    console.log(password);
    e.preventDefault();
    try {
        const input = {
            email:email,
            password:password
        }
      const result = await axios.post("http://localhost:5000/users/login",input)
      console.log(result.data);
      if (result.data) {
        console.log(result.data);
        setMessage("");
       localStorage.setItem("token", result.data.token);
       localStorage.setItem("userId", result.data.userId);
       localStorage.setItem("isLoggedin", true);
        saveToken(result.data.token, result.data.userId);
       dispatch(setLogin(result.data.token),setUserId(result.data.userId))
      } else throw Error;
    } catch (error) {
        setMessage(error.response);
    }
    
  };

  //===============================================================

//   useEffect(() => {
//     if (isLoggedIn) {
//       history("/dashboard");
//     }
//   });

  //===============================================================

  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <form onSubmit={login}>
          <br />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
    /*import React, { useState } from 'react';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default App; */
  );
};

export default Login;

