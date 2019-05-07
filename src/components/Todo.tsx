import React from 'react'

type Props = {
    text: string,
    completed: boolean,
    onClick: () => void
}

const Todo: React.FC<Props> = ({
    text,
    completed,
    onClick
}) => (
        <li
            onClick={onClick}
            style={{ textDecoration: completed ? "line-through" : "none" }}
        >
            {text}
        </li>
    )

export default Todo