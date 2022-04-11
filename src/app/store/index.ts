import { createStore, Store, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension'
import { IRootState } from './reducers/root.state';

export  function configureStore(initialState?:IRootState): Store<IRootState> {
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let middleware = applyMiddleware(...middlewares);
middleware = composeWithDevTools(middleware);

const store = createStore(
    rootReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState as any,
    compose(middleware)
) as Store<IRootState>;

return store;
}