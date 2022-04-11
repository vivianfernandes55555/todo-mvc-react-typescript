import { todoValueType } from "../../../types/todo.type";

export enum todoAction {
    ADD_TO_TODO_LIST = '[Todo] ADD_TO_TODO_LIST'
}

export interface addTodoListAction {
    type: typeof todoAction.ADD_TO_TODO_LIST,
    payload: todoValueType[]
}

export type todoStoreTypes = | addTodoListAction;

export const addToTodoList = (payload: todoValueType[]): todoStoreTypes => ({
    type: todoAction.ADD_TO_TODO_LIST,
    payload
});
