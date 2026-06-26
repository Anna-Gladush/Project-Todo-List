const Sidebar = ({tabs}) => {
  const tabList = tabs.map(tab => {
    return (
      <div key={tab.id} className="tabs">
        <h2>{tab.name}</h2>
        <div className="tabs-buttons">
          <button className="project-create">+</button>
          <button className="project-delete">-</button>
          <button className="project-edit">rename</button>
        </div>
      </div>
    )
  })
  return (
    <nav>
      <h1>Notes</h1>
      { tabList }
    </nav>
  )
}

export default Sidebar