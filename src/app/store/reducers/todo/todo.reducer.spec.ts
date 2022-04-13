import { todoAction, todoStoreTypes } from "../../actions/todo/todo.action";
import { initialState, todoReducer } from "./todo.reducer";
import { TodoState } from "./todo.reducer.state";
describe('Todo Reducer', () => {

    it('should return an empty intial state', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dummyAction: any = { type: 'DUMMY_ACTION' }
        expect(todoReducer({} as TodoState, dummyAction)).toEqual({});
    });

    it('should handle ADD_TO_TODO_LIST', () => {
        const requestAction: todoStoreTypes = {
            type: todoAction.ADD_TO_TODO_LIST,
            payload: [{
                id:"1",
                text: "need to go for lunch",
                isCompleted: false,
                isChecked: false,
            }]
        }

        expect(todoReducer(initialState, requestAction)).toEqual({...initialState.todoList,
            todoList: requestAction.payload
        })
    });

    it('should handle ADD_TO_TODO_LIST initial state branch', () => {
        const requestAction: todoStoreTypes = {
            type: todoAction.ADD_TO_TODO_LIST,
            payload: [{
                id:"1",
                text: "need to go for lunch",
                isCompleted: false,
                isChecked: false,
            }]
        }

        expect(todoReducer(initialState, requestAction)).toEqual({...initialState.todoList,
            todoList: requestAction.payload
        })
    });
})