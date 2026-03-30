import { compareAsc, format } from "date-fns";
import "./styles/styles.css";
import { Note } from "./todo_obj.js";
import { CreateDOM } from "./createDOM.js"

const he = new Note("Make notes", "make note appear", format(new Date(), "yyyy-MM-dd hh-mm-ss"), 1, "we'll see how it works", false);
const she = new Note("Make tea", "drink", format(new Date(2026, 3, 27, 14, 46), "yyyy-MM-dd  hh-mm-ss"), 2, "...", true);
// he.check_toggle();
console.log(he);

let project_1 = [];
project_1.push(he, she);
project_1.push(new Note("Make tea", "drink", format(new Date(2026, 3, 27, 14, 46), "yyyy-MM-dd  hh-mm-ss"), 2, "...", true), new Note("Make tea", "drink", format(new Date(2026, 3, 27, 14, 46), "yyyy-MM-dd  hh-mm-ss"), 2, "...", true));
console.log(project_1);

const delete_note = (project) => {
  const btn = document.querySelectorAll('.delete-btn');
  btn.forEach((button) => button.addEventListener('click', () => {
    console.log('work')
    const idx = project.filter(elm => elm.id !== button.dataset.id);
    workspace.innerHTML = '';
    create_workspaceDOM(idx);
  }));
}

const workspace = document.querySelector(".workspace");
const create_workspaceDOM = (project) => {
  project.forEach((card) => CreateDOM.create_card(workspace, card.title, card.description, card.dueDate, card.priority, card.notes, card.checklist, card.id))
  open(project);
  delete_note(project);
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
create_workspaceDOM(project_1)

const btn = document.querySelectorAll('.add-note');
btn.forEach(button => button.addEventListener('click', () => {
  workspace.innerHTML = '';
  CreateDOM.create_note_page(workspace);
}))