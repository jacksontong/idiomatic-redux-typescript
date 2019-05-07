import { TodoResponse, Filter, TodosResponse, AddTodoRequestAction, ToggleTodoRequestAction, FetchTodosRequestAction, FetchTodosSuccessAction, FetchTodosFailAction, ToggleTodoSuccessAction, AddTodoSuccessAction } from "../types/todos";
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, TOGGLE_TODO_REQUEST, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL, TOGGLE_TODO_SUCCESS } from "../constants";

export const addTodoRequest = (text: string): AddTodoRequestAction => ({
    type: ADD_TODO_REQUEST,
    text
})

export const addTodoSuccess = (response: TodoResponse): AddTodoSuccessAction => ({
    type: ADD_TODO_SUCCESS,
    response
})

export const toggleTodoRequest = (id: string): ToggleTodoRequestAction => ({
    type: TOGGLE_TODO_REQUEST,
    id
})

export const toggleTodoSuccess = (response: TodoResponse): ToggleTodoSuccessAction => ({
    type: TOGGLE_TODO_SUCCESS,
    response
})

export const fetchTodosRequest = (filter: Filter): FetchTodosRequestAction => ({
    type: FETCH_TODOS_REQUEST,
    filter
})

export const fetchTodosSuccess = (response: TodosResponse, filter: Filter): FetchTodosSuccessAction => ({
    type: FETCH_TODOS_SUCCESS,
    response,
    filter
})

export const fetchTodosFail = (message: string, filter: Filter): FetchTodosFailAction => ({
    type: FETCH_TODOS_FAIL,
    filter,
    message
})