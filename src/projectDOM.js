import { CreateDOM } from "./createDOM.js";
import { NoteManipulation } from "./noteDOM.js";
import { Database, Project } from "./project.js";

const ProjectManipulation = (() => {
  const database = new Database();
  let project_count = 1;

  const saveDatabase = () => {
    const userDatabase = {
      database: database
    }
    const json = JSON.stringify(userDatabase);
    localStorage.setItem("userDatabase", json);
  }

  const loadDatabase = () => {
    const json = localStorage.getItem("userDatabase");
    if (!json) {
      return null;
    }
    try {
      const db = JSON.parse(json);
      return db.database.projects;
    } catch (err) {
      console.error("Failed to parse profile JSON:", err);
      return null;
    }
  }

  const clearDatabase = () => {
    localStorage.removeItem("userDatabase");
  }

  const askForAName = () => {
    return prompt('Name: ');
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
      database.addProject(name, new Project);
      const pr = database.projects.find(proj => proj[0] === name)
      deleteProject();
      renameProject();
      NoteManipulation.openProject(database);
      // NoteManipulation.projectDisplay(database, pr)
    })
  }

  const addProjectDOM = (name) => {
    const div = document.querySelector('.project-tab');
    const proj_div = CreateDOM.create_div(div, 'project');
    proj_div.setAttribute('id', `${project_count}`);
    CreateDOM.create_p(proj_div, name)
    CreateDOM.create_btn(proj_div, 'add-note', '+', project_count);
    CreateDOM.create_btn(proj_div, 'delete-space', '—', project_count);
    CreateDOM.create_btn(proj_div, 'rename', 'rename', project_count);
  }

  const renameProject = () => {
    const btn = document.querySelectorAll('.rename');
    btn.forEach(button => button.addEventListener('click', () => {
      const div = document.getElementById(button.dataset.id);
      const projects = database.projects;
      const prev_name = div.firstElementChild.textContent
      const name = askForAName()
      if (!name) {
        return
      }
      div.firstElementChild.innerHTML = name;
      let renameProject = projects.find(elem => elem[0] === prev_name);
      renameProject[0] = name;
    }))
  }
  const deleteProject = () => {
    const btn = document.querySelectorAll('.delete-space');
    const div = document.querySelector('.project-tab');
    btn.forEach(button => button.addEventListener('click', () => {
      if (project_count > 1){
        const project = document.getElementById(button.dataset.id);
        const name = project.firstElementChild.textContent;
        const projects = database.projects.find(elem => elem[0] === name);
        database.deleteProject(projects);
        div.removeChild(project);
        document.querySelector('.workspace').innerHTML = '';
        project_count --;  
      } else {
        return
      }

    }))
  }

  const domFunctionality = () => {
    addFirstWorkspace();
    addProject();
    renameProject();
    deleteProject();
  }

  const addFirstWorkspace = () => {
    database.addProject('Project-1', new Project);
    addProjectDOM('Project-1');

    // database.addProject('Project-2', new Project);
    // addProjectDOM('Project-2');
    // Project object is database.projects[nom proj][1]
    const proj_1 = database.projects[0][1];
    // const proj_2 = database.projects[1][1];
    // console.log('Pr-2', proj_2)
    // const note = database.projects[0][1][0];
    // database.projects.forEach(pro => console.log(pro[1].project));
    

    proj_1.addNote("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
    proj_1.addNote("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
    NoteManipulation.projectDisplay(proj_1, database);
    NoteManipulation.openProject(database);
  }
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