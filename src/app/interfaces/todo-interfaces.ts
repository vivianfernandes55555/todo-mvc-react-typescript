import { todoType } from "../types/todo.type";

export interface todoListProps {
    todos: todoType[],
    completeTodo: (id: string, index: number, isChecked: boolean) => void,
    removeTodo: (id: string) => void,
    updateTodo: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

export interface todoFormProps {
    todos: todoType[],
    addTodo: (todo: todoType) => void
    completeAllTodos: () => void
}

export interface todoItemProps {
    todo: todoType,
    index: number,
    completeTodo: (id: string, index: number, isChecked: boolean) => void,
    removeTodo: (id: string) => void,
    updateTodo: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
}

export interface todoFooterProps {
    todos: todoType[],
    getAllToDoList: () => void,
    getActiveToDoList: () => void,
    getCompletedToDoList: () => void,
    clearCompleted: () => void
}