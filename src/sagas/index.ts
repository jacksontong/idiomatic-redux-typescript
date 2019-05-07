import { takeEvery, all, fork, call, put } from 'redux-saga/effects'
import { ADD_TODO_REQUEST } from '../constants';
import { AddTodoRequestAction } from '../types/todos';
import * as fromApi from '../api'
import { normalize } from 'normalizr';
import * as schemas from '../schemas'
import { addTodoSuccess } from '../actions';

function* handleAddTodo({ text }: AddTodoRequestAction) {
    const response = yield call(fromApi.addTodo, text)
    const normalizedData = normalize(response, schemas.todo)
    yield put(addTodoSuccess(normalizedData))
}

function* watchAddTodo() {
    yield takeEvery(ADD_TODO_REQUEST, handleAddTodo)
}

export default function* rootSaga() {
    yield all([
        fork(watchAddTodo)
    ])
}