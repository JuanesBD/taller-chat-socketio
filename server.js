const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const usuarios = new Map();

io.on('connection', (socket) => {
  console.log('Se conectó:', socket.id);

  socket.on('entrar', (nombre) => {
    nombre = String(nombre || '').trim().slice(0, 20);
    if (!nombre) return;
    usuarios.set(socket.id, nombre);
    io.emit('sistema', `${nombre} se unió al chat`);
    io.emit('usuarios', [...usuarios.values()]);
  });

  socket.on('mensaje', (texto) => {
    const autor = usuarios.get(socket.id);
    texto = String(texto || '').trim().slice(0, 500);
    if (!autor || !texto) return;
    io.emit('mensaje', { autor, texto, hora: new Date().toISOString() });
  });

  socket.on('escribiendo', () => {
    const autor = usuarios.get(socket.id);
    if (!autor) return;
    socket.broadcast.emit('escribiendo', autor);
  });

  socket.on('disconnect', () => {
    console.log('Se desconectó:', socket.id);
    const nombre = usuarios.get(socket.id);
    if (!nombre) return;
    usuarios.delete(socket.id);
    io.emit('sistema', `${nombre} salió del chat`);
    io.emit('usuarios', [...usuarios.values()]);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
