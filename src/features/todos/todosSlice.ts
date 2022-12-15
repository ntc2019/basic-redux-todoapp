import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store';

const initialState: { data: Todo[] } = {
    data: []
}
// TodoSlice
export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer(state, action: { type: string, payload: Todo }) {

                state.data.push(action.payload);
            },
            prepare(todoContent: string) {
                return {
                    payload: {
                        id: uuidv4(),
                        content: todoContent,
                        completed: false
                    }
                }
            }
        },

        toggleComplete: (state, action: { type: string, payload: string }) => {
            const item = state.data.find(todo => todo.id === action.payload);
            if (item) {
                item.completed = !item.completed;
            }
        },

        removeTodo: (state, action: { type: string, payload: string }) => {
            state.data = state.data.filter(todo => todo.id !== action.payload);
        },

        editTodo: (state, action: { type: string, payload: { id: string, content: string } }) => {
            const item = state.data.find(todo => todo.id === action.payload.id);
            if (item) {
                item.content = action.payload.content;
            }
        }
    }
})



export const { addTodo, toggleComplete, removeTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;

export const getTodosList = (state: RootState) => state.todos.data;

// Todo Class interface

export interface Todo {
    id: string,
    content: string,
    completed: boolean
}
