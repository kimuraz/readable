import { combineReducers } from 'redux';
import { ADD_CATEGORY, ADD_POST, SORT_BY } from '../actions/types';


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

export default combineReducers({
    categoryReducer,
});