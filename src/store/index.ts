import { combineReducers } from "redux";
import { TodosState, TodosAction, Filter, Todo, Todos, ListByFilter } from "../types/todos";
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

export const getErrorMessage = createSelector(
    [
        ({ listByFilters }: TodosState, filter: Filter) => listByFilters[filter]
    ],
    (listByFilter: ListByFilter) => fromCreateList.getErrorMessage(listByFilter)
)

export const getIsFetching = createSelector(
    [
        ({ listByFilters }: TodosState, filter: Filter) => listByFilters[filter]
    ],
    (listByFilter: ListByFilter) => fromCreateList.getIsFetching(listByFilter)
)

export const getVisibleTodosList = createSelector(
    [
        ({ byId }: TodosState) => byId,
        ({ listByFilters }: TodosState, filter: Filter) => fromCreateList.getIds(listByFilters[filter])
    ],
    (byId: Todos, ids: string[]) => ids.map(id => fromById.getTodo(byId, id))
)