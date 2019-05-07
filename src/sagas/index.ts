import { takeEvery, all, fork, call, put } from 'redux-saga/effects'
import { ADD_TODO_REQUEST, FETCH_TODOS_REQUEST, TOGGLE_TODO_REQUEST } from '../constants';
import { AddTodoRequestAction, FetchTodosRequestAction, ToggleTodoRequestAction } from '../types/todos';
import * as fromApi from '../api'
import { normalize } from 'normalizr';
import * as schemas from '../schemas'
import { addTodoSuccess, fetchTodosSuccess, toggleTodoSuccess, fetchTodosFail } from '../actions';

export function* handleAddTodo({ text }: AddTodoRequestAction) {
    const response = yield call(fromApi.addTodo, text)
    const normalizedData = normalize(response, schemas.todo)
    yield put(addTodoSuccess(normalizedData))
}

function* watchAddTodo() {
    yield takeEvery(ADD_TODO_REQUEST, handleAddTodo)
}

export function* handleToggleTodo({ id }: ToggleTodoRequestAction) {
    const response = yield call(fromApi.toggleTodo, id)
    const normalizedData = normalize(response, schemas.todo)
    yield put(toggleTodoSuccess(normalizedData))
}

function* watchToggleTodo() {
    yield takeEvery(TOGGLE_TODO_REQUEST, handleToggleTodo)
}

export function* handleFetchTodos({ filter }: FetchTodosRequestAction) {
    try {
        const response = yield call(fromApi.fetchTodos, filter)
        const normalizedData = normalize(response, schemas.todos)
        yield put(fetchTodosSuccess(normalizedData, filter))
    } catch (error) {
        yield put(fetchTodosFail(error.message, filter))
    }
}

function* watchFetchTodos() {
    yield takeEvery(FETCH_TODOS_REQUEST, handleFetchTodos)
}

export default function* rootSaga() {
    yield all([
        fork(watchAddTodo),
        fork(watchFetchTodos),
        fork(watchToggleTodo)
    ])
}