import Navbar from "../Navbar/Navbar"
import Featured from "../Featured/Featured"
import List from "../List/List"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = ({type}) => {
  const authToken=localStorage.getItem("authorization");
  const [lists,setLists]=useState([])
  const [genreselect,setGenreselect]=useState(null);
  const handlegenre=(value)=>{
    setGenreselect(value);
  }
  useEffect(()=>{
    const getlist=async()=>{
      try{
        let res=await axios.get(`http://localhost:3001/list${type ? "?type=" + type : ""}${genreselect ? "&genre=" + genreselect : ""}`,{headers:{authorization:authToken}})
        setLists(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getlist()
  },[type,genreselect]);
  return (
    <>
        <Navbar/>
        <Featured type={type} handlegenre={handlegenre}/>
        {lists.map((list)=>{
          return <List list={list}/>
        })}
    </>
  ) 
}

export default Home