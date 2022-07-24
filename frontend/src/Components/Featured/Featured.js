import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import "./Featured.scss"
import axios from "axios"

const Featured = ({type, handlegenre}) => {
    const authToken=localStorage.getItem("authorization")
    const [featuredMovie,setFeaturedMovie]=useState({});
    useEffect(()=>{
        axios.get(`http://localhost:3001/movie/random?type=${type}`,{headers:{authorization:authToken}}).then((moviedata)=>{
            setFeaturedMovie(moviedata.data[0]);
        }).catch((err)=>{
            console.log(err)
        })
    },[type,authToken])
  return (
    <div className='featured'>
        {type && (
            <div className='type'>
                <span>
                    {type==="movies"?"Movies":"TV Shows"}
                </span>
                <select name='genre' id='genre' onChange={(e) => {handlegenre(e.target.value)}}>
                    <option>Genres</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Historical">Historical</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Western">Western</option>
                    <option value="Animation">Animation</option>
                    <option value="Drama">Drama</option>
                    <option value="Documentary">Documentary</option>
                </select>
            </div>
        )}
        <img src={featuredMovie.image} alt='wikipedia'/>
        <div className='info'>
            <img src={featuredMovie.imageTitle} alt=''/>
            <span className='description'>
            {featuredMovie.description}
            </span>
            <div className='buttons'>
                <button className='play'>
                    <PlayArrow/>
                    <span>Play</span>
                </button>
                <button className='more'>
                    <InfoOutlined/>
                    <span>More Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featured