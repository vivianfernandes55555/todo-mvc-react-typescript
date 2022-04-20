import { tabTypes, todoAction, todoStoreTypes } from "../../actions/todo/todo.action";
import { TodoState } from "./todo.reducer.state";

export const initialState: TodoState = {
    todoList: [],
    activeTab: tabTypes.ALL_TAB,
    allTodosCompleted: false
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
        case todoAction.ADD_TO_TODO_LIST_SUCCESS:
            return {
                ...state,
                todoListRestApiSuccessResp: action.payload
            };
        case todoAction.ADD_TO_TODO_LIST_FAILURE:
            return {
                ...state,
                todoListRestApiFailureResp: action.payload
            };
        case todoAction.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTab: action.payload
            };
        case todoAction.SET_ALL_TODO_COMPLETED:
            return {
                ...state,
                allTodosCompleted: action.payload
            };
        default:
            return state;
    }
}