import React, { useState } from 'react';
import useStore from '../store/index.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewPost() {
  const createPost = useStore((state) => state.postSlice.createPost);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Title and content are required');
      return;
    }
    const newId = await createPost({ title, tags, content, coverUrl });
    if (newId) {
      toast.success('Post created successfully');
      // Clear input fields
      setTitle('');
      setTags('');
      setContent('');
      setCoverUrl('');
      navigate(`/posts/${newId}`);
    }
  };

 return (
    <div className="new-post-container">
      <h2 className="form-title">Create New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" required />

        <label htmlFor="tags" className="form-label">Tags</label>
        <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} className="input-field" />

        <label htmlFor="coverUrl" className="form-label">Cover URL</label>
        <input type="text" id="coverUrl" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="input-field" />

        <label htmlFor="content" className="form-label">Content</label>
        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="textarea-field" required />

        <button type="submit" className="submit-btn">Create</button>
      </form>
    </div>
  );
}
