import { todoType } from "../../../types/todo.type";


export enum todoAction {
    ADD_TO_TODO_LIST = '[Todo] ADD_TO_TODO_LIST',
    ADD_TO_TODO_LIST_SUCCESS = '[Todo] ADD_TO_TODO_LIST_SUCCESS',
    ADD_TO_TODO_LIST_FAILURE = '[Todo] ADD_TO_TODO_LIST_FAILURE',
    SET_ACTIVE_TAB = '[Todo] SET_ACTIVE_TAB',
    SET_ALL_TODO_COMPLETED = '[Todo] SET_ALL_TODO_COMPLETED'
}

export enum tabTypes {
    ALL_TAB = 'ALL_TAB',
    ACTIVE_TAB = 'ACTIVE_TAB',
    COMPLETED_TAB = 'COMPLETED_TAB',
    CLEAR_COMPLETED_TAB = 'CLEAR_COMPLETED_TAB'
}

export interface addTodoListAction {
    type: typeof todoAction.ADD_TO_TODO_LIST,
    payload: todoType[]
}

export interface addTodoListSuccessAction {
    type: typeof todoAction.ADD_TO_TODO_LIST_SUCCESS,
    payload: todoType[]
}

export interface addTodoListFailureAction {
    type: typeof todoAction.ADD_TO_TODO_LIST_FAILURE,
    payload: todoType[]
}


export interface setActiveTabAction {
    type: typeof todoAction.SET_ACTIVE_TAB,
    payload: tabTypes
}

export interface setAllTodoCompletedAction {
    type: typeof todoAction.SET_ALL_TODO_COMPLETED,
    payload: boolean
}

export type todoStoreTypes = | addTodoListAction | setActiveTabAction | setAllTodoCompletedAction | addTodoListSuccessAction | addTodoListFailureAction;

export const addToTodoList = (payload: todoType[]): todoStoreTypes => ({
    type: todoAction.ADD_TO_TODO_LIST,
    payload
});

export const addToTodoListSuccess = (payload: todoType[]): todoStoreTypes => ({
    type: todoAction.ADD_TO_TODO_LIST_SUCCESS,
    payload
});

export const addToTodoListFailure = (payload: todoType[]): todoStoreTypes => ({
    type: todoAction.ADD_TO_TODO_LIST_FAILURE,
    payload
});

export const setActiveTab = (payload: tabTypes): todoStoreTypes => ({
    type: todoAction.SET_ACTIVE_TAB,
    payload
});

export const setAllTodoCompleted = (payload: boolean): todoStoreTypes => ({
    type: todoAction.SET_ALL_TODO_COMPLETED,
    payload
});
