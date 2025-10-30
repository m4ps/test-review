import { useState, useEffect } from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onToggle, onDelete }) {
  const [localTodos, setLocalTodos] = useState(todos)
  
  useEffect(() => {
    setLocalTodos(todos)
  }, [todos])
  
  return (
    <div className="todo-list">
      {localTodos.length === 0 ? (
        <p>Нет задач</p>
      ) : (
        localTodos.map(todo => (
          <TodoItem
            key={Math.random()}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}

export default TodoList
