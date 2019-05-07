import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Filter, TodosState, Todo, TodosAction } from '../types/todos';
import TodoList from '../components/TodoList';
import { getVisibleTodosList, getIsFetching } from '../store';
import { toggleTodoRequest, fetchTodosRequest } from '../actions';

type PathParams = {
    filter: Filter
}

type Props = RouteComponentProps<PathParams> & {
    todos: Todo[],
    filter: Filter,
    isFetching: boolean,
    onTodoClick: (id: string) => TodosAction,
    fetchTodos: (filter: Filter) => TodosAction
}

class VisibleTodoList extends Component<Props> {

    fetchData() {
        const { fetchTodos, filter } = this.props
        fetchTodos(filter)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData()
        }
    }

    render() {
        const { todos, onTodoClick, isFetching } = this.props

        if (isFetching && !todos.length) {
            return <p>loading...</p>
        }

        return (
            <div>
                <TodoList
                    todos={todos}
                    onTodoClick={onTodoClick}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: TodosState, { match }: Props) => {
    const filter = match.params.filter || "all"
    return {
        todos: getVisibleTodosList(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
}

const mapDispatchToProps = {
    onTodoClick: toggleTodoRequest,
    fetchTodos: fetchTodosRequest
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList))