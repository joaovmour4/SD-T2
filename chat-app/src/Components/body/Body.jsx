import React from 'react'
import '../../App.css'
import InputBox from '../InputBox/InputBox'
import Message from '../Message/Message'

const Body = () => {
    const [messages, setMessages] = React.useState([{from: 'john', text: 'Hi, how are you?'}])
  return (
    <>
        <div className='messages-area'>
            {
                messages.map(message => {
                    return(
                        <Message message={message}/>
                    )
                })
            }
        </div>
        <InputBox 
            text={'Digite uma mensagem'}
            setMessages={setMessages}
        />
    </>
  )
}

export default Body