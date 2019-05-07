import reducers from './store'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { Middleware, createStore, applyMiddleware } from 'redux';
import rootSaga from './sagas';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware()
    const middlewares: Middleware[] = [sagaMiddleware]

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(logger);
    }

    const store = createStore(
        reducers,
        applyMiddleware(...middlewares)
    )
    sagaMiddleware.run(rootSaga)

    return store
}

export default configureStore