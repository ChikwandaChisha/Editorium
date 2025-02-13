import {create} from "zustand";
import createPostSlice from './postSlice'; 
import '../style.css'

const useStore = create((set, get) => ({
  postSlice: createPostSlice(set, get),
  
}));

export default useStore;
