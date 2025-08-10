import './App.css'
import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import Listing from './components/Listing'
import ProjectDetails from './components/ProjectDetails'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Listing />}></Route>
        <Route path="/tasklist" element={<Listing />}></Route>
        <Route path="/taskform" element={<TaskForm />}></Route>
        <Route path="/projectdetails/:id" element={<ProjectDetails />}></Route>
      </Routes>
    </div>
  )
}

export default App
