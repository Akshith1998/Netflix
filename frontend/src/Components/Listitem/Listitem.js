import "./Listitem.scss"
import {useEffect, useState} from "react"
import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined} from "@material-ui/icons"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Listitem = ({index,item}) => {
  const navigate=useNavigate();
  const authToken=localStorage.getItem("authorization");
  const [hover,setHover]=useState(false);
  const [movie,setMovie]=useState({});
  useEffect(()=>{
    const getmovie=async()=>{
      try {
        const res=await axios.get("http://localhost:3001/movie/find/"+item,{headers:{authorization:authToken}});
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getmovie()
  },[item])
  const handleclick=()=>{
    navigate("/watch")
  }
  const handleMylist=async()=>{
    try {
      await axios({
        url:"http://localhost:3001/mylist", 
        method:"POST",
        headers:{authorization:authToken},
        data:{title:movie.title,description:movie.description,image:movie.image,trailer:movie.trailer,year:movie.year,limit:movie.limit}
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="listitem" style={{left:hover && index *225-50 + index*2.5}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
      <img src={movie.image} alt=""/>
      {hover && (
        <>
          <video src={movie.trailer} autoPlay={true} loop/>
          <div className="iteminfo"> 
            <div className="icons">
              <PlayArrow className="icon" onClick={handleclick}/>
              <Add className="icon" onClick={handleMylist}/>
              <ThumbUpAltOutlined className="icon"/>
              <ThumbDownOutlined className="icon"/>
            </div>
            <div className="iteminfotop">
              <span>1 hour 02 minutes</span>
              <span className="limit">{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="description">
            {movie.description}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default Listitem