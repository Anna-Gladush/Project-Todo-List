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
  }
  const check_done = (check) => {
    if (check) {
      return 'undone';
    } else {
      return 'done';
    }
  }
  const priority = (value) => {
    switch (value) {
      case 1:
        return 'red';
      case 2:
        return 'yellow';
      case 3: 
        return 'green'
    }
  }
  const create_card = (parent, title, description, dueDate, priority, notes, check, id) => {
    const card = create_div(parent, 'card');
    create_h(card, 'h1', title);
    create_p(card, priority);
    create_p(card, `- ${description}`);
    create_p(card, `<span>${dueDate}</span>`);
    create_p(card, notes);
    // create_p(card, check);
    const card_btn = create_div(card, 'card-btn')
    create_btn(card_btn, 'open-btn', 'open', id);
    create_btn(card_btn, 'change-btn', 'change', id);
    create_btn(card_btn, 'done-btn', check_done(check), id);
    create_btn(card_btn, 'delete-btn', 'delete', id);
  }
  return {
    create_div,
    create_h,
    create_p,
    create_btn,
    create_card,
    check_done
  }
})()