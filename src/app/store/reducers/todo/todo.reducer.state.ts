import { todoType } from "../../../types/todo.type";
import { tabTypes } from "../../actions/todo/todo.action";

export interface TodoState {
    todoList: todoType[],
    activeTab: tabTypes,
    allTodosCompleted: boolean
}