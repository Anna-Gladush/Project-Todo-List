import { CreateDOM } from "./createDOM.js";
import { NoteManipulation } from "./noteDOM.js";
import { Database, Project } from "./project.js";

const ProjectManipulation = (() => {
  let project_count = 1;

  const addProjectDOM = (name) => {
    const div = document.querySelector('.project-tab');
    const proj_div = CreateDOM.create_div(div, 'project');
    proj_div.setAttribute('id', `${project_count}`);
    CreateDOM.create_p(proj_div, name)
    CreateDOM.create_btn(proj_div, 'add-note', '+', project_count);
    CreateDOM.create_btn(proj_div, 'delete-space', '—', project_count);
    CreateDOM.create_btn(proj_div, 'rename', 'rename', project_count);
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
// 
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
      database: database
    }
    const json = JSON.stringify(userDatabase);
    localStorage.setItem("userDatabase", json);
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
      database.addProject(name, new Project, project_count);
      deleteProject();
      renameProject();
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
      if (!name) {
        return
      }
      div.firstElementChild.innerHTML = name;
      let renameProject = projects.find(elem => elem[0] === prev_name);
      renameProject[0] = name;
      clearDatabase()
      saveDatabase(); 
    }))

  }
  const deleteProject = () => {
    const btn = document.querySelectorAll('.delete-space');
    const div = document.querySelector('.project-tab');
    btn.forEach(button => button.addEventListener('click', () => {
      if (project_count > 1){
        const project_dom = document.getElementById(button.dataset.id);
        const project = database.projects.filter(elem => elem[2] !== button.dataset.id);
        div.removeChild(project_dom);
        database.deleteProject(project);
        document.querySelector('.workspace').innerHTML = '';
        project_count --; 
        clearDatabase()
        saveDatabase(); 
      } else {
        return
      }
    }))
  }

  const domFunctionality = () => {
    // addFirstWorkspace();
    addProject();
    renameProject();
    deleteProject();
  }
  // loadDatabase() ||
  const database = loadDatabase() || savedDB();
  // const addFirstWorkspace = () => {
  //   database.addProject('Project-1', new Project, project_count);
  //   addProjectDOM('Project-1');
  //   const proj_1 = database.projects[0][1];
  //   proj_1.addNote("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
  //   proj_1.addNote("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true);

    // clearDatabase();
  //   // saveDatabase(); 
  //   // database.addProject('Project-2', new Project);
  //   // addProjectDOM('Project-2');
  //   // Project object is database.projects[nom proj][1]
  //   // const proj_2 = database.projects[1][1];
  //   // const note = database.projects[0][1][0];
  //   // database.projects.forEach(pro => console.log(pro[1].project));
  // }
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