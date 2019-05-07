import * as fromApi from "./api"
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, TOGGLE_TODO_REQUEST, TOGGLE_TODO_SUCCESS, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAIL } from "../constants"

export type Filter = "all" | "active" | "completed"

export type Todo = Readonly<fromApi.Todo>

export type Todos = Record<string, Todo>

export interface Entities {
    readonly entities: {
        readonly todos: Todos
    }
}

export interface TodoResponse extends Entities {
    readonly result: string
}

export interface TodosResponse extends Entities {
    readonly result: string[]
}

export interface AddTodoRequestAction {
    type: typeof ADD_TODO_REQUEST
    readonly text: string
}

export interface AddTodoSuccessAction {
    type: typeof ADD_TODO_SUCCESS
    readonly response: TodoResponse
}

export interface ToggleTodoRequestAction {
    type: typeof TOGGLE_TODO_REQUEST
    readonly id: string
}

export interface ToggleTodoSuccessAction {
    type: typeof TOGGLE_TODO_SUCCESS
    readonly response: TodoResponse
}

export interface FetchTodosRequestAction {
    type: typeof FETCH_TODOS_REQUEST
    readonly filter: Filter
}

export interface FetchTodosSuccessAction {
    type: typeof FETCH_TODOS_SUCCESS
    readonly response: TodosResponse
    readonly filter: Filter
}

export interface FetchTodosFailAction {
    type: typeof FETCH_TODOS_FAIL
    readonly message: string
    readonly filter: Filter
}

export interface ReduxInitAction {
    type: "@@INIT"
}

export type TodosAction =
    | AddTodoRequestAction
    | AddTodoSuccessAction
    | ToggleTodoRequestAction
    | ToggleTodoSuccessAction
    | FetchTodosRequestAction
    | FetchTodosSuccessAction
    | FetchTodosFailAction
    | ReduxInitAction

export interface ListByFilter {
    readonly ids: string[]
    readonly isFetching: boolean
    readonly errorMessage: string
}

export type ListByFilters = {
    [key in Filter]: ListByFilter
}

export interface TodosState {
    readonly byId: Todos
    readonly listByFilters: ListByFilters
}
