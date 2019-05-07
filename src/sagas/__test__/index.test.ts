import { handleAddTodo, handleToggleTodo, handleFetchTodos } from "..";
import { addTodoRequest, addTodoSuccess, toggleTodoRequest, toggleTodoSuccess, fetchTodosRequest, fetchTodosSuccess, fetchTodosFail } from "../../actions";
import * as api from '../../api'
import { call, put } from "redux-saga/effects";
import { normalize } from "normalizr";
import * as schemas from '../../schemas'

describe("sagas", () => {
    it("handleAddTodo Saga test", () => {
        const action = addTodoRequest("todo1")
        const generator = handleAddTodo(action)

        let next = generator.next()
        expect(next.value).toEqual(call(api.addTodo, "todo1"))

        const response = {
            id: '1',
            text: 'todo1',
            completed: false
        }
        const normalizedData = normalize(response, schemas.todo)
        next = generator.next(response)
        expect(next.value).toEqual(put(addTodoSuccess(normalizedData)))

        next = generator.next()
        expect(next.value).toEqual(undefined)
        expect(next.done).toBeTruthy()
    })

    it("handleToggleTodo Saga test", () => {
        const action = toggleTodoRequest("2")
        const generator = handleToggleTodo(action)

        let next = generator.next()
        expect(next.value).toEqual(call(api.toggleTodo, "2"))

        const response = {
            id: '2',
            text: 'todo2',
            completed: false
        }
        const normalizedData = normalize(response, schemas.todo)
        next = generator.next(response)
        expect(next.value).toEqual(put(toggleTodoSuccess(normalizedData)))

        next = generator.next()
        expect(next.value).toEqual(undefined)
        expect(next.done).toBeTruthy()
    })

    it("handleFetchTodos Saga test", () => {
        const action = fetchTodosRequest("all")
        const generator = handleFetchTodos(action)

        let next = generator.next()
        expect(next.value).toEqual(call(api.fetchTodos, "all"))

        const response = [{
            id: '2',
            text: 'todo2',
            completed: false
        }]
        const normalizedData = normalize(response, schemas.todos)
        next = generator.next(response)
        expect(next.value).toEqual(put(fetchTodosSuccess(normalizedData, "all")))

        if (generator.throw) {
            expect(generator.throw(new Error("error")).value).toEqual(put(fetchTodosFail("error", "all")))
        }

        next = generator.next()
        expect(next.value).toEqual(undefined)
        expect(next.done).toBeTruthy()
    })
})

export { }