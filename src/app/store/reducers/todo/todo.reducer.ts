import { todoAction, todoStoreTypes } from "../../actions/todo/todo.action";
import { TodoState } from "./todo.reducer.state";

export const initialState: TodoState = {
    todoList: []
}

export const todoReducer = (
    state: TodoState = initialState,
    action: todoStoreTypes
) => {
    switch (action.type) {
        case todoAction.ADD_TO_TODO_LIST:
            return {
                ...state,
                todoList: action.payload
            };            
        default:
            return state;
    }
}