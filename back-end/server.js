const { CommandsClient, Message, Client } = require('kubemq-js');
const express = require('express')
const cors = require('cors')
const WebSocket = require('ws')
const http = require('http');


const app = express()
app.use(cors())
app.use(express.json())


const server = http.createServer(app)
const wss = new WebSocket.Server({ server })


app.get('*', (req, res)=>{
    return res.status(200).json({message: 'Hi, how are you?'})
})

const kubeMQHost = 'localhost';  
const kubeMQPort = '50000';
const channelName = 'myChannel';
const clientID = 'myUniqueClientID';

// Inicializando a fila de mensagens
const client = new CommandsClient(kubeMQHost, kubeMQPort, clientID);
client.create(channelName)


wss.on('connection', (ws) => {
    console.log('Client connected')
    const sendMessage = async (message) => {
        try {    
            const response = await client.send({
                channel: channelName,
                body: Buffer.from(message),
                clientId: clientID
            });
            console.log('Message sent:', response);
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };
    
    // Exemplo de envio de uma mensagem
    wss.on('message', (message) => {
        sendMessage(message)
    })
    // sendMessage('Olá, esta é uma mensagem de teste!');

    // Escutando e enviando comandos para o cliente conectado via WebSocket
    // const startListening = async () => {
    //     try {
    //         client.subscribe(
    //             (command) => {
    //                 console.log('Received command:', command.body.toString());
    //                 // socket.emit('newCommand', command.toString());
    //             },
    //             (error) => {
    //                 console.error('Failed to receive command:', error);
    //             }
    //         );
    //     } catch (error) {
    //         console.error('Failed to subscribe to commands:', error);
    //     }
    // };

    // startListening();

    ws.on('close', () => {
        console.log('Client disconnected')
    })
})

// pubsubClient.subscribe({
//     channel: 'grupao-chat-1',
//     group: 'grupao-group-1',
// }).on('message', (msg) => {
//     console.log('Received message from KubeMQ:', msg.body.toString());

//     // Broadcast para todos os clientes conectados
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(msg.body.toString());
//         }
//     });
// });

server.listen(3000, ()=>{
    console.log('server running on port 3000')
})

// module.exports =  { wss }

