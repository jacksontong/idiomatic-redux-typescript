import React from "react";
import { connect } from 'react-redux'
import { Dispatch } from "redux";
import { addTodoRequest } from "../actions";

type Props = {
    dispatch: Dispatch
}

const AddTodo: React.FC<Props> = ({
    dispatch
}) => {
    let input: HTMLInputElement
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(addTodoRequest(input.value))
                input.value = ''
            }}
        >
            <input type="text" ref={node => node ? input = node : null} />
            <button type="submit">+</button>
        </form>
    )
}

export default connect()(AddTodo)