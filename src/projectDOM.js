import { CreateDOM } from "./createDOM.js";

const ProjectManipulation = (() => {
  let project_count = 1;

  const askForAName = () => {
    return prompt('Name: ');
  }
  const saveName = () => {
    // project.name(text);
  }

  const addProject = () => {
    const btn = document.querySelector('.add-project');
    btn.addEventListener('click', () => {
      const name = askForAName();
      addProjectDOM(name);
      deleteProject();
      renameProject()
    })
  }
  const addProjectDOM = (name) => {
    project_count ++;
    const div = document.querySelector('.project-tab');
    const proj_div = CreateDOM.create_div(div, 'project');
    proj_div.setAttribute('id', `${project_count}`);
    if (!name){
      CreateDOM.create_p(proj_div, `Project-<span>${project_count}</span><`)
    } else {
      CreateDOM.create_p(proj_div, name)
    }
    CreateDOM.create_btn(proj_div, 'add-note', '+', project_count);
    CreateDOM.create_btn(proj_div, 'delete-space', '—', project_count);
    CreateDOM.create_btn(proj_div, 'rename', 'rename', project_count);
  }
  const renameProject = () => {
    const btn = document.querySelectorAll('.rename');
    btn.forEach(button => button.addEventListener('click', () => {
      const div = document.getElementById(button.dataset.id);
      // Renaming
      const text = askForAName()
      div.firstElementChild.innerHTML = text;
      // saveName();
    }))
  }
  const deleteProject = () => {
    const btn = document.querySelectorAll('.delete-space');
    const div = document.querySelector('.project-tab');
    btn.forEach(button => button.addEventListener('click', () => {
      const project = document.getElementById(button.dataset.id);
      div.removeChild(project);
    }))
  }
  const domFunctionality = () => {
    addProject();
    renameProject();
    deleteProject();
  }
  return {
    addProject,
    renameProject,
    deleteProject,
    domFunctionality
  }
})()

export { ProjectManipulation }