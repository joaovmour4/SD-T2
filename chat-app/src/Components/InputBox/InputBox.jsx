import React from 'react'
import './InputBox.css'

const InputBox = props => {
    const [textMessage, setTextMessage] = React.useState('')
    const handleMessage = () =>{
        if(props.socket && textMessage.length && props.socket.readyState === WebSocket.OPEN){
            // props.setMessages(prevState => [...prevState, {from: 'me', text: textMessage}])
            props.socket.send(textMessage)
            setTextMessage('')
        }
    }
    
    const handleEnterMessage = (event) =>{
        if(props.socket && textMessage.length && (event.key === 'Enter') && props.socket.readyState === WebSocket.OPEN){
            // props.setMessages(prevState => [...prevState, JSON.stringify({from: 'me', text: textMessage})])
            props.socket.send(textMessage)
            setTextMessage('')
        }
    }

    const handleSetMessage = (input) => {
        setTextMessage(input.target.value)
    }
    return (
        <div className='container'>
            <input onKeyDown={handleEnterMessage} className='InputBox' onChange={handleSetMessage} value={textMessage} placeholder={props.text} type="text" name="" id="" />
            <img onClick={handleMessage} alt='' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABoUlEQVR4nO2UzytEURTHn2RhoZSywB+gbGQic87IkqWNNTt2VkjKm3NIKfMHWLOyk6xkZWNjgyVFYSc075yZYlzdGWYG9735YTbKt+7i3Vffz7nnl+f960PgB/3IkkKSayQ98Bqh4TXpBtZ5JD1DVvN5gOWmftOUaU2QTgLpPrC8lBsXASSbNZlO7prmOAVjSLINJMEPU5I3IMkWAX7QX5UxcroPSZL5vDoi/UhHBkn3LKQQvV5EmoIvXcgyB6ynYaZl5w5XZQZZpATUeadxYjUYB5JDZMlVYWyA9WTEDwaQ9LZ0LzlbeHfkrI/VGGMh59uj/mO7hXwr7mF4akhXKptLLsG66BnTZCE//id1qkJRhSKKmU6wTOTTybrogAtsmLZIQBgEWK5sR5XV6tUB2Klo7oIAyXHcT3fa+7if7UXSJ9cL7Zx4tQg4M42sS7Et02K/B9efO5Dk0j25em+H0atXsS3TgiRHEcVP1W1uBazLkTNR7WoIE5DMRgDOvUYIQ1oYSBcaAnBDJDfkS4/XSOHXFg5fDb8RFNbKQ829/yf1DjMGKcrA/PedAAAAAElFTkSuQmCC">
            </img>
        </div>
    )
}

export default InputBox