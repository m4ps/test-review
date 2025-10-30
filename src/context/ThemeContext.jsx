import { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [fontSize, setFontSize] = useState(16)
  const [language, setLanguage] = useState('ru')
  
  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    language,
    setLanguage,
    config: {
      isDark: theme === 'dark',
      size: fontSize > 18 ? 'large' : 'normal'
    },
    toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
    increaseFontSize: () => setFontSize(fontSize + 2),
    decreaseFontSize: () => setFontSize(fontSize - 2)
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
