const Navigation = ({tabs}) => {
  const tabList = tabs.map(tab => {
    return (
      <div key={tab.id}>
        <h2>{tab.name}</h2>
        <div>
          <button>+</button>
          <button>-</button>
          <button>rename</button>
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

export default Navigation