import fetch from 'node-fetch'

const getNominations = async (req, res, next) => {
  const promise = await fetch(`http://localhost:9000/api/nomination`)
  const nominations = await promise.json()
  req.nominations = nominations
  
  next()
}

export default getNominations