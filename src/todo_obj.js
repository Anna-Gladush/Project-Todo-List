export class Note {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.id = crypto.randomUUID();
  }
  check_toggle() {
    this.checklist = !this.checklist;
  }
}
