import { format } from "date-fns";
import "./styles/styles.css";
import { Note } from "./note.js";
import { CreateDOM } from "./createDOM.js";
import { Workspace } from "./workspace.js";
import { Database, Project } from "./project.js";
import { ProjectManipulation } from "./projectDOM.js";

const he = new Note("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
const she = new Note("Make tea", "drink",new Date(2026, 3, 27, 14, 46), "Moderate", "...", false);
console.log(he);

let project_1 = [];

project_1.push(he, she);
project_1.push(new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true), new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true));
// Workspace.addProject(project_1);

// Workspace.create_workspaceDOM(project_1)

const workingProjects = new Database();
// workingProjects.addProject(project_1);
// // console.log(workingProjects.showProjects())
// let project_2 = [new Note("Make tea", "drink",new Date(2026, 3, 27, 14, 46), "Moderate", "...", false)];
// workingProjects.deleteProject(project_1);
// workingProjects.addProject(project_2);
// console.log(workingProjects.showProjects())

ProjectManipulation.domFunctionality()