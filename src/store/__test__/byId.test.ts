import byId from "../byId";
import { addTodoSuccess, fetchTodosSuccess, toggleTodoSuccess } from "../../actions";
import { TodoResponse, TodosResponse } from "../../types/todos";

describe("byId reducer", () => {
    it("should handle initial state", () => {
        expect(byId(undefined, { type: '@@INIT' })).toEqual({})
    })

    it('should handle ADD_TODO_SUCCESS', () => {
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
        expect(byId(undefined, addTodoSuccess(response))).toEqual({
            1: {
                id: '1',
                text: "1",
                completed: false
            }
        })

        expect(
            byId({
                2: {
                    id: "2",
                    text: "2",
                    completed: true
                }
            }, addTodoSuccess(response))
        ).toEqual({
            1: {
                id: '1',
                text: "1",
                completed: false
            },
            2: {
                id: "2",
                text: "2",
                completed: true
            }
        })
    })

    it('should handle FETCH_TODOS_SUCCESS', () => {
        const response: TodosResponse = {
            entities: {
                todos: {
                    1: {
                        id: '1',
                        text: "1",
                        completed: false
                    },
                    2: {
                        id: "2",
                        text: "2",
                        completed: true
                    }
                }
            },
            result: ['1', '2']
        }
        expect(byId(undefined, fetchTodosSuccess(response, "all"))).toEqual({
            1: {
                id: '1',
                text: "1",
                completed: false
            },
            2: {
                id: "2",
                text: "2",
                completed: true
            }
        })

        expect(
            byId({
                3: {
                    id: '3',
                    text: "3",
                    completed: false
                },
            }, fetchTodosSuccess(response, "all"))
        ).toEqual({
            1: {
                id: '1',
                text: "1",
                completed: false
            },
            2: {
                id: "2",
                text: "2",
                completed: true
            },
            3: {
                id: '3',
                text: "3",
                completed: false
            }
        })
    })

    it('should handle TOGGLE_TODO_SUCCESS', () => {
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

        expect(
            byId({
                1: {
                    id: '1',
                    text: "1",
                    completed: true
                }
            }, toggleTodoSuccess(response))
        ).toEqual({
            1: {
                id: '1',
                text: "1",
                completed: false
            }
        })
    })
})

export { } //https://github.com/Microsoft/TypeScript/issues/15230