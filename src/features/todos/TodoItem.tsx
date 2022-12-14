import React, { useEffect, useState } from 'react'
import { Todo } from './todosSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toggleComplete, removeTodo, editTodo } from './todosSlice'
import './TodoItem.scss'
type TodoItemProps = {
    todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(todo.content);

    const completed = todo.completed;

    const onToggleComplete = () => {
        dispatch(toggleComplete(todo.id))
    }
    useEffect(() => {
        setIsEditing(false);
    }, [])
    const onEdit = () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            if (editingValue) {
                dispatch(editTodo({ id: todo.id, content: editingValue }))
            } else {
                setEditingValue(todo.content)
            }
            setIsEditing(false)
        }
    }
    const onDelete = () => {
        dispatch(removeTodo(todo.id))
    }
    return (
        <div className='todoItem'>
            <input className='complete' type="checkbox" checked={completed} onChange={onToggleComplete} />
            {isEditing
                ? <input className='todoItemEdit' value={editingValue} onChange={(e) => { setEditingValue(e.target.value) }} />
                : <span className='todoItemContent'>{todo.content}</span>
            }

            <button className='edit' onClick={onEdit}><AiFillEdit />Edit</button>
            <button className='delete' onClick={onDelete}><AiFillDelete />Delete</button>

        </div>
    )
}

export default TodoItem