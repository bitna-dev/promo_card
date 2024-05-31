import { useParams } from 'react-router-dom'

const Card = () => {
  const { id } = useParams()
  console.log(id)
  return <div>Card ID: {id}</div>
}

export default Card
