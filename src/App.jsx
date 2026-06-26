/* eslint-disable no-unused-vars */
import { useState } from "react"

import Sidebar from "./components/Sidebar"

function App() {
  const standartNote = {
    title: "Your first note",
    description: "Check to complete",
    dueDate: new Date(),
    priority: "low",
    notes: "Three Notes Walk Into a Bar... C, E-flat and G.",
    checklist: false,
    id: crypto.randomUUID()
  }

  const [projects, setProjects] = useState([{name: "project-1", id: crypto.randomUUID(), notes: [standartNote]}])

  const createProject = (event) => {
    // re - set
    const { value } = event.current.target
    setProjects(prevProjects => ({...prevProjects, value: standartNote}))
  }
  
  const renameProject = () => {

  }

  const deleteProject = () => {

  }

  const createNote = () => {

  }

  const deleteNote = () => {

  }

  const editNote = () => {

  }

  const submitNote = () => {

  }

  const checkToggle = () => {
    // Find project and note
    // Correct !this.checklist
    setProjects(prevNote => ({...prevNote, checklist: !this.checklist}))
  }

  return (
    <>
      <Navigation tabs={[{ name: "Project-1",id: 1},{ name: "Project-2", id: 2}]}/>
    </>
  )
}

export default App
