import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from "@material-ui/icons"
import "./List.scss"
import Listitem from "../Listitem/Listitem"
import { useRef, useState } from "react"

const List = ({list}) => {
    const [isMoved,setIsMoved]=useState(false);
    const [slideNumber,setSlideNumber]=useState(0);
    const listref=useRef()
    const handleclick=(direction)=>{
        setIsMoved(true);
        let distance=listref.current.getBoundingClientRect().x-50;
        if(direction==="left" && slideNumber>0){
            setSlideNumber(slideNumber-1);
            listref.current.style.transform = `translateX(${230+distance}px)`
        }
        if(direction==="right" && slideNumber<5){
            setSlideNumber(slideNumber+1);
            listref.current.style.transform = `translateX(${-230+distance}px)`
        }
    }
  return ( 
    <div className="list">  
        <span className="listtitle">{list.title}</span>
        <div className="wrapper">
            <ArrowBackIosOutlined className="slidearrow left" onClick={()=>handleclick("left")} style={{display:!isMoved && "none"}}/>
            <div className="container" ref={listref}>
                {list.content.map((item,i)=>{
                    return <Listitem index={i} item={item}/>
                })}
            </div>
            <ArrowForwardIosOutlined className="slidearrow right" onClick={()=>handleclick("right")}/>
        </div>
    </div>
  )
}

export default List