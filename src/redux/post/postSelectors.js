export const selectPostCreate = (state) => state.post.postCreate;
export const selectLastCreatedPost = (state) => state.post.postCreate.lastPost;
export const selectIsLoading = (state) => state.post.postCreate.isLoading;
export const selectError = (state) => state.post.postCreate.error;
export const selectPosts = (state) => state.post.posts;
export const selectPostsLoading = (state) => state.post.posts.isLoading;
export const selectPostsError = (state) => state.post.posts.error;
