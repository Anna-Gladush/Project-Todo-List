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
  // setters
  // set title(value) {
  //   this._title = value;
  // }
  // set description(value) {
  //   this._description = value;
  // }
  // set dueDate(value) {
  //   this._dueDate = value;
  // } 
  // set priority(value) {
  //   this._priority = value;
  // }
  // set notes(value) {
  //   this._notes = value;
  // }
  check_toggle() {
    this.checklist = !this.checklist;
  }
}
