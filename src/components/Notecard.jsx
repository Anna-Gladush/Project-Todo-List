import { format } from "date-fns";

const Notecard = ({title, description, dueDate, priority, notes, checklist}) => {

  return (
    <div className="note">
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <p className="date">{(format(dueDate, "yyyy-MM-dd"))}</p>
      <p className="priority">{priority}</p>
      <p className="notes">{notes}</p>
      <input className="checklist" type="checklist" checked={checklist}/>
    </div>
  )
}

export default Notecard