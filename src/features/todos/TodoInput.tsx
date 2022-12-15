import React, { useState } from 'react'
import { addTodo } from './todosSlice'
import { useDispatch } from 'react-redux'
import './TodoInput.scss'
import axios from 'axios'
import { API_URL } from '../../utils/utils'
const TodoInput = () => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const onChange = (inputValue: string) => {
        setTodo(inputValue);
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo) {
            const response = await axios.post(`${API_URL}/todos`, { content: todo, completed: false })
            const data = response.data;
            dispatch(addTodo(data));
            setTodo('');
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }
    return (
        <form onSubmit={onSubmit} className='todoInput'>
            <div className="formGroup">
                <input type="text" value={todo} onChange={(e) => { onChange(e.target.value) }} name='todo' placeholder='What to do ...?' />
                {!isValid && <p className='input-error'>Empty input field</p>}
            </div>
            <button type='submit'>Save</button>
        </form>
    )
}

export default TodoInput