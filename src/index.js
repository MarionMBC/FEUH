//Imports
import express from 'express';
import {Server as WebSocketServer} from 'socket.io'; //Se le coloca un alias para no confundirlo con el módulo Express
import http from 'http';
import {v4 as uuid} from 'uuid';

//Constantes
const app = express();
const httpServer = http.createServer(app); //Lo instanciamos y no le pasamos el server app, se llama el módulo http de node
//pero express nos devuelve un object aplication, no un módulo http.
const io = new WebSocketServer(httpServer); //Se le pasa al webSocket para crear una conexión io.

//Variables
var like = 0; //Contador de likes
var unLike = 0; //Unlikes
var abs = 0; //Votos abstenidos
var auth = [] //Sesiones autenticadas

//Método static para dar la carpeta public al cliente
app.use (express.static(__dirname + '/public'));
app.use ('/admin', express.static(__dirname + '/admin'));

//Variables
var online = 0; //Contador de sesiones activas

//funciones
/*Reinicia las votaciones*/
function restart () {
    auth = [];
    like = 0;
    unLike = 0;
    abs =0;
    online = 0;
}

/*Envía los datos*/
function sendData () {
    io.emit('server:like', like);
    io.emit('server:unLike', unLike);
    io.emit('server:abs', abs);
}

//Para ejecutarlo:
io.on('connection', (socket) => {
    /*Almacenamiento del LocalStorage e ID*/
    socket.on('client:reqLocalS', () => {
        let id = uuid();
        io.emit('server:resLocalS', id)
        online++;
        io.emit('online', online)
        auth.push(id);
        console.log (auth)
    });

    //Muestra la cantidad de miembros activos
    io.emit('online', online)

    //Formular pregunta
    socket.on('client:question', (question)=> {
        io.emit('server:question', question)
    });

    //Listener de usuarios que están de acuerdo
    socket.on ('client:like', (id) => {
        if (auth.includes(id)) {
            like++
            io.emit('server:like', like);
            for (let i = 0; i<auth.length; i++){
                if (id === auth[i]) {
                    auth.splice(i, 1);
                }
            }
        } else {
            io.emit('error', id);
        }
    })
    //Listener de usuarios que no están de acuerdo
    socket.on ('client:unLike', (id) => {
        if (auth.includes(id)) {
            unLike++;
            io.emit('server:unLike', unLike);
            for (let i = 0; i<auth.length; i++){
                if (id === auth[i]) {
                    auth.splice(i, 1);
                }
            }
        } else {
            io.emit('error', id);
        }
    })

    //Listener de usuarios que se abstienen
    socket.on ('client:abs', (id) => {
        if (auth.includes(id)) {
            abs++;
            io.emit('server:abs', abs);
            for (let i = 0; i<auth.length; i++){
                if (id === auth[i]) {
                    auth.splice(i, 1);
                }
            }
        } else {
            io.emit('error', id);
        }
    })

    socket.on ('client:closeVotation', () => {
        /*auth = [];
        like = 0;
        unLike = 0;
        abs =0;*/
        restart();
        sendData();
        io.emit('online', online);
        io.emit('server:votationClosed');
        socket.disconnect()
    })

    //Para los contadores de votos
    sendData()
   /* io.emit('server:like', like);
    io.emit('server:unLike', unLike);
    io.emit('server:abs', abs);*/

})





//Ya no se servirá el contenido con app porque ese es solo para express.
/*app.listen (8000, ()=> console.log (`Server is runnning on port`, 8000))*/
httpServer.listen(9000, () => console.log("Server is running on port:", 9000))

