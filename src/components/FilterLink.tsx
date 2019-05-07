import React from 'react'
import { Filter } from '../types/todos';
import { NavLink } from 'react-router-dom';

type Props = {
    filter: Filter
}

const FilterLink: React.FC<Props> = ({
    filter,
    children
}) => (
        <NavLink
            to={`/${filter === "all" ? "" : filter}`}
            exact
            activeStyle={{ textDecoration: "none" }}
        >
            {children}
        </NavLink>
    )

export default FilterLink