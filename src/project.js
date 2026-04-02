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
  addNote(title, description, date, priority, notes, check) {
      this.project.push(new Note(title, description, new Date(date), priority, notes, check));
  }
  deleteNote(note) {
    this.project = this.project.filter(elem => elem !== note);
  }
  changeNote(element, title, description, date, priority, notes, check) {
    element.title = title;
    element.description = description;
    element.date = date;
    element.priority = priority;
    element.notes = notes;
    element.checklist = check;
  }
  showProject() {
    return this.project;
  }
  changeName(value) {
    return this.name = value;
  }
}

export { Database, Project }