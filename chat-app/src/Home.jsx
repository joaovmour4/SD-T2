import { useSession } from './Contexts/NameContext'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import React from 'react'

const Home = () => {
  const sessionContext = useSession()
  const navigate = useNavigate()
  const [name, setName] = React.useState('')
  const handleName = () => {
    sessionContext.handleName(name)
    navigate('/chat')
  }
  const handleEnterName = (event) => {
    if(event.key === 'Enter'){  
      sessionContext.handleName(name)
      navigate('/chat')
    }
  }
  const updateName = (event) => {
    setName(event.target.value)
  }
  return (
    <div className='central-div'>
      <h2>Digite seu nome</h2>
      <div className='cont'>
        <input type="text" onChange={updateName} onKeyDown={handleEnterName} placeholder='Seu nome' name="" id="" />
        <img onClick={handleName} alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABoUlEQVR4nO2UzytEURTHn2RhoZSywB+gbGQic87IkqWNNTt2VkjKm3NIKfMHWLOyk6xkZWNjgyVFYSc075yZYlzdGWYG9735YTbKt+7i3Vffz7nnl+f960PgB/3IkkKSayQ98Bqh4TXpBtZ5JD1DVvN5gOWmftOUaU2QTgLpPrC8lBsXASSbNZlO7prmOAVjSLINJMEPU5I3IMkWAX7QX5UxcroPSZL5vDoi/UhHBkn3LKQQvV5EmoIvXcgyB6ynYaZl5w5XZQZZpATUeadxYjUYB5JDZMlVYWyA9WTEDwaQ9LZ0LzlbeHfkrI/VGGMh59uj/mO7hXwr7mF4akhXKptLLsG66BnTZCE//id1qkJRhSKKmU6wTOTTybrogAtsmLZIQBgEWK5sR5XV6tUB2Klo7oIAyXHcT3fa+7if7UXSJ9cL7Zx4tQg4M42sS7Et02K/B9efO5Dk0j25em+H0atXsS3TgiRHEcVP1W1uBazLkTNR7WoIE5DMRgDOvUYIQ1oYSBcaAnBDJDfkS4/XSOHXFg5fDb8RFNbKQ829/yf1DjMGKcrA/PedAAAAAElFTkSuQmCC">
        </img>
      </div>
    </div>
  )
}

export default Home