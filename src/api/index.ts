import { v4 } from "node-uuid"
import { Database, Todo } from "../types/api"
import { Filter } from "../types/todos"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const fakeDatabase: Database = {
    todos: [{
        id: v4(),
        text: 'Vivamus suscipit tortor',
        completed: false
    }, {
        id: v4(),
        text: 'Praesent sapien massa',
        completed: true
    }, {
        id: v4(),
        text: 'Donec sollicitudin molestie malesuada.',
        completed: true
    }, {
        id: v4(),
        text: 'Nulla quis lorem ut libero malesuada feugiat.',
        completed: true
    }, {
        id: v4(),
        text: 'Nulla quis lorem ut libero malesuada feugiat.',
        completed: false
    }, {
        id: v4(),
        text: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.',
        completed: false
    }, {
        id: v4(),
        text: 'Vivamus suscipit tortor eget felis porttitor volutpat.',
        completed: true
    }, {
        id: v4(),
        text: 'Sed porttitor lectus nibh.',
        completed: false
    },]
}

export const addTodo = async (text: string) => {
    await delay(500)
    const todo: Todo = {
        id: v4(),
        text,
        completed: false
    }
    fakeDatabase.todos.push(todo)
    return todo
}

export const toggleTodo = async (id: string) => {
    await delay(500)
    const todo = fakeDatabase.todos.find(t => t.id === id)
    if (todo) {
        todo.completed = !todo.completed
        return todo
    }
    throw new Error("todo not found")
}

export const fetchTodos = async (filter: Filter) => {
    await delay(500)

    if (Math.random() * 5 < 1) {
        throw new Error("Internal server error.")
    }

    switch (filter) {
        case "all":
            return fakeDatabase.todos
        case "completed":
            return fakeDatabase.todos.filter(t => t.completed)
        case "active":
            return fakeDatabase.todos.filter(t => !t.completed)
        default:
            throw new Error(`Unknown filter ${filter}`)
    }
}