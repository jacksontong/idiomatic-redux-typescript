import reducers, { getErrorMessage, getIsFetching, getVisibleTodosList } from '../index'

describe("root reducer", () => {
    it("should combine all reducers", () => {
        expect(reducers(undefined, { type: "@@INIT" })).toEqual({
            byId: {},
            listByFilters: {
                all: {
                    errorMessage: "",
                    ids: [],
                    isFetching: false
                },
                active: {
                    errorMessage: "",
                    ids: [],
                    isFetching: false
                },
                completed: {
                    errorMessage: "",
                    ids: [],
                    isFetching: false
                }
            }
        })
    })

    it("getErrorMessage selector", () => {
        const state = {
            byId: {},
            listByFilters: {
                all: {
                    errorMessage: "",
                    ids: [],
                    isFetching: false
                },
                active: {
                    errorMessage: "error",
                    ids: [],
                    isFetching: false
                },
                completed: {
                    errorMessage: "",
                    ids: [],
                    isFetching: false
                }
            }
        }

        expect(getErrorMessage(state, "active")).toEqual("error")
        expect(getErrorMessage(state, "all")).toEqual("")
        expect(getErrorMessage(state, "completed")).toEqual("")
    })

    it("getIsFetching selector", () => {
        const state = {
            byId: {},
            listByFilters: {
                all: {
                    errorMessage: "",
                    ids: [],
                    isFetching: true
                },
                active: {
                    errorMessage: "error",
                    ids: [],
                    isFetching: false
                },
                completed: {
                    errorMessage: "",
                    ids: [],
                    isFetching: false
                }
            }
        }

        expect(getIsFetching(state, "active")).toBeFalsy()
        expect(getIsFetching(state, "all")).toBeTruthy()
        expect(getIsFetching(state, "completed")).toBeFalsy()
    })

    it("getVisibleTodosList selector", () => {
        const state = {
            byId: {
                1: {
                    id: '1',
                    text: '1',
                    completed: true
                },
                2: {
                    id: '2',
                    text: '2',
                    completed: true
                },
                3: {
                    id: '3',
                    text: '3',
                    completed: false
                },
                4: {
                    id: '4',
                    text: '4',
                    completed: true
                },
                5: {
                    id: '5',
                    text: '5',
                    completed: false
                },
            },
            listByFilters: {
                all: {
                    errorMessage: "",
                    ids: ['1', '2', '3', '4', '5'],
                    isFetching: true
                },
                active: {
                    errorMessage: "error",
                    ids: ['3', '5'],
                    isFetching: false
                },
                completed: {
                    errorMessage: "",
                    ids: ['1', '2', '4'],
                    isFetching: false
                }
            }
        }

        expect(getVisibleTodosList(state, "all")).toEqual([
            {
                id: '1',
                text: '1',
                completed: true
            },
            {
                id: '2',
                text: '2',
                completed: true
            },
            {
                id: '3',
                text: '3',
                completed: false
            },
            {
                id: '4',
                text: '4',
                completed: true
            },
            {
                id: '5',
                text: '5',
                completed: false
            },
        ])

        expect(getVisibleTodosList(state, "active")).toEqual([
            {
                id: '3',
                text: '3',
                completed: false
            },
            {
                id: '5',
                text: '5',
                completed: false
            },
        ])

        expect(getVisibleTodosList(state, "completed")).toEqual([
            {
                id: '1',
                text: '1',
                completed: true
            },
            {
                id: '2',
                text: '2',
                completed: true
            },
            {
                id: '4',
                text: '4',
                completed: true
            },
        ])
    })
})

export { }