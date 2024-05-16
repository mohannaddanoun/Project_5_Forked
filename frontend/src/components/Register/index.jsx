import React,{useContext,useState} from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";


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
const [message, setMessage] = useState("");
const [status, setStatus] = useState(false);
const register = async (e)=>{
    console.log(firstName,
        lastName,
        userName,
        country,
        email,
        password,
        message,
        status);
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
            setMessage(result.data.message)
            console.log(1);
        }else throw Error;
    }catch(error){
        setStatus(false);
        setMessage(error.response.data.message)
    }
}
return (
    <>
    <div className="Form">
        {!isLoggedIn ? (
            <><p className="Title">Register:</p>
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
              <button>Register</button>
              <br />
            </form>
            </>):(
                <p>logout first</p>
              )
        }
    </div>
    </>
)

}


export default Register