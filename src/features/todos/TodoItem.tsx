import React, { useEffect, useState } from 'react'
import { Todo } from './todosSlice'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { toggleComplete, removeTodo, editTodo } from './todosSlice'
import './TodoItem.scss'
import axios from 'axios'
import { API_URL } from '../../utils/utils'
type TodoItemProps = {
    todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(todo.content);

    const completed = todo.completed;

    const onToggleComplete = async () => {
        const response = await axios.put(`${API_URL}/todos/${todo.id}`, { completed: !todo.completed })
        dispatch(toggleComplete(todo.id))
    }

    useEffect(() => {
        setIsEditing(false);
    }, [])

    const onEdit = async () => {
        if (!isEditing) {
            setIsEditing(true);
        } else {
            const response = await axios.put(`${API_URL}/todos/${todo.id}`, { content: editingValue })
            const data = response.data;
            if (editingValue) {
                dispatch(editTodo({ id: data.id, content: data.content }))
            } else {
                setEditingValue(todo.content)
            }
            setIsEditing(false)
        }
    }

    const onDelete = async () => {
        const response = await axios.delete(`${API_URL}/todos/${todo.id}`);
        console.log(response);
        const data = response.data;
        dispatch(removeTodo(data.id));
    }
    return (
        <div className='todoItem'>
            <input className='complete' type="checkbox" checked={completed} onChange={onToggleComplete} />
            <input className='todoContent' disabled={!isEditing} value={editingValue} onChange={(e) => { setEditingValue(e.target.value) }} />
            <button className='edit' onClick={onEdit}><AiFillEdit />Edit</button>
            <button className='delete' onClick={onDelete}><AiFillDelete />Delete</button>
        </div>
    )
}

export default TodoItem