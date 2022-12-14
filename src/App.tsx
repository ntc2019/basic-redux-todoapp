import TodoInput from "./features/todos/TodoInput"
import TodosList from "./features/todos/TodosList"
import './App.scss'
function App() {

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <TodoInput />
      <TodosList />
    </div>
  )
}

export default App
