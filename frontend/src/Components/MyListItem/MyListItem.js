import { useState } from "react"
import "./MyListItem.scss"
import { Delete, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined} from "@material-ui/icons"

const MyListItem = ({movie,index}) => {
  const [ishover,setIshover]=useState(false);
  return (
    <div className="movie" style={{left:ishover && index *225-50 + index*2.5}} onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover(false)}>
      <img src={movie.image} alt=""/>
      {ishover && (
        <>
          <div className="mylistinfo"> 
            <div className="icons">
              <PlayArrow className="icon"/>
              <Delete className="icon"/>
              <ThumbUpAltOutlined className="icon"/>
              <ThumbDownOutlined className="icon"/>
            </div>
            <div className="mylistinfotop">
              <span>1 hour 02 minutes</span>
              <span className="limit">{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  )
}

export default MyListItem