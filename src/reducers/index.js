import { combineReducers } from 'redux';
import { ADD_CATEGORY, ADD_POST, SORT_POSTS_BY, EDIT_POST } from '../actions/types';
import { CardActions } from '../../node_modules/@material-ui/core';


export const categoryReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_CATEGORY:
            if (!state.includes(action.category)) {
                return [...state, action.category];
            }
            return state;
        default:
            return state;
    }
}

function sortBy(arr, sorting) {
    const arrCp = [...arr];
    return arrCp.sort((x, y) => x[sorting] - y[sorting]);
}

export const postsReducer = (state = { posts: [], sorting: 'timestamp' }, action) => {
    switch(action.type) {
        case ADD_POST:
            if (!state.posts.includes(action.post)) {
                return { ...state, posts: sortBy([...state.posts, action.post], state.sorting)};
            }
            return state;
        case SORT_POSTS_BY:
            if (!state.sorting === action.sorting) {
                return state;
            }
            return { ...state, posts: sortBy(state.posts, action.sorting), sorting: action.sorting };
        case EDIT_POST:
            const { newPost } = action;
            const idx = state.posts.findIndex(p => p.id === newPost.id);
            if (idx !== -1) {
                const newArr = [...state.posts];
                newArr[idx] = newPost;
                return { ...state, posts: newArr }
            }
            return state;
        default:
            return state;
    }
}

export default combineReducers({
    categoryReducer,
    postsReducer,
});