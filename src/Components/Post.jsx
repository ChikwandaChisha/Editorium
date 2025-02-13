import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../Store/index';
import { toast } from 'react-toastify';

export default function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();

  const current = useStore((state) => state.postSlice.current);
  const fetchPost = useStore((state) => state.postSlice.fetchPost);
  const deletPost = useStore((state) => state.postSlice.deletPost)
  const updatePost = useStore((state) => state.postSlice.updatePost)
  

  // Local component state to hold edit fields
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');

  // load post when component mounts or postID changes
  useEffect(() => {
    const loadPost = async () => {
      await fetchPost(postID);
    };
    loadPost();
  }, [fetchPost, postID]);

  // whenever `current` changes, sync local editing fields
  useEffect(() => {
    if (current && current.id === postID) {
      setTitle(current.title || '');
      setTags(current.tags || '');
      setCoverUrl(current.coverUrl || '');
      setContent(current.content || '');
    }
  }, [current, postID]);

  const handleUpdate = async () => {
    try {
      await updatePost(postID, { title, tags, coverUrl, content });
      setEditing(false);
    } catch (error) {
      toast.error(`Error updating post: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(postID);
      navigate('/');
    } catch (error) {
      toast.error(`Error deleting post: ${error.message}`);
    }
  };

  if (!current || !current.id) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="post-container">
      {!editing ? (
        <>
          {current.coverUrl && <img src={current.coverUrl} alt="cover" className="post-cover" />}
          <h2 className="post-title">{current.title}</h2>
          <p className="post-tags">Tags: {current.tags}</p>
          <div className="post-content">{current.content}</div>
          <div className="post-actions">
            <button className="edit-btn" onClick={() => setEditing(true)}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </>
      ) : (
        <div className="edit-form">
          <label htmlFor="edit-title" className="form-label">Title</label>
          <input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />

          <label htmlFor="edit-tags" className="form-label">Tags</label>
          <input id="edit-tags" value={tags} onChange={(e) => setTags(e.target.value)} className="input-field" />

          <label htmlFor="edit-coverUrl" className="form-label">Cover URL</label>
          <input id="edit-coverUrl" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="input-field" />

          <label htmlFor="edit-content" className="form-label">Content</label>
          <textarea id="edit-content" value={content} onChange={(e) => setContent(e.target.value)} className="textarea-field" />

          <div className="post-actions">
            <button className="save-btn" onClick={handleUpdate}>Save</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
