
import "./styles/styles.css";

import { Database, Project } from "./project.js";
import { ProjectManipulation } from "./projectDOM.js";
import { NoteManipulation } from "./noteDOM.js";

// const he = new Note("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false);
// const she = new Note("Make tea", "drink",new Date(2026, 3, 27, 14, 46), "Moderate", "...", false);
// console.log(he);

// // const project_1 = new Project('Project-1');

// // project_1.addNote(new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true), new Note("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true));
// // Workspace.addProject(project_1);

// // Workspace.create_workspaceDOM(project_1)

const workingProjects = new Database();

ProjectManipulation.domFunctionality();


const project_1 = new Project('Project-1');
project_1.addNote("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true);
project_1.addNote("Make tea", "drink", new Date(2026, 3, 27, 14, 46), "Moderate", "...", true);
project_1.addNote("Make notes", "make note appear", new Date(), "High", "we'll see how it works", false)
workingProjects.addProject(project_1)
console.log(workingProjects.showProjects())

NoteManipulation.projectDisplay(project_1)