import createList from "../createList";
import { fetchTodosFail, fetchTodosRequest, fetchTodosSuccess, addTodoSuccess, toggleTodoSuccess } from "../../actions";
import { TodosResponse, TodoResponse } from "../../types/todos";

describe("createList reducer", () => {
    it("should handle initial state", () => {
        const reducer = createList("all")
        expect(reducer(undefined, { type: "@@INIT" })).toEqual({
            ids: [],
            errorMessage: "",
            isFetching: false
        })
    })

    it("should handle FETCH_TODOS_REQUEST", () => {
        const reducer = createList("all")
        expect(reducer(undefined, fetchTodosRequest("all"))).toEqual({
            ids: [],
            errorMessage: "",
            isFetching: true
        })

        expect(
            reducer({
                ids: [],
                isFetching: false,
                errorMessage: "error"
            }, fetchTodosRequest("all"))
        ).toEqual({
            ids: [],
            isFetching: true,
            errorMessage: ""
        })

        expect(
            reducer({
                ids: [],
                isFetching: true,
                errorMessage: "error"
            }, fetchTodosRequest("active"))
        ).toEqual({
            ids: [],
            isFetching: true,
            errorMessage: "error"
        })
    })

    it("should handle FETCH_TODOS_SUCCESS", () => {
        const reducer = createList("all")
        const response: TodosResponse = {
            entities: {
                todos: {
                    1: {
                        id: '1',
                        text: "1",
                        completed: false
                    }
                }
            },
            result: ['1']
        }
        expect(reducer(undefined, fetchTodosSuccess(response, "all"))).toEqual({
            ids: ['1'],
            isFetching: false,
            errorMessage: ""
        })

        expect(
            reducer({
                ids: ['2', '3', '4'],
                isFetching: true,
                errorMessage: 'error'
            }, fetchTodosSuccess(response, "all"))
        ).toEqual({
            ids: ['1'],
            isFetching: false,
            errorMessage: ""
        })

        expect(
            reducer({
                ids: ['2', '3', '4'],
                isFetching: true,
                errorMessage: 'error'
            }, fetchTodosSuccess(response, "completed"))
        ).toEqual({
            ids: ['2', '3', '4'],
            isFetching: true,
            errorMessage: 'error'
        })
    })

    it("should handle FETCH_TODOS_FAIL", () => {
        const reducer = createList("all")
        expect(reducer(undefined, fetchTodosFail("error", "all"))).toEqual({
            ids: [],
            errorMessage: "error",
            isFetching: false
        })

        expect(
            reducer({
                ids: ['1', '2', '3'],
                isFetching: true,
                errorMessage: ""
            }, fetchTodosFail("error", "all"))
        ).toEqual({
            ids: ['1', '2', '3'],
            errorMessage: "error",
            isFetching: false
        })

        expect(
            reducer({
                ids: ['1', '2', '3'],
                isFetching: true,
                errorMessage: ""
            }, fetchTodosFail("error", "completed"))
        ).toEqual({
            ids: ['1', '2', '3'],
            isFetching: true,
            errorMessage: ""
        })
    })

    it("should handle ADD_TODO_SUCCESS", () => {
        const reducer = createList("all")
        const response: TodoResponse = {
            entities: {
                todos: {
                    1: {
                        id: '1',
                        text: "1",
                        completed: false
                    }
                }
            },
            result: '1'
        }
        expect(reducer(undefined, addTodoSuccess(response))).toEqual({
            ids: ['1'],
            errorMessage: "",
            isFetching: false
        })

        expect(
            reducer({
                ids: ['2'],
                errorMessage: "",
                isFetching: false
            }, addTodoSuccess(response))
        ).toEqual({
            ids: ['2', '1'],
            errorMessage: "",
            isFetching: false
        })

        const completedReducer = createList("completed")
        expect(
            completedReducer({
                ids: ['2'],
                errorMessage: "",
                isFetching: false
            }, addTodoSuccess(response))
        ).toEqual({
            ids: ['2'],
            errorMessage: "",
            isFetching: false
        })
    })

    it("should handle TOGGLE_TODO_SUCCESS", () => {
        let reducer = createList("all")
        const response = {
            entities: {
                todos: {
                    1: {
                        id: '1',
                        text: "1",
                        completed: false
                    }
                }
            },
            result: '1'
        }

        expect(
            reducer({
                ids: ['1'],
                errorMessage: "",
                isFetching: false
            }, toggleTodoSuccess(response))
        ).toEqual({
            ids: ['1'],
            errorMessage: "",
            isFetching: false
        })

        reducer = createList("completed")
        expect(
            reducer({
                ids: ['1'],
                errorMessage: "",
                isFetching: false
            }, toggleTodoSuccess(response))
        ).toEqual({
            ids: [],
            errorMessage: "",
            isFetching: false
        })

        reducer = createList("active")
        expect(
            reducer({
                ids: ['1'],
                errorMessage: "",
                isFetching: false
            }, toggleTodoSuccess(response))
        ).toEqual({
            ids: ['1'],
            errorMessage: "",
            isFetching: false
        })
    })
})

export { }