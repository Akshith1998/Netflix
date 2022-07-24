import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"

const Login = () => {
  const navigate=useNavigate();
  const [userValidate,setUserValidate]=useState(true)
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleLogin=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/user/login",{email:email,password:password}).then((loginData)=>{
      localStorage.setItem("authorization",loginData.data.token);
      navigate("/home")
    }).catch((err)=>{
      if(err.response.data==="Unauthorized user"){
        setUserValidate(false)
      }
    })
  }
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt=""/>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          {!userValidate && (
            <h4>Sorry, we can't find an account with this email address.</h4>
          )}
          <input type="email" placeholder="Email or phone number" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="loginButton" onClick={(e)=>handleLogin(e)}>Sign In</button>
          <span>
            New to Netflix? <Link to="/"><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  )
}

export default Login