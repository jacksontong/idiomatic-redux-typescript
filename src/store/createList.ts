import { Filter, TodosAction, ListByFilter, ToggleTodoSuccessAction } from "../types/todos"
import { FETCH_TODOS_REQUEST, FETCH_TODOS_FAIL, FETCH_TODOS_SUCCESS, ADD_TODO_SUCCESS, TOGGLE_TODO_SUCCESS } from "../constants"
import { combineReducers } from 'redux'

const createList = (filter: Filter) => {

    const handleToggle = (state: string[], action: ToggleTodoSuccessAction): string[] => {
        const id = action.response.result
        const { completed } = action.response.entities.todos[id]
        const shouldRemove = (
            (completed && filter === "active") ||
            (!completed && filter === "completed")
        )
        return shouldRemove ? state.filter(i => i !== id) : state
    }

    const ids = (state: string[] = [], action: TodosAction): string[] => {
        switch (action.type) {
            case ADD_TODO_SUCCESS:
                return filter !== "completed" ? [...state, action.response.result] : state
            case FETCH_TODOS_SUCCESS:
                return filter === action.filter ? action.response.result : state
            case TOGGLE_TODO_SUCCESS:
                return handleToggle(state, action)
            default:
                return state
        }
    }

    const isFetching = (state: boolean = false, action: TodosAction): boolean => {
        switch (action.type) {
            case FETCH_TODOS_REQUEST:
                return filter === action.filter ? true : state
            case FETCH_TODOS_FAIL:
            case FETCH_TODOS_SUCCESS:
                return filter === action.filter ? false : state
            default:
                return state
        }
    }

    const errorMessage = (state: string = '', action: TodosAction): string => {
        switch (action.type) {
            case FETCH_TODOS_FAIL:
                return filter === action.filter ? action.message : state
            case FETCH_TODOS_SUCCESS:
            case FETCH_TODOS_REQUEST:
                return filter === action.filter ? '' : state
            default:
                return state
        }
    }

    return combineReducers<ListByFilter, TodosAction>({
        ids,
        isFetching,
        errorMessage
    })
}

export default createList

export const getIsFetching = (state: ListByFilter) => state.isFetching

export const getIds = (state: ListByFilter) => state.ids

export const getErrorMessage = (state: ListByFilter) => state.errorMessage