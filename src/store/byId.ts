import { Todos, TodosAction } from "../types/todos"
import { FETCH_TODOS_SUCCESS, ADD_TODO_SUCCESS, TOGGLE_TODO_SUCCESS } from "../constants"

const initialState: Todos = {}

const byId = (
    state = initialState,
    action: TodosAction
): Todos => {
    switch (action.type) {
        case FETCH_TODOS_SUCCESS:
        case ADD_TODO_SUCCESS:
        case TOGGLE_TODO_SUCCESS:
            return {
                ...state,
                ...action.response.entities.todos
            }
        default:
            return state
    }
}

export default byId

export const getTodo = (state: Todos, id: string) => state[id]