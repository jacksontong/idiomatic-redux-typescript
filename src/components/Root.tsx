import React from 'react'
import AddTodo from '../containers/AddTodo';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';

const Root: React.FC = () => (
    <Provider store={configureStore()}>
        <div style={{ marginLeft: "300px" }}>
            <AddTodo />
        </div>
    </Provider>
)

export default Root