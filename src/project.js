import { Note } from "./note.js";
class Database {
  constructor() {
    this.projects = [];
  }
  addProject(name, project) {
    this.projects.push([name, project]);
  }
  deleteProject(project) {
    this.projects = this.projects.filter(elem => elem !== project);
  }
  showProjects() {
    return this.projects
  }
}

class Project {
  constructor() {
    this.project = [];
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
    return this.project.name = value;
  }
}

export { Database, Project }