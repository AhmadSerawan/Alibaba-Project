import { useState } from 'react'  
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageLayout from './Layouts/PageLayout.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PageLayout/>
    </>
  )
}

export default App
