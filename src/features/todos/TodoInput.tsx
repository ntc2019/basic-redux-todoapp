import React, { useState } from 'react'
import { addTodo } from './todosSlice'
import { useDispatch } from 'react-redux'
import './TodoInput.scss'
const TodoInput = () => {
    const dispatch = useDispatch();
    const [todo, setTodo] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);

    const onChange = (inputValue: string) => {
        setTodo(inputValue);
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo) {
            dispatch(addTodo(todo));
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