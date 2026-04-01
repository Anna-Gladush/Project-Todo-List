import { format } from "date-fns";
import "./styles/styles.css";
import { Note } from "./todo_obj.js";
import { CreateDOM } from "./createDOM.js";
import { Workspace } from "./workspace.js";
// const workspace = document.querySelector(".workspace");

const he = new Note("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
const she = new Note("Make tea", "drink",new Date(2026, 3, 27, 14, 46), "Moderate", "...", false);
// he.check_toggle();
console.log(he);

let project_1 = [];

project_1.push(he, she);
project_1.push(new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true), new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true));
// Workspace.addProject(project_1);
console.log(Workspace.returnPr())

Workspace.create_workspaceDOM(project_1)