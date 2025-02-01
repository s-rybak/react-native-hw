import { uploadImage, addPost, getPosts } from "../../services/firebaseStore";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      return await addPost(postData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPosts = createAsyncThunk(
  "post/loadPosts",
  async (id, { rejectWithValue }) => {
    try {
      return await getPosts(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
