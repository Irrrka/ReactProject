const getNomination = async (length) => {
  const promise = await fetch(`http://localhost:9000/api/nomination?length=${length}`)
  const nominations = await promise.json()
  return nominations
}

export default getNomination