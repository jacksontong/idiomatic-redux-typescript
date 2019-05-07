import { combineReducers } from "redux";
import { TodosState, TodosAction, Filter, Todo, Todos, ListByFilter, ListByFilters } from "../types/todos";
import byId, * as fromById from "./byId";
import createList, * as fromCreateList from "./createList";
import { createSelector } from "reselect";

export default combineReducers<TodosState, TodosAction>({
    byId,
    listByFilters: combineReducers({
        all: createList("all"),
        active: createList("active"),
        completed: createList("completed")
    })
})

const getListByFilter = createSelector(
    [
        ({ listByFilters }: TodosState) => listByFilters,
        (_: TodosState, filter: Filter) => filter
    ],
    (listByFilters, filter) => listByFilters[filter]
)

const getIds = createSelector(
    [
        getListByFilter
    ],
    (listByFilter) => fromCreateList.getIds(listByFilter)
)

export const getErrorMessage = createSelector(
    [
        getListByFilter
    ],
    (listByFilter) => fromCreateList.getErrorMessage(listByFilter)
)

export const getIsFetching = createSelector(
    [
        getListByFilter
    ],
    (listByFilter) => fromCreateList.getIsFetching(listByFilter)
)

export const getVisibleTodosList = createSelector(
    [
        ({ byId }: TodosState) => byId,
        getIds
    ],
    (byId, ids) => ids.map(id => fromById.getTodo(byId, id))
)