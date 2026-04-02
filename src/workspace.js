import { format } from "date-fns";
import { Note } from "./note.js";
import { CreateDOM } from "./createDOM.js";

const Workspace = (() => {
  let projects = [];
  let project_count = 2;
  const workspace = document.querySelector(".workspace");
  
  const close = (project) => {
    const btn = document.querySelectorAll('.close');
    btn.forEach(button => button.addEventListener('click', () => {
      workspace.innerHTML = '';
      create_workspaceDOM(project);
    }))
  }
  const open = (project) => {
    const btn = document.querySelectorAll('.open-btn');
    btn.forEach((button) => button.addEventListener('click', () => {
      const element = project.find(elm => elm.id === button.dataset.id);
      openCard(element);
      close(project);
      deleteNote(project);
      changeBTN(project);
    }));
  }
  const openCard = (c) => {
    workspace.innerHTML = '';
    const card = CreateDOM.create_div(workspace, 'card-open');
    CreateDOM.create_h(card, 'h1', c.title);
    CreateDOM.create_p(card, c.priority);
    CreateDOM.create_p(card, `- ${c.description}`);
    CreateDOM.create_p(card, `<span>${format(c.dueDate, "yyyy-MM-dd HH:mm")}</span>`);
    CreateDOM.create_p(card, c.notes);
    const card_btn = CreateDOM.create_div(card, 'card-btn')
    CreateDOM.create_btn(card_btn, 'change-btn', 'change', c.id);
    CreateDOM.create_btn(card_btn, 'done-btn', CreateDOM.check_done(c.checklist), c.id);
    CreateDOM.create_btn(card_btn, 'delete-btn', 'delete', c.id);
    CreateDOM.create_btn(card_btn, 'close', 'close', c.id);
  }

  const submitNote = (project, element = '') => {
    const btn = document.querySelector('.submit');
    btn.addEventListener('click', () => {
      let title = document.getElementById('title').value;
      let description = document.getElementById('description').value;
      let date = document.getElementById('dueDate').value;
      let priority = document.getElementById('MySelect').value;
      let notes = document.getElementById('notes').value;
      let done = document.getElementById('checklist').checked;
      if (element === ''){
      const newNote = new Note(title, description, new Date(date), priority, notes, done);
      project.push(newNote);
    } else {
      element.title = title;
      element.description = description;
      element.date = date;
      element.priority = priority;
      element.notes = notes;
      element.checklist = done;
    }
      workspace.innerHTML = '';
      create_workspaceDOM(project);
    })
  }
  const changeBTN = (project) => {
    const btn = document.querySelectorAll('.change-btn');
    btn.forEach((button) => button.addEventListener('click', () => {
      const element = project.find(elm => elm.id === button.dataset.id);
      console.log(element)
      changeNote(element, project);
    }))
  }
  const changeNote = (card, project) => {
    workspace.innerHTML = '';
    CreateDOM.create_note_page(workspace);
    close(project);
    submit(project, card);
    document.getElementById('title').value = card.title;
    document.getElementById('description').value = card.description;
    const day = (format(card.dueDate, "yyyy-MM-dd"));
    const hour = (format(card.dueDate, "HH:mm"));
    document.getElementById('dueDate').value = `${day}T${hour}`;
    document.getElementById('MySelect').value = card.priority;
    document.getElementById('notes').value = card.notes;
    document.getElementById('checklist').checked = card.checklist;
  }
  const deleteNote = (project) => {
    const btn = document.querySelectorAll('.delete-btn');
    btn.forEach((button) => button.addEventListener('click', () => {
      project = project.filter(elm => elm.id !== button.dataset.id);
      workspace.innerHTML = '';
      create_workspaceDOM(project);
    }))
  }
  const addNote = (project) => {
    const btn = document.querySelectorAll('.add-note');
    btn.forEach(button => button.addEventListener('click', () => {
      workspace.innerHTML = '';
      CreateDOM.create_note_page(workspace);
      close(project);
      submitNote(project);
    }))
  }
  // const submitName = () => {
  //   const btn = document.querySelector('.submit-name');
  //   btn.addEventListener('click', () => {
  //     const input = document.getElementById('name');
  //     // const 
  //     return input.value;
  //   })
  // }
  const closeNameProject = (open) => {
    const btn = document.querySelector('.close-name');
    const div = document.querySelector('.name-project')
    btn.addEventListener('click', () => {
      if (open = true){
      document.body.removeChild(div);}
      return false;
    })
  }
  const nameProject = () => {
    let open = false;
    const btn = document.querySelectorAll('.rename');
    btn.forEach(button => button.addEventListener('click', () => {
    if (!open){
      const div = CreateDOM.create_div(document.body, 'name-project');
      const label = document.createElement('label');
      label.setAttribute('for', 'name');
      label.textContent = 'Workspace name';
      div.appendChild(label);
      const input = CreateDOM.create_input(div, 'text', 'Name', 'name');
      CreateDOM.create_btn(div, 'submit-name', 'submit', 'submit-name');
      CreateDOM.create_btn(div, 'close-name', 'close', 'close-name');
      open = closeNameProject(open);
    }
  }))
  }

  const addProject = (project, text = false) => {
    const btn = document.querySelector('.add-project');
    const div = document.querySelector('.project-tab');
    btn.addEventListener('click', () => {
      const proj_div = CreateDOM.create_div(div, 'project');
      proj_div.setAttribute('id', `${project_count+1}`);
      if (!text){
        CreateDOM.create_p(proj_div, `Project-<span>${project_count}</span><`)
      } else {
        CreateDOM.create_p(proj_div, text)
      }
      project_count ++;
      CreateDOM.create_btn(proj_div, 'add-note', '+', project_count);
      CreateDOM.create_btn(proj_div, 'delete-space', '—', project_count);
      CreateDOM.create_btn(proj_div, 'rename', 'rename', project_count);
      addNote(project);
      projects.push(project);
    })
  }
  // const deleteProject = (project) => {
  //   const btn = document.querySelector('.delete-project');
  //   btn.addEventListener('click', () => {
  //     projects = projects.filter(elem => elem !== project);
  //     const div = document.querySelector('.project-tab');

  //     // workspace.innerHTML = '';
      
  //   })
  // }
  const create_workspaceDOM = (project) => {
    project.forEach((card) => {
      CreateDOM.create_card(workspace, card.title, card.description,  card.dueDate, card.priority, card.notes, card.checklist, card.id);
    });
    addNote(project);
    addProject(project);
    // deleteProject(project);
    open(project);
    deleteNote(project);
    changeBTN(project);
    nameProject()
  }
  const returnPr = () => {
    return projects
  }
  return {
    returnPr,
    open,
    close,
    submitNote,
    changeBTN,
    changeNote,
    deleteNote,
    addNote,
    addProject,
    create_workspaceDOM
  }
})()

export { Workspace }