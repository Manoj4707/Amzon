git add src/App.jsximport './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App


