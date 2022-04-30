import { put, takeLatest } from 'redux-saga/effects';
import { addToTodoListFailure, addToTodoListSuccess, todoAction } from '../../actions/todo/todo.action';
import { API } from '../../services/api.service'

const apiServices = API();

export function* requestTodosSaga(action: any) {
    const { response, error } = yield apiServices.post('http://localhost:8000/postTodoList', JSON.stringify(action.payload));
    if (response) {
        yield put(addToTodoListSuccess(response));
    } else {
        yield put(addToTodoListFailure(error.responseData));
    }
}

export function* watchTodoSagas() {
   yield takeLatest(todoAction.SET_ALL_TODO_COMPLETED,requestTodosSaga);
}