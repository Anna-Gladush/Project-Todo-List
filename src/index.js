import { compareAsc, format } from "date-fns";
import "./styles/styles.css";
import { Note } from "./todo_obj.js";
import { CreateDOM } from "./createDOM.js"

const he = new Note("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
const she = new Note("Make tea", "drink",new Date(2026, 3, 27, 14, 46), "Moderate", "...", false);
// he.check_toggle();
console.log(he);

let project_1 = [];
project_1.push(he, she);
project_1.push(new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true), new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true));
console.log(project_1);

const delete_note = (project) => {
  const btn = document.querySelectorAll('.delete-btn');
  btn.forEach((button) => button.addEventListener('click', () => {
    console.log('work')
    project = project.filter(elm => elm.id !== button.dataset.id);
    workspace.innerHTML = '';
    create_workspaceDOM(project);
  }));
}
const changeWork = (project) => {
  // from workspace
  const btn = document.querySelectorAll('.change-btn');
  btn.forEach((button) => button.addEventListener('click', () => {
    const idx = project.find(elm => elm.id === button.dataset.id);
    console.log(idx)
    change(idx);
  }))
}
const change = (card) => {
  workspace.innerHTML = '';
  CreateDOM.create_note_page(workspace);
  close(project_1);
  submit(project_1);
  
  document.getElementById('title').value = card.title;
  document.getElementById('description').value = card.description;
  const day = (format(card.dueDate, "yyyy-MM-dd"));
  const hour = (format(card.dueDate, "HH:mm"));
  document.getElementById('dueDate').value = `${day}T${hour}`;
  document.getElementById('MySelect').value = card.priority;
  document.getElementById('notes').value = card.notes;
  document.getElementById('checklist').checked = card.checklist;
  console.log(card.dueDate)
  console.log((new Date(card.dueDate)))
  console.log(`${day}T${hour}`)
}
const workspace = document.querySelector(".workspace");
const create_workspaceDOM = (project) => {
  project.forEach((card) => {
    CreateDOM.create_card(workspace, card.title, card.description,  card.dueDate, card.priority, card.notes, card.checklist, card.id);
  })
  open(project);
  delete_note(project);
  changeWork(project);
}

const open_card = (c) => {
  const workspace = document.querySelector('.workspace');
  workspace.innerHTML = '';
  const card = CreateDOM.create_div(workspace, 'card-open');
  CreateDOM.create_h(card, 'h1', c.title);
  CreateDOM.create_p(card, c.priority);
  CreateDOM.create_p(card, `- ${c.description}`);
  CreateDOM.create_p(card, `<span>${c.dueDate}</span>`);
  CreateDOM.create_p(card, c.notes);
  const card_btn = CreateDOM.create_div(card, 'card-btn')
  CreateDOM.create_btn(card_btn, 'change-btn', 'change', c.id);
  CreateDOM.create_btn(card_btn, 'done-btn', CreateDOM.check_done(c.checklist), c.id);
  CreateDOM.create_btn(card_btn, 'delete-btn', 'delete', c.id);
  CreateDOM.create_btn(card_btn, 'close', 'close', c.id);
}
const open = (project) => {
  const btn = document.querySelectorAll('.open-btn');
  btn.forEach((button) => button.addEventListener('click', () => {
    const idx = project.find(elm => elm.id === button.dataset.id);
    open_card(idx);
    close(project);
    delete_note(project);
  }));
  
}
const close = (project) => {
  const btn = document.querySelectorAll('.close');
  btn.forEach(button => button.addEventListener('click', () => {
    console.log("work");
    workspace.innerHTML = '';
    create_workspaceDOM(project);
  }))
}
const submit = (project) => {
  const btn = document.querySelector('.submit');
  btn.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('dueDate').value;
    let priority = document.getElementById('MySelect').value;
    let notes = document.getElementById('notes').value;
    let done = document.getElementById('checklist').checked;
    // const check = done === 'on' ? true : false;
    const newNote = new Note(title, description, new Date(date), priority, notes, done);
    project.push(newNote);
    workspace.innerHTML = '';
    create_workspaceDOM(project);
  })
}
create_workspaceDOM(project_1)
const btn = document.querySelectorAll('.add-note');
btn.forEach(button => button.addEventListener('click', () => {
  workspace.innerHTML = '';
  CreateDOM.create_note_page(workspace);
  close(project_1);
  submit(project_1);
}))
