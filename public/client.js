const socket = io();

const login = document.getElementById('login');
const chat = document.getElementById('chat');
const formLogin = document.getElementById('form-login');
const inputNombre = document.getElementById('input-nombre');
const formMensaje = document.getElementById('form-mensaje');
const inputMensaje = document.getElementById('input-mensaje');
const mensajes = document.getElementById('mensajes');
const listaUsuarios = document.getElementById('lista-usuarios');
const escribiendo = document.getElementById('escribiendo');

let miNombre = '';

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  miNombre = inputNombre.value.trim();
  if (!miNombre) return;

  socket.emit('entrar', miNombre);

  login.classList.add('oculto');
  chat.classList.remove('oculto');
  inputMensaje.focus();
});

formMensaje.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = inputMensaje.value.trim();
  if (!texto) return;

  socket.emit('mensaje', texto);

  inputMensaje.value = '';
});

inputMensaje.addEventListener('input', () => {
  socket.emit('escribiendo', miNombre);
});

socket.on('mensaje', (data) => pintarMensaje(data));

socket.on('sistema', (texto) => pintarSistema(texto));

socket.on('usuarios', (nombres) => {
  listaUsuarios.innerHTML = '';
  nombres.forEach((nombre) => {
    const li = document.createElement('li');
    li.textContent = nombre;
    listaUsuarios.appendChild(li);
  });
});

let temporizador;
socket.on('escribiendo', (nombre) => {
  escribiendo.textContent = `${nombre} está escribiendo...`;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    escribiendo.textContent = '';
  }, 1500);
});

function pintarMensaje({ autor, texto, hora }) {
  const li = document.createElement('li');
  li.className = autor === miNombre ? 'mensaje propio' : 'mensaje';
  li.innerHTML = `
    <span class="autor"></span>
    <span class="texto"></span>
    <time></time>`;
  li.querySelector('.autor').textContent = autor;
  li.querySelector('.texto').textContent = texto;
  li.querySelector('time').textContent = formatearHora(hora);
  mensajes.appendChild(li);
  mensajes.scrollTop = mensajes.scrollHeight;
}

function pintarSistema(texto) {
  const li = document.createElement('li');
  li.className = 'sistema';
  li.textContent = texto;
  mensajes.appendChild(li);
  mensajes.scrollTop = mensajes.scrollHeight;
}

function formatearHora(iso) {
  return new Date(iso).toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
