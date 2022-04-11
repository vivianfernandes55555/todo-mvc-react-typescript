import { combineReducers, Reducer } from 'redux';
import { todoStoreTypes } from '../actions/todo/todo.action';
import { IRootState } from './root.state';
import { todoReducer } from './todo/todo.reducer';
import { TodoState } from './todo/todo.reducer.state';

export const rootReducer = combineReducers<IRootState>({
    todoStore:todoReducer as Reducer<TodoState,todoStoreTypes>
})

export default rootReducer;