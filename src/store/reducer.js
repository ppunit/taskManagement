import { combineReducers } from 'redux';
import tasksReducer from './slices/taskSlice';

const reducer = combineReducers({
    tasks: tasksReducer
  });

export default reducer;  