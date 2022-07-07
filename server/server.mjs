import http from 'http'
import Websocket, { WebSocketServer } from 'ws'
import handler from "serve-handler";


const server = http.createServer((request, response) => {
    return handler(request, response, {
        public: "./frontend",
      });
})

const wss = new WebSocketServer({server})

wss.on('headers', (headers, req) => {
    console.log(headers)
})


wss.on('request', function(request){
    let connection = request.accept('echo-protocol', request.origin)
    connection.on('message', function(message) {
        console.log(message);
        console.log(message.utf8Data)
    })
})
wss.on('connection', (ws) => {
    ws.send(JSON.stringify({
        user: 'Bienvenido',
        text: 'Hola'}))
    ws.on('message', function sendMsg(data, isBinary) {
        
        wss.clients.forEach(function each(client) {
            client.send(data, {binary : isBinary} )
        })
    })
})
const ip = process.env.IP
server.listen(8000, ip)