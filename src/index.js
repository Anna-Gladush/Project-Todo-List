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

const workspace = document.querySelector(".workspace");
const create_workspaceDOM = (project) => {
  project.forEach((card) => CreateDOM.create_card(workspace, card.title, card.description, card.dueDate, card.priority, card.notes, card.checklist, card.id))
  open(project);
}
// const btn = document.querySelector('.click');
// btn.addEventListener('click', () => {
//   CreateDOM.open_card(project[1])
// })
const open_card = (c) => {
  const workspace = document.querySelector('.workspace');
  workspace.innerHTML = '';
  const card = CreateDOM.create_div(workspace, 'card-open');
  CreateDOM.create_h(card, 'h1', c.title);
  CreateDOM.create_p(card, c.priority);
  CreateDOM.create_p(card, `- ${c.description}`);
  CreateDOM.create_p(card, `<span>${c.dueDate}</span>`);
  CreateDOM.create_p(card, c.notes);
  // create_p(card, check);
  const card_btn = CreateDOM.create_div(card, 'card-btn')
  CreateDOM.create_btn(card_btn, 'change-btn', 'change', c.id);
  CreateDOM.create_btn(card_btn, 'done-btn', CreateDOM.check_done(c.checklist), c.id);
  CreateDOM.create_btn(card_btn, 'delete-btn', 'delete', c.id);
  CreateDOM.create_btn(card_btn, 'close', 'close', c.id);
}
const open = (project) => {
  const btn_open = document.querySelectorAll('.open-btn');
  btn_open.forEach((button) => button.addEventListener('click', () => {
    const idx = project.find(elm => elm.id === button.dataset.id);
    console.log(idx)
    open_card(idx);
    close(project);
  }));
  
}
const close = (project) => {
  const btn_close = document.querySelectorAll('.close');
  btn_close.forEach(button => button.addEventListener('click', () => {
    console.log("work");
    workspace.innerHTML = '';
    create_workspaceDOM(project)
  }))
}
create_workspaceDOM(project_1)
