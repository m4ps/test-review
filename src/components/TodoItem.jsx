import { useState, useEffect, useMemo, useCallback } from 'react'

function TodoItem({ todo, onToggle, onDelete }) {
  const [text, setText] = useState(todo.text)
  const [completed, setCompleted] = useState(todo.completed)
  const [priority, setPriority] = useState(todo.priority)
  
  useEffect(() => {
    setText(todo.text)
    setCompleted(todo.completed)
    setPriority(todo.priority)
  }, [todo])
  
  const priorityColor = useMemo(() => {
    if (priority === 'high') return 'red'
    if (priority === 'medium') return 'orange'
    return 'green'
  }, [priority])
  
  const handleToggle = useCallback(() => {
    onToggle(todo.id)
  }, [todo.id, onToggle])
  

  const highlightTask = () => {
    const element = document.getElementById(`todo-${todo.id}`)
    if (element) {
      element.style.border = '2px solid yellow'
      setTimeout(() => {
        element.style.border = ''
      }, 1000)
    }
  }

  return (
    <div 
      id={`todo-${todo.id}`}
      className={`todo-item ${completed ? 'completed' : ''}`}
      style={{ borderLeft: `4px solid ${priorityColor}` }}
      onMouseEnter={() => highlightTask()}
    >
      <input 
        type="checkbox" 
        checked={completed}
        onChange={() => handleToggle()}
      />
      <span className="todo-text">{text}</span>
      <span className="todo-priority">({priority})</span>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </div>
  )
}

export default TodoItem
