import { todoType } from "../../../types/todo.type";


export enum todoAction {
    ADD_TO_TODO_LIST = '[Todo] ADD_TO_TODO_LIST'
}

export interface addTodoListAction {
    type: typeof todoAction.ADD_TO_TODO_LIST,
    payload: todoType[]
}

export type todoStoreTypes = | addTodoListAction;

export const addToTodoList = (payload: todoType[]): todoStoreTypes => ({
    type: todoAction.ADD_TO_TODO_LIST,
    payload
});
