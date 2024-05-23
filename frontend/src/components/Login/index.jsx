import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setLogin,
    setUserId,
    setLogout,} from "../../redux/reducers/auth/index"
import { Alert } from "antd";
    

//===============================================================

const Login = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(true);
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
        if(result.data.role === 1){
          navigate('/adminPage');
        }else if(result.data.role && result.data.role !==1){
          navigate("/")
        }

      if (result.data) {
        console.log(result.data);
        setMessage("success");
       localStorage.setItem("token", result.data.token);
       localStorage.setItem("userId", result.data.userId);
       localStorage.setItem("isLoggedin", true);
        saveToken(result.data.token, result.data.userId);
       dispatch(setLogin(result.data.token),setUserId(result.data.userId))
       setStatus(true)
      } else throw Error;
    } catch (error) {
      console.log(error);
        setMessage(error.response.data.message);
        setStatus(false)
    }
    console.log(message);
  };



  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <div><p>${status}</p> </div>
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

        {status  ?  <div className="SuccessMessage">{message}</div>
          :  <Alert
          message="Error"
          description={message}
          type="error"
          showIcon
        />}
      </div>
      
    </>

  );
};

export default Login;

