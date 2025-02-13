import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/index';
import { toast } from 'react-toastify';

export default function Posts() {
  const allPosts = useStore((state) => state.postSlice.all);
  const fetchAllPosts = useStore((state) => state.postSlice.fetchAllPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await fetchAllPosts();
      } catch (error) {
        toast.error(`Error fetching posts: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [fetchAllPosts]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <div className="posts-container">
        {allPosts?.length > 0 ? (
          allPosts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} className="post-tile">
              {post.coverUrl ? (
                <img src={post.coverUrl} alt="post cover" />
              ) : (
                <div>No Cover</div>
              )}
              <h3>{post.title}</h3>
              <p>{post.tags}</p>
            </Link>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}



