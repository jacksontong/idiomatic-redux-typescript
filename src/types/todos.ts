export const enum TodosActionTypes {
    ADD_TODO_REQUEST = '@@todos/ADD_REQUEST',
    ADD_TODO_SUCCESS = '@@todos/ADD_TODO_SUCCESS',
    TOGGLE_TODO_REQUEST = '@@todos/TOGGLE_TODO_REQUEST',
    TOGGLE_TODO_SUCCESS = '@@todos/TOGGLE_TODO_SUCCESS',
    FETCH_TODOS_REQUEST = '@@todos/FETCH_TODOS_REQUEST',
    FETCH_TODOS_SUCCESS = '@@todos/FETCH_TODOS_SUCCESS',
    FETCHT_TODOS_FAIL = '@@todos/FETCHT_TODOS_FAIL',
}

export type Filter = "all" | "active" | "completed"