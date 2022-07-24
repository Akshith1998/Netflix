import { useRef, useState } from "react"
import "./Register.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = () => { 
  const navigate=useNavigate();
    const [signupState,setSignupState]=useState({});
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const emailvalue=useRef();
    const passwordvalue=useRef();
    const handleStart=(e,id)=>{
        setEmail(emailvalue.current.value);
        setSignupState({[id]:email})
    }
    const handleFinish=(e,id)=>{
        e.preventDefault();
        setPassword(passwordvalue.current.value);
        setSignupState({...signupState,[id]:password})
        axios.post("http://localhost:3001/user/register",{email:email,password:password}).then((res)=>console.log(res)).catch((err)=>console.log(err));
        navigate("/login")
    }
    const handlelogin=()=>{
      navigate("/login")
    }
  return (
    <div className="register">
        <div className="top">
            <div className="wrapper">
                <img className="logo" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png" alt='wikipedia'/>
                <button className="loginbutton" onClick={handlelogin}>Sign In</button>
            </div>
        </div>
        <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailvalue} />
            <button className="registerButton" onClick={(e)=>handleStart(e,"email")}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} ref={passwordvalue} />
            <button className="registerButton" onClick={(e)=>handleFinish(e,"password")}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Register