import React from 'react'
import '../../App.css'
import InputBox from '../InputBox/InputBox'
import Message from '../Message/Message'
import { Buffer } from 'buffer'

const Body = () => {
    const [messages, setMessages] = React.useState([{from: 'john', text: 'Hi, how are you?'}])
    const [socket, setSocket] = React.useState(null)
    const [clientId, setClientId] = React.useState(0)

    React.useEffect(() => {
        // Configura o WebSocket na montagem do componente
        const newSocket = new WebSocket('ws://localhost:3000');

        // Quando a conexão for aberta
        newSocket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        // Quando uma nova mensagem for recebida
        newSocket.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            if(newMessage.type && newMessage.type === 'clientId')
                setClientId(newMessage.clientId)
            else{
                const buffer = Buffer.from(newMessage.message.data);
                const decodedMessage = buffer.toString('utf-8');
                setMessages((prevMessages) => [...prevMessages, {from:newMessage.clientId, text: decodedMessage}]);
            }
        };

        // Quando a conexão for fechada
        newSocket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        setSocket(newSocket); // Armazena o WebSocket no estado

        // Limpeza: fecha o WebSocket quando o componente for desmontado
        return () => newSocket.close();
    }, []);

  return (
    <>
        <div className='messages-area'>
            {
                messages.map(message => {
                    console.log(message, clientId)
                    return(
                        <Message message={message} clientId={clientId}/>
                    )
                })
            }
        </div>
        <InputBox 
            text={'Digite uma mensagem'}
            setMessages={setMessages}
            socket={socket}
        />
    </>
  )
}

export default Body