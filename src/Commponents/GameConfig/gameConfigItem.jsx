function gameConfigItem({value, icon, func}) {
  return (
    <div className="flex flex-row gap-2 p-1 hover:bg-blue-100" onClick={() => func(value)}>
      <div>{icon}</div>
      <div>{value}</div>
    </div>
  )
}

export default gameConfigItem;