import { combineReducers } from "redux";
import { TodosState, TodosAction, Filter } from "../types/todos";
import byId, * as fromById from "./byId";
import createList, * as fromCreateList from "./createList";

export default combineReducers<TodosState, TodosAction>({
    byId,
    listByFilters: combineReducers({
        all: createList("all"),
        active: createList("active"),
        completed: createList("completed")
    })
})

export const getErrorMessage = ({ listByFilters }: TodosState, filter: Filter) => fromCreateList.getErrorMessage(listByFilters[filter])

export const getIsFetching = ({ listByFilters }: TodosState, filter: Filter) => fromCreateList.getIsFetching(listByFilters[filter])

export const getVisibleTodosList = ({ byId, listByFilters }: TodosState, filter: Filter) => {
    const ids = fromCreateList.getIds(listByFilters[filter])
    return ids.map(id => fromById.getTodo(byId, id))
}