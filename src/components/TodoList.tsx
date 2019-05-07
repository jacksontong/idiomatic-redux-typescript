import React from 'react'
import * as Types from '../types/todos';
import Todo from './Todo';

type Props = {
    todos: Types.Todo[],
    onTodoClick: (id: string) => void
}

const TodoList: React.FC<Props> = ({
    todos,
    onTodoClick
}) => (
        <ul>
            {todos.map(t => <Todo key={t.id} onClick={() => onTodoClick(t.id)} {...t} />)}
        </ul>
    )

export default TodoList