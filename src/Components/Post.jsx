import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';
import { toast } from 'react-toastify';

export default function Post() {
  const { postID } = useParams();
  const navigate = useNavigate();

  const { current, fetchPost, deletePost, updatePost } = useStore((state) => ({
    current: state.postSlice.current,
    fetchPost: state.postSlice.fetchPost,
    deletePost: state.postSlice.deletePost,
    updatePost: state.postSlice.updatePost,
  }));

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
    <div>
      {!editing ? (
        <>
          {current.coverUrl && <img src={current.coverUrl} alt="cover" />}
          <h2>{current.title}</h2>
          <p>Tags: {current.tags}</p>
          <div>Content: {current.content}</div>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <div>
          <label htmlFor="edit-title">Title</label>
          <input id="edit-title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="edit-tags">Tags</label>
          <input id="edit-tags" value={tags} onChange={(e) => setTags(e.target.value)} />
          <label htmlFor="edit-coverUrl">Cover URL</label>
          <input
            id="edit-coverUrl"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
          <label htmlFor="edit-content">Content</label>
          <textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
