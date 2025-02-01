import { createSlice } from "@reduxjs/toolkit";
import { createPost, loadPosts } from "./postOperations";

const postSlice = createSlice({
  name: "post",
  initialState: {
    postCreate: {
      lastPost: {},
      isLoading: false,
      error: null,
    },
    posts: {
      posts: [],
      isLoading: false,
      error: null,
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.fulfilled, (state, { payload }) => {
        state.posts.posts = payload;
        state.posts.isLoading = false;
        state.posts.error = null;
      })
      .addCase(loadPosts.pending, (state) => {
        state.posts.isLoading = true;
        state.posts.error = null;
      })
      .addCase(loadPosts.rejected, (state, { payload }) => {
        state.posts.error = payload;
        state.posts.isLoading = false;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.postCreate.lastPost = payload;
        state.postCreate.isLoading = false;
        state.postCreate.error = null;
      })
      .addCase(createPost.pending, (state) => {
        state.postCreate.isLoading = true;
        state.postCreate.error = null;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.postCreate.error = payload;
        state.postCreate.isLoading = false;
      });
  },
});

export default postSlice.reducer;
