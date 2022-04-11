import { TodoState } from "./todo/todo.reducer.state";

export interface IRootState {
    readonly todoStore: TodoState;
}