const getNomination = async () => {
  const promise = await fetch(`http://localhost:9999/api/nomination`)
  const nominations = await promise.json()
  return nominations
}

export default getNomination