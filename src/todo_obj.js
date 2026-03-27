export class Note {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
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
  // // getters
  // get title() {
  //   return this._title;
  // }
  // get description() {
  //   return this._description;
  // }
  // get dueDate() {
  //   return this._dueDate;
  // }
  // get priority() {
  //   return this._priority;
  // }

  // get notes() {
  //   return this._notes;
  // }
  // get checklist() {
  //   return this.checklist;
  // }
}
