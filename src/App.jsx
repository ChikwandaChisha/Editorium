import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Posts from './components/Posts';
import Post from './components/Post';
import NewPost from './components/NewPost';
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

