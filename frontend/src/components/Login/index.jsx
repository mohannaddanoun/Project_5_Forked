import React, {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setLogin,setUserId,} from "../../redux/reducers/auth/index"
    import { message } from 'antd';
import "./style.css"

//===============================================================

const Login = () => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const [email, setEmail] = useState("");
  const [message2, setMessage2] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

const {token,userid,isLoggedIn}=useSelector((state)=>{
  return{
token:state.auth.token
,userid:state.auth.userid,
isLoggedIn:state.auth.isLoggedIn
  }
})


  const login = async (e) => {

    messageApi.open({
      type: "loading",
      content: "Loading...",
      duration: 0.5,
    });
   
    
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
        console.log(result);        
        setMessage2(result.data.message);
       localStorage.setItem("token", result.data.token);
       localStorage.setItem("userId", result.data.userId);
       localStorage.setItem("isLoggedin", true);
       dispatch(setLogin(result.data.token),setUserId(result.data.userId))


       setTimeout(() => {
        messageApi.open({
          type: "success",
          content: result.data.message,
          duration: 3,
        });
      }, 500);
      } else throw Error;
    } catch (error) {
      console.log(error);
        setMessage2(error.response.data.message);
        setTimeout(() => {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
            duration: 3,
          });
        }, 500);

    }
    console.log(message);
  };


  return (
    <div className="log">
      <div className="Form" id="Login">
      {contextHolder}
        <h2 className="Title">Login</h2>
        <form onSubmit={login}>
          <br />
          <h5>User Email</h5>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-button"
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>


      </div>
      
    </div>

  );
};

export default Login;