import { CreateDOM } from "./createDOM.js";
import { NoteManipulation } from "./noteDOM.js";
import { Database, Project } from "./project.js";

const ProjectManipulation = (() => {
  const loadProjectCount = () => {
    const json = localStorage.getItem("userDatabase");
    if (!json) {
      return null;
    }
    try {
      const db = JSON.parse(json);
      const project_count = db.project_count;
      return project_count;
    } catch (err) {
      console.error("Failed to parse profile JSON:", err);
      return null;
    }
  }

  const addProjectDOM = (name, id = project_count) => {
    const div = document.querySelector('.project-tab');
    const proj_div = CreateDOM.create_div(div, 'project');
    proj_div.setAttribute('id', id);
    CreateDOM.create_p(proj_div, name)
    const btn_div = CreateDOM.create_div(proj_div, 'btn-div')
    CreateDOM.create_btn(btn_div, 'add-note', '+', id);
    CreateDOM.create_btn(btn_div, 'delete-space', '—', id);
    CreateDOM.create_btn(btn_div, 'rename', 'rename', id);
  }

  const loadDatabase = () => {
    const json = localStorage.getItem("userDatabase");
    if (!json) {
      return null;
    }
    try {
      const db = JSON.parse(json);
      const projects = new Database;
      db.database.projects.forEach(pr => {
        addProjectDOM(pr[0]);
        const new_project = new Project;
        projects.addProject(pr[0], new_project, pr[2]);
        pr[1].project.forEach(note => new_project.addNote(note.title, note.description, note.dueDate, note.priority, note.notes, note.checklist));
      })
      const proj_1 = projects.projects[0][1];
      NoteManipulation.projectDisplay(proj_1, projects);
      NoteManipulation.openProject(projects);
      return projects;
    } catch (err) {
      console.error("Failed to parse profile JSON:", err);
      return null;
    }
  } 
 
  const savedDB = () => {
    const proj = new Database();
    const proj_1 = new Project();
    proj.addProject('Project-1', proj_1, 1)
    proj_1.addNote("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
    proj_1.addNote("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true);
    addProjectDOM('Project-1');
    NoteManipulation.projectDisplay(proj_1, proj);
    NoteManipulation.openProject(proj);
    return proj;
  } 

  const saveDatabase = () => {
    const userDatabase = {
      database: database,
      project_count: project_count
    }
    const json = JSON.stringify(userDatabase);
    localStorage.setItem("userDatabase", json);
  }

  const clearDatabase = () => {
    localStorage.removeItem("userDatabase");
  }
  // FOR ADDING PROJECT, NOT RENAMING
  const checkName = () => {
    const name = document.getElementById('ask-name');
    if (name.value == '') {
      name.setCustomValidity("The name must be filled!");
      return name.reportValidity();
    }
    name.setCustomValidity("");
    return name.reportValidity();
  }

  const askForAName = () => {
    return prompt('Name? ')
  }

  const addProject = () => {
    const btn = document.querySelector('.add-project');
    btn.addEventListener('click', () => {
      project_count ++;
      let name = askForAName();
      if (!name){
        name = `Project-${project_count}`;
      }
      addProjectDOM(name);
      database.addProject(name, new Project, project_count);
      domFunctionality()
      NoteManipulation.openProject(database);
      clearDatabase()
      saveDatabase(); 
    })
  }

  const renameProject = () => {
    const btn = document.querySelectorAll('.rename');
    btn.forEach(button => button.addEventListener('click', () => {
      const div = document.getElementById(button.dataset.id);
      const projects = database.projects;
      const prev_name = div.firstElementChild.textContent
      const name = askForAName()
      if (name == '') {
        return
      }
      div.firstElementChild.textContent = name;
      let renameProject = projects.find(elem => elem[0] === prev_name);
      renameProject[0] = name;
      console.log(div, button.dataset.id, prev_name, name, renameProject)

      clearDatabase()
      saveDatabase(); 
    }))

  }
  const deleteProject = () => {
    const btn = document.querySelectorAll('.delete-space');
    const div = document.querySelector('.project-tab');
    btn.forEach(button => button.addEventListener('click', () => {
      if (project_count > 1){
        const project = database.projects.find(elem => elem[2] === Number(button.dataset.id))
        database.deleteProject(project);
        div.innerHTML = '';
        for (let proj in database.projects) {
          const name = database.projects[proj][0];
          const id =  database.projects[proj][2]
          addProjectDOM(`${name}`, id);
        }
        document.querySelector('.workspace').innerHTML = '';
        project_count --; 
        domFunctionality()
        clearDatabase();
        saveDatabase(); 
      } else {
        return
      }
    }))
  }

  const domFunctionality = () => {
    addProject();
    renameProject();
    deleteProject();
  }

  let project_count = loadProjectCount() || 1;
  const database = loadDatabase() || savedDB();

  clearDatabase();

  return {
    addProject,
    renameProject,
    deleteProject,
    domFunctionality,
    saveDatabase,
    loadDatabase,
    clearDatabase
  }
})()

export { ProjectManipulation }