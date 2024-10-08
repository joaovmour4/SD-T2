import React from 'react'
import '../../Chat.css'
import InputBox from '../InputBox/InputBox'
import Message from '../Message/Message'

const Body = () => {
    const [messages, setMessages] = React.useState([])
    const [socket, setSocket] = React.useState(null)

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
            setMessages((prevMessages) => [...prevMessages, {from:newMessage.clientId, text: newMessage.message}]);
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
                    return(
                        <Message message={message}/>
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