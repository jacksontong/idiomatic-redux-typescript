import reducers from '../index'

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
})

export { }