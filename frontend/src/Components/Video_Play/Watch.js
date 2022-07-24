import { ArrowBackOutlined } from "@material-ui/icons"
import { useNavigate } from "react-router-dom"
import "./Watch.scss"

const Watch = () => {
  const navigate=useNavigate()
  const handleback=()=>{
    navigate("/home")
  }
  return (
    <div className="video">
        <div className="back" onClick={handleback}>
            <ArrowBackOutlined/>
            Home
        </div>
        <video className="play" autoPlay progress controls src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"/>
    </div>
  )
}

export default Watch