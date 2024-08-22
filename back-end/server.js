const kubemq = require('kubemq-nodejs');
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
var clientId = 0


wss.on('connection', (ws) => {
    clientId += 1
    ws.send(JSON.stringify({ type: 'clientId', clientId }))
    console.log('Client connected', clientId)
    
    let channelName = 'grupao', clientID = `client${clientId}`,
        kubeMQHost = 'kubemq', kubeMQGrpcPort = '50000';

    let sub = new kubemq.Subscriber(kubeMQHost, kubeMQGrpcPort, clientID, channelName);

    sub.subscribeToEvents(msg => {
        // console.log(msg)
        console.log('Event Received: EventID:' + msg.EventID + ', Channel:' + msg.Channel + ', ClientID:' + msg.clientID + ' ,Metadata:' + msg.Metadata + ', Body:' + kubemq.byteToString(msg.Body));
        // const messageObj = JSON.parse(kubemq.byteToString(msg.Body))
        // messageObj.message = kubemq.byteToString(messageObj.message)
        // const message = JSON.stringify(messageObj)
        const message = kubemq.byteToString(msg.Body)
        ws.send(message)
    }, err => {
        console.log('error:' + err)
    })

    const sendMessage = (message) => {
        let channelName = 'grupao', clientID = `client${clientId}`,
            kubeMQHost = 'kubemq', kubeMQGrpcPort = '50000';
        const publisher = new kubemq.Publisher(kubeMQHost, kubeMQGrpcPort, clientID, channelName);
        let event = new kubemq.Publisher.Event(kubemq.stringToByte(JSON.stringify({message, clientId})));
        publisher.send(event).then(
            res => {
                console.log(res);
            }).catch(
            err => {
                console.log('error sending' + err)
            });
    }

    
    
    // Exemplo de envio de uma mensagem
    ws.on('message', (message) => {
        sendMessage(message)
    })

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


