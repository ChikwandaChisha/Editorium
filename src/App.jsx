import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar.jsx';
import Posts from './Components/Posts.jsx';
import Post from './Components/Post.jsx';
import NewPost from './Components/NewPost.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <NavBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/new" element={<NewPost />} />
        <Route path="/posts/:postID" element={<Post />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
      
    </>
  );
}

