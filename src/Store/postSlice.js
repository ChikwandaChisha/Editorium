import axios from 'axios';
import { toast } from 'react-toastify'; 

const ROOT_URL = 'https://platform.cs52.me/api';
const API_KEY = '?key=c_chisha'; 

const createPostSlice = (set, get) => ({
  all: [],
  current: {
    id: null,
    title: '',
    content: '',
    tags: '',
    coverUrl: '',
  },  // Initialize with empty object containing keys for when component mounts
  fetchAllPosts: async () => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      set((state) => ({ postSlice: { ...state.postSlice, all: response.data } }));
    } catch (error) {
        toast.error(`Error fetching posts: ${error.message}`);
    }
  },
  fetchPost: async (id) => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
      set((state) => ({ postSlice: { ...state.postSlice, current: response.data } }));
    } catch (error) {
      toast.error(`Error fetching post: ${error.message}`);
    }
  },
  createPost: async (post) => {
    try {
      const response = await axios.post(`${ROOT_URL}/posts${API_KEY}`, post);
      // Assuming the API returns the new post with an ID:
      set((state) => ({
        postSlice: {
          ...state.postSlice,
          all: [...state.postSlice.all, response.data],
        },
      }));
      return response.data.id; // Return the new post ID for navigation
    } catch (error) {
      toast.error(`Error creating post: ${error.message}`);
      return null; // Indicate failure
    }
  },
  updatePost: async (id, post) => {
    try {
      await axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post);
      // Update the post in the 'all' array (optimistic update)
      set((state) => ({
        postSlice: {
          ...state.postSlice,
          all: state.postSlice.all.map((p) => (p.id === id ? { ...p, ...post } : p)),
          current: { ...state.postSlice.current, ...post }, //Update current as well
        },
      }));
    } catch (error) {
      toast.error(`Error updating post: ${error.message}`);
    }
  },
  deletePost: async (id) => {
    try {
      await axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`);
      // Remove the post from the 'all' array
      set((state) => ({
        postSlice: {
          ...state.postSlice,
          all: state.postSlice.all.filter((post) => post.id !== id),
        },
      }));
    } catch (error) {
      toast.error(`Error deleting post: ${error.message}`);
    }
  },
});

export default createPostSlice;
