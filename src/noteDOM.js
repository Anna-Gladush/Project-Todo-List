import { format } from "date-fns";
import { CreateDOM } from "./createDOM.js";

const NoteManipulation = (() => {
  const workspace = document.querySelector(".workspace");

  const projectDisplay = (project, database) => {
    workspace.innerHTML = '';
    project.project.forEach((card) => {
      CreateDOM.create_card(workspace, card.title, card.description,  card.dueDate, card.priority, card.notes, card.checklist, card.id);
    });
    addNote(project,database);
    changeNote(project, database);
    openNote(project, database);
    deleteNote(project, database);
    checkNote(project);
    openProject(database)
  }
  const openProject = (database) => {
    const div = document.querySelectorAll('.project');
    div.forEach(project => {
      project.querySelector('.add-note');
      project.addEventListener('click', () => {
        const name = project.firstElementChild.textContent;
        const projects = database.projects.find(elem => elem[0] === name)[1];
        addNote(projects, database)
      });
      project.firstElementChild.addEventListener('click', () => {
      const name = project.firstElementChild.textContent;
      const projects = database.projects.find(elem => elem[0] === name)[1];
      addNote(projects, database)
      projectDisplay(projects, database);
      });

    })
 
  }
  const addNote = (project, database) => {
    const btn = document.querySelectorAll('.add-note');
    btn.forEach(button => button.addEventListener('click', () => {
      workspace.innerHTML = '';
      CreateDOM.create_note_page(workspace);
      closeNote(project, database);
      deleteNote(project, database);
      submitNote(project, database);
    }))
  }

  const deleteNote = (project, database) => {
    const btn = document.querySelectorAll('.delete-btn');
    btn.forEach((button) => button.addEventListener('click', () => {
      const element = project.project.find(elm => elm.id === button.dataset.id);
      project.deleteNote(element);

      workspace.innerHTML = '';
      projectDisplay(project, database);
    }))
  }

  const openNote = (project, database) => {
    const btn = document.querySelectorAll('.open-btn');
    btn.forEach((button) => button.addEventListener('click', () => {
      workspace.innerHTML = '';
      const element = project.project.find(elm => elm.id === button.dataset.id);
      const card = CreateDOM.create_div(workspace, 'card-open');
      CreateDOM.create_h(card, 'h1', element.title);
      CreateDOM.create_p(card, element.priority);
      CreateDOM.create_p(card, `- ${element.description}`);
      CreateDOM.create_p(card, `<span>${format(element.dueDate, "yyyy-MM-dd HH:mm")}</span>`);
      CreateDOM.create_p(card, element.notes);
      const card_btn = CreateDOM.create_div(card, 'card-btn')
      CreateDOM.create_btn(card_btn, 'change-btn', 'change', element.id);
      CreateDOM.create_btn(card_btn, 'done-btn', CreateDOM.check_done(element.checklist), element.id);
      CreateDOM.create_btn(card_btn, 'delete-btn', 'delete', element.id);
      CreateDOM.create_btn(card_btn, 'close', 'close', element.id);

      closeNote(project, database);
      changeNote(project, database);
      deleteNote(project);
      checkNote(project);
    }));
  }

  const closeNote = (project, database) => {
    const btn = document.querySelector('.close');
    btn.addEventListener('click', () => {
      workspace.innerHTML = '';
      projectDisplay(project, database);
    })
  }

  const changeNote = (project, database) => {
    const btn = document.querySelectorAll('.change-btn');
    btn.forEach((button) => button.addEventListener('click', () => {
      const element = project.project.find(elm => elm.id === button.dataset.id);
      workspace.innerHTML = '';
      CreateDOM.create_note_page(workspace);

      const day = (format(element.dueDate, "yyyy-MM-dd"));
      const hour = (format(element.dueDate, "HH:mm"));
      document.getElementById('title').value = element.title;
      document.getElementById('description').value = element.description;
      document.getElementById('dueDate').value = `${day}T${hour}`;
      document.getElementById('MySelect').value = element.priority;
      document.getElementById('notes').value = element.notes;
      document.getElementById('checklist').checked = element.checklist;

      closeNote(project, database);
      submitNote(project, database, element);
    }))
  }
  

  const submitNote = (project, database, element = false) => {
    const btn = document.querySelector('.submit');
    btn.addEventListener('click', () => {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const date = document.getElementById('dueDate').value;
      const priority = document.getElementById('MySelect').value;
      const notes = document.getElementById('notes').value;
      const check = document.getElementById('checklist').checked;
      if(!element){
        project.addNote(title, description, date, priority, notes, check)
      } else {
        project.changeNote(element, title, description, date, priority, notes, check)
      }
      workspace.innerHTML = '';
      projectDisplay(project, database)
    })
  }
   
  const checkNote = (project) => {
    const btn = document.querySelectorAll('.done-btn');
    btn.forEach(button => button.addEventListener('click', () => {
      const element = project.project.find(elem => elem.id === button.dataset.id);
      element.check_toggle();
      button.textContent = CreateDOM.check_done(element.checklist);
    }))
  }
  return {
    projectDisplay,
    addNote,
    closeNote,
    openNote,
    deleteNote,
    changeNote,
    submitNote,
    checkNote,
    openProject
  }
})()

export { NoteManipulation }