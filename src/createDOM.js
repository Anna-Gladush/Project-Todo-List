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

  const create_card = (parent, title, description, dueDate, priority, notes, check) => {
      const card = create_div(parent, 'card');
      create_h(card, 'h1', title)
      create_p(card, description);
      create_p(card, `<span>${dueDate}</span>`);
      create_p(card, `<span>${priority}</span>`);
      create_p(card, notes);
      create_p(card, check);
      
      const btn = document.createElement('button');
      btn.classList = 'change';
      card.appendChild(btn);
  }
  return {
    create_div,
    create_h,
    create_p,
    create_card
  }
})()