const getNominations = async (length) => {
    const promise = await fetch(`http://localhost:9999/api/nomination?length=${length}`)
    const nominations = await promise.json()
    return nominations
  }
  
  export default getNominations