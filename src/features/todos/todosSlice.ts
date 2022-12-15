import { AnyAction, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../../store/store';
import { API_URL } from '../../utils/utils';
import axios from 'axios'
const initialState: { data: Todo[] } = {
    data: []
}
// TodoSlice
export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        loadTodos: (state, action: { type: string, payload: Todo[] }) => {
            state.data = action.payload;
        }
        ,
        addTodo: {
            reducer(state, action: { type: string, payload: Todo }) {

                state.data.push(action.payload);
            },
            prepare({ id, content }: { id: string, content: string, completed: boolean }) {
                return {
                    payload: {
                        id,
                        content: content,
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

export const fetchTodos = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async function fetchTodosThunk(dispatch, getState) {
        const response = await axios.get(`${API_URL}/todos`);
        const data = response.data;
        dispatch(loadTodos(data));
    }
}


export const { addTodo, toggleComplete, removeTodo, editTodo, loadTodos } = todosSlice.actions;

export default todosSlice.reducer;

export const getTodosList = (state: RootState) => state.todos.data;

// Todo Class interface

export interface Todo {
    id: string,
    content: string,
    completed: boolean
}
