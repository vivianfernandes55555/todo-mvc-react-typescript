import { tabTypes, todoAction, todoStoreTypes } from "../../actions/todo/todo.action";
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
            todoList: requestAction.payload,
            activeTab: tabTypes.ALL_TAB,
            allTodosCompleted: false
        })
    });

    it('should handle SET_ACTIVE_TAB', () => {
        const requestAction: todoStoreTypes = {
            type: todoAction.SET_ACTIVE_TAB,
            payload: tabTypes.ALL_TAB
        }
        expect(todoReducer(initialState, requestAction)).toEqual(
            {
            ...initialState,
            activeTab: requestAction.payload
        })
    });

    it('should handle SET_ALL_TODO_COMPLETED', () => {
        const requestAction: todoStoreTypes = {
            type: todoAction.SET_ALL_TODO_COMPLETED,
            payload: true
        }
        expect(todoReducer(initialState, requestAction)).toEqual(
            {
            ...initialState,
            allTodosCompleted: requestAction.payload
        })
    });
})