import { Note } from "./note.js";
class Database {
  constructor() {
    this.projects = [];
  }
  addProject(project) {
    this.projects.push(project);
  }
  deleteProject(project) {
    this.projects = this.projects.filter(elem => elem !== project);
  }
  showProjects() {
    return this.projects
  }
}

class Project {
  constructor(name) {
    this.project = [];
    this.name = name;
  }
  addNote(note) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('dueDate').value;
    const priority = document.getElementById('MySelect').value;
    const notes = document.getElementById('notes').value;
    const check = document.getElementById('checklist').checked;
    if (!note) {
      this.project.push(new Note(title, description, new Date(date), priority, notes, done));
    } else {
      note.title = title;
      note.description = description;
      note.date = date;
      note.priority = priority;
      note.notes = notes;
      note.checklist = check;
    }
  }
  deleteNote(note) {
    this.project = this.project.filter(elem => elem !== note);
  }

  showProject() {
    return this.project
  }
  set name(value) {
    this.name = value;
  }
}

export { Database, Project }