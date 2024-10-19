import React from 'react'
import './Home.css'
import { useContext, useEffect, useState } from 'react'
import { BlogContext } from '../components/context/BlogContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Home = () => {
  const { url,posts,setPosts} = useContext(BlogContext)
  // Get all the posts 
  const fetchPosts = async () => {
    try {

      const response = await axios.get(`${url}/api/list/posts/posts`);
      console.log(response.data.posts);
      setPosts(response.data.posts)


    } catch (err) {
      console.log(err)
    }
  }

  // shortens the text of the blog post
  const trunicateText = (text, maxLength = 10)=>{
    return text.length > maxLength? text.substring(0,10) +'....' : text;
  }



 
  

  useEffect(() => {
    fetchPosts();
    console.log(posts)
  }, [])

  return (
    <div className='co'>

      {posts.map(post => (

        <div className='content-container' key ={post._id}>
        <Link to={`/detail/${post._id}`}>
          <div className='content-img'>

            <img src={post.image}/>
          </div>

        
          <div className='content-text'>
 
            <h2>{post.tittle}</h2>
            <p>{post.date}</p>
            <p>{trunicateText(post.text)}</p>
            <p>By ✍️{post.author}</p>
         
          </div>
          </Link>
        </div>
      ))}

    </div>

  )
}

export default Home
