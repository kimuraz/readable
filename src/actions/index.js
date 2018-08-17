import { ADD_CATEGORY, ADD_POST, SORT_POSTS_BY, EDIT_POST } from './types';


export const addCategory = (category) => ({
        type: ADD_CATEGORY,
        category
});

export const addPost = (post) => ({
    type: ADD_POST,
    post
});

export const sortPostsBy = (sorting) => ({
    type: SORT_POSTS_BY,
    sorting
});


export const editPost = (newPost) => ({
    type: EDIT_POST,
    newPost
});