import React,{useState} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from 'antd';
import "./style.css"


const Register =()=>{

const {isLoggedIn}=useSelector((state)=>{
    return {isLoggedIn:state.auth.isLoggedIn}
})
const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [userName, setUserName] = useState("")
const [country, setCountry] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [message2, setMessage2] = useState("");
const [status, setStatus] = useState(false);
const [messageApi, contextHolder] = message.useMessage();
const register = async (e)=>{

  messageApi.open({
    type: "loading",
    content: "Loading...",
    duration: 0.5,
  });

  
    e.preventDefault();
    try{
        const input ={firstName,
            lastName,
            userName,
            country,
            email,
            password}
        const result=await axios.post(" http://localhost:5000/users/register",input)

        if(result.data){
            setStatus(true);
            setMessage2(result.data.message)
            setTimeout(() => {
              messageApi.open({
                type: "success",
                content: result.data.message,
                duration: 3,
              });
            }, 500);
        }else throw Error;
    }catch(error){
        setStatus(false);
        setMessage2(error.response.data.message)
        setTimeout(() => {
          messageApi.open({
            type: "error",
            content: error.response.data.message,
            duration: 3,
          });
        }, 500);
    }
}
return (
    <div className="register">
    <div className="Form" id="Register">
      {contextHolder}
        {!isLoggedIn ? (
            <><h2 className="Title">Sign up:</h2>
            <form onSubmit={register}>
              <br />
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="User name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
              />
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
              <button className="register-button">Register</button>
              <br />
            </form>
            </>):(
                <p>logout first</p>
              )
        }
   
    </div>
    </div>
)

}


export default Register