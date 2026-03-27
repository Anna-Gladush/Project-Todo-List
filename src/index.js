import "./styles/styles.css";
import { Note } from "./todo_obj.js";
import { CreateDOM } from "./createDOM.js"

const he = new Note("Make notes", "make note appear", new Date(2026, 3, 26, 16, 27), 1, "we'll see how it works", false);
const she = new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), 2, "...", true);
// he.check_toggle();
console.log(he);

let project = [];
project.push(he, she);
console.log(project);

const workspace = document.querySelector(".workspace");
project.forEach((card) => CreateDOM.create_card(workspace, card.title, card.description, card.dueDate, card.priority, card.notes, card.checklist))
