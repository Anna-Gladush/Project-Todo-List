import { format } from "date-fns";

export const CreateDOM = (() => {
  const create_div = (parent, class_name) => {
    const div = document.createElement('div');
    div.className = class_name;
    parent.appendChild(div);
    return div;
  }
  const create_p = (parent, text) => {
    const p = document.createElement('p');
    p.innerHTML = text;
    parent.appendChild(p);
    return p;
  }
  const create_h = (parent, h, text) => {
    const headline = document.createElement(h);
    headline.textContent = text;
    parent.appendChild(headline);
    return headline;
  }
  const create_btn = (parent, class_name, text, id) => {
    const btn = document.createElement('button');
    btn.classList = class_name;
    btn.textContent = text;
    btn.dataset.id = id;
    parent.appendChild(btn);
    return btn;
  }
  const check_done = (check) => {
    if (check) {
      return 'done';
    } else {
      return 'undone';
    }
  }
  const checkAddClass = (element, check) => {
  if (check === true){
    element.classList.add('done');
    element.classList.remove('undone');
  } else {
    element.classList.add('undone');
    element.classList.remove('done');
  }
  }
  const create_input = (parent, type, placeholder_text, id) => {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder_text;
    input.id = id;
    parent.appendChild(input);
    return input;
  }
  const create_select = (parent) => {
    const select = document.createElement('select');
    const label = document.createElement('label');
    label.setAttribute('for', 'MySelect');
    label.textContent = 'Priority';
    parent.appendChild(label);
    select.setAttribute('id', 'MySelect');
    parent.appendChild(select);

    const opt = document.createElement("option");
    opt.setAttribute("value", "Low");
    const nod = document.createTextNode("Low");
    opt.appendChild(nod);
    select.appendChild(opt);

    const opt1 = document.createElement("option");
    opt1.setAttribute("value", "Moderate");
    const nod1 = document.createTextNode("Moderate");
    opt1.appendChild(nod1);
    select.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.setAttribute("value", "High");
    let nod2 = document.createTextNode("High");
    opt2.appendChild(nod2);
    select.appendChild(opt2);
  }
  const create_card = (parent, title, description, dueDate, priority, notes, check, id) => {
    const card = create_div(parent, 'card');
    create_h(card, 'h1', title);
    create_p(card, priority);
    create_p(card, `- ${description}`);
    create_p(card, `${format(dueDate, "yyyy-MM-dd HH:mm")}`);
    create_p(card, notes);
    const card_btn = create_div(card, 'card-btn')
    create_btn(card_btn, 'open-btn', 'open', id);
    create_btn(card_btn, 'change-btn', 'change', id);
    const btn = create_btn(card_btn, 'done-btn', check_done(check), id);
    checkAddClass(btn, check);
    create_btn(card_btn, 'delete-btn', 'delete', id);
  }
  const create_note_page = (parent) => {
    const create_notes = create_div(parent, 'create-notes')
    const title = create_input(create_notes, 'text', '*Title', 'title');
    title.required = true;
    create_input(create_notes, 'text', 'Description', 'description');
    const div0 = create_div(create_notes, 'complete')
    const label_date = document.createElement('label');
    label_date.setAttribute('for', 'dueDate');
    label_date.textContent = '*Date: ';
    div0.appendChild(label_date);
    const date = create_input(div0, 'datetime-local', 'Date', 'dueDate');
    date.required = true;
    const div = create_div(create_notes, 'priority')
    create_select(div);
    create_input(create_notes,  'text', 'Notes', 'notes');
    const div1 = create_div(create_notes, 'complete')
    const label = document.createElement('label');
    label.setAttribute('for', 'checklist');
    label.textContent = 'Completion status: ';
    div1.appendChild(label);
    create_input(div1,  'checkbox', 'checklist', 'checklist');
    CreateDOM.create_btn(create_notes, 'close', 'close', 'close');
    CreateDOM.create_btn(create_notes, 'submit', 'submit', 'submit');
  }
  return {
    create_div,
    create_h,
    create_p,
    create_btn,
    create_card,
    check_done,
    create_input,
    create_select,
    create_note_page,
    checkAddClass
  }
})()