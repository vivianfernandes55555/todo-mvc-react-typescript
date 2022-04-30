import { put } from 'redux-saga/effects';
import { todos } from '../../../mocks/todo.mock';
import { addToTodoList, todoAction } from '../../actions/todo/todo.action';
import { requestTodosSaga, watchTodoSagas } from './todo-saga';


describe('todo sagas', () => {

    it('should dispatch action ADD_TO_TODO_LIST', () => {
        const generator = watchTodoSagas();
        expect(generator.next().done).toBeFalsy();
    });

    it('should dispatch action ADD_TO_TODO_LIST start', () => {
        const response = todos;
        const error = undefined;
        const generator = requestTodosSaga({
            type: todoAction.ADD_TO_TODO_LIST,
            payload: ''
        });
        generator.next();
        generator.next({ response, error });
        expect(
            put({ type: todoAction.ADD_TO_TODO_LIST, payload: response }).type
        ).toEqual('PUT');
        expect(generator.next().done).toBeTruthy();
    });


    it('should dispatch action ADD_TO_TODO_LIST success', () => {
        const response = todos;
        const error = undefined;
        const generator = requestTodosSaga({
            type: todoAction.ADD_TO_TODO_LIST_SUCCESS,
            payload: ''
        });
        generator.next();
        generator.next({ response, error });
        expect(
            put({ type: todoAction.ADD_TO_TODO_LIST_SUCCESS, payload: response }).type
        ).toEqual('PUT');
        expect(generator.next().done).toBeTruthy();
    });

    it('should dispatch action ADD_TO_TODO_LIST failure', () => {
        const response = todos;
        const error = undefined;
        const generator = requestTodosSaga({
            type: todoAction.ADD_TO_TODO_LIST_FAILURE,
            payload: {
                error: {
                    responseData: 'Error'
                }
            }
        });
        generator.next();
        generator.next({ response, error });
        expect(
            put({ type: todoAction.ADD_TO_TODO_LIST_FAILURE, payload: response }).type
        ).toEqual('PUT');
        expect(generator.next().done).toBeTruthy();
    });

    it('should handle error', () => {
        const response = undefined;
        const error = {
            error: {
                responseData: 'Error'
            }
        }
        const generator = requestTodosSaga({
            type: todoAction.ADD_TO_TODO_LIST,
            payload: ''
        });
        generator.next();
        generator.next({ response, error });
        expect(
            put({ type: todoAction.ADD_TO_TODO_LIST, payload: response }).type
        ).toEqual('PUT');
        expect(generator.next().done).toBeTruthy();
    });
});