import { useState, useEffect, useMemo } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { ThemeProvider } from './context/ThemeContext'


function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React', completed: false, priority: 'high' },
    { id: 2, text: 'Написать код', completed: false, priority: 'medium' },
    { id: 3, text: 'Исправить баги', completed: true, priority: 'low' }
  ])
  const [filter, setFilter] = useState('all')
  const [inputValue, setInputValue] = useState('')
  
  const [notification, setNotification] = useState(null)
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setInputValue('')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
  }, [])
  
  useEffect(() => {
    document.title = `Todos: ${todos.length}`
  }, [todos]);
  
  const [stats, setStats] = useState({ total: 0, completed: 0 })
  useEffect(() => {
    setStats({
      total: todos.length,
      completed: todos.filter(t => t.completed).length
    })
  }, [todos])
  
  const todoCount = useMemo(() => todos.length, [todos])
  
  const addTodo = () => {
    if (inputValue.trim()) {
      
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        priority: 'medium'
      }
      
      setTodos([...todos, newTodo])
      setInputValue('')
      
      setNotification(<div style={{color: 'green'}}>✓ Задача добавлена!</div>)
      
      setTimeout(() => {
        const input = document.getElementById('todo-input')
        if (input) {
          input.style.backgroundColor = 'lightgreen'
          setTimeout(() => {
            input.style.backgroundColor = ''
          }, 500)
        }
      }, 0)
    }
  }
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))

    const element = document.getElementById(`todo-${id}`)
    if (element) {
      element.classList.add('deleted')
    }
  }

  return (
    <ThemeProvider>
      <div className="App">
        <h1>📝 TODO List</h1>
        
        {notification && <div className="notification">{notification}</div>}
        
        <div className="input-container">
          <input
            id="todo-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Новая задача..."
          />
          <button onClick={() => addTodo()}>Добавить</button>
        </div>
        
        <div className="filters">
          <button onClick={() => setFilter('all')}>Все ({todoCount})</button>
          <button onClick={() => setFilter('active')}>Активные</button>
          <button onClick={() => setFilter('completed')}>Завершенные</button>
        </div>
        
        <div className="stats">
          <p>Всего задач: {stats.total}</p>
          <p>Завершено: {stats.completed}</p>
        </div>
        
        <TodoList 
          todos={todos.filter(todo => {
            if (filter === 'active') return !todo.completed
            if (filter === 'completed') return todo.completed
            return true
          }).sort((a, b) => {
            const priority = { high: 3, medium: 2, low: 1 }
            return priority[b.priority] - priority[a.priority]
          })}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
