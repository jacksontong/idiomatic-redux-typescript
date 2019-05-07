import React from 'react'
import AddTodo from '../containers/AddTodo';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import { BrowserRouter as Router, Route } from "react-router-dom"
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const Root: React.FC = () => (
    <Provider store={configureStore()}>
        <div style={{ marginLeft: "300px" }}>
            <AddTodo />
            <Router>
                <Route path="/:filter?" component={VisibleTodoList} />
                <Footer />
            </Router>
        </div>
    </Provider>
)

export default Root