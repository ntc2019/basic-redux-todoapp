import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from './TodoItem';
import { getTodosList } from './todosSlice'
const TodosList = () => {
    const todos = useSelector(getTodosList);
    const dispatch = useDispatch();
    const renderedTodoItems = todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
    ))
    return (
        <>
            {renderedTodoItems}
        </>
    )
}

export default TodosList