import { wss } from './server'
import { PubSubClient } from 'kubemq-js'

const pubsubClient = new PubSubClient('localhost:50000', 'chat-service')

wss.on('connection', (ws) => {
    console.log('Client connected')

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`)
        pubsubClient.send({
            channel: 'grupao-chat-1',
            body: Buffer.from(message)
        })

        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(message)
            }
        })
    })

    ws.on('close', () => {
        console.log('Client disconnected')
    })
})

pubsubClient.subscribe({
    channel: 'grupao-chat-1',
    group: 'grupao-chat-1',
}).on('message', (msg) => {
    console.log('Received message from KubeMQ:', msg.body.toString());

    // Broadcast para todos os clientes conectados
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg.body.toString());
        }
    });
});
