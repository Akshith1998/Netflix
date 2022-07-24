import { ArrowBackOutlined } from "@material-ui/icons"
import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom"
import "./MyList.scss"
import MyListItem from "../MyListItem/MyListItem";

const MyList = () => {
  const authToken=localStorage.getItem("authorization");
  const[list,setList]=useState([])
    const navigate=useNavigate();
    const handleback=()=>{
        navigate("/home");
    }
    useEffect(()=>{
      axios.get("http://localhost:3001/mylist",{headers:{authorization:authToken}}).then((data)=>{
        setList(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    },[])
  return (
    <div className="listpage">
        <div className="back" onClick={handleback}>
            <ArrowBackOutlined className="icon"/>
            Home
        </div>
        <div className="heading">
          <h1>My List</h1>
        </div>
        <div className="wrapper">
        <div className="mylist">
          {list.map((movie,i)=>{
            return <MyListItem movie={movie} index={i%6}/>
          })}
        </div>
        </div>
    </div>
  )
}

export default MyList