import TodoInput from "./features/todos/TodoInput"
import TodosList from "./features/todos/TodosList"
import './App.scss'
import { useState, useEffect } from 'react'
import { fetchTodos } from './features/todos/todosSlice'
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store"

function App() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(fetchTodos());
    setIsLoading(false);
  }, [])

  return (
    <div className="App">
      <h1>TODO APP</h1>
      {isLoading
        ? <p>Loading ...</p>
        : <>
          <TodoInput />
          <TodosList />
        </>}
    </div>
  )
}

export default App
