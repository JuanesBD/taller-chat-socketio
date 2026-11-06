# Chat en tiempo real con Socket.IO

**Estudiante:** [Tu nombre completo]
**Código:** [Tu código]
**Materia / grupo:** [...]
**Fecha de entrega:** [DD/MM/AAAA]
**Repositorio:** https://github.com/JuanesBD/taller-chat-socketio

---

## 1. Cómo correr el proyecto

```bash
git clone https://github.com/JuanesBD/taller-chat-socketio
cd taller-chat-socketio
npm install
npm start
```

Luego abre `http://localhost:3000` en **dos ventanas** del navegador
(una en modo incógnito) para chatear contigo mismo.

**Versión de Node usada:** v26.13.0

---

## 2. Eventos de Socket.IO que implementé

| Evento | Lo emite | Lo escucha | Qué datos lleva | Quién lo recibe |
|---|---|---|---|---|
| `entrar` | Cliente | Servidor | `nombre` (string) | Solo el servidor |
| `sistema` | Servidor | Cliente | `texto` (string): «X se unió al chat» / «X salió del chat» | Todos (`io.emit`) |
| `mensaje` (cliente → servidor) | Cliente | Servidor | `texto` (string); el autor NO viaja | Solo el servidor |
| `mensaje` (servidor → clientes) | Servidor | Cliente | `{ autor, texto, hora }` | Todos (`io.emit`) |
| `usuarios` | Servidor | Cliente | Array de nombres conectados | Todos (`io.emit`) |
| `escribiendo` (cliente → servidor) | Cliente | Servidor | `nombre` (el servidor lo ignora y usa `usuarios.get(socket.id)`) | Solo el servidor |
| `escribiendo` (servidor → clientes) | Servidor | Cliente | `nombre` de quien teclea | Todos menos quien teclea (`socket.broadcast.emit`) |
| `disconnect` | Socket.IO (automático) | Servidor | motivo de la desconexión | Solo el servidor |

---

## 3. Retos obligatorios

- [x] **Reto 1** — Entrar con un nombre y avisar al resto
- [x] **Reto 2** — Mandar y recibir mensajes en tiempo real
- [x] **Reto 3** — Lista de conectados que se actualiza
- [x] **Reto 4** — Indicador "está escribiendo"
- [x] **Reto 5** — Desconexión limpia (sale de la lista y avisa)

**¿Algo quedó a medias o no funciona?** Todo lo probé con dos clientes
conectados al mismo tiempo (entrada, mensajes, escritura, salida). [Añade aquí
cualquier cosa que notes al probarlo en el navegador.]

---

## 4. Retos extra que hice

| Reto extra | ¿Cómo lo resolví? |
|---|---|
| Validación de entrada en el servidor | El nombre se recorta a 20 caracteres y el mensaje a 500; se ignoran vacíos y mensajes de quien aún no entró. |

---

## 5. Capturas

<!-- Sube las imágenes a /capturas y deja los enlaces. Obligatoria: dos usuarios chateando con la lista visible. -->

![Dos usuarios chateando](capturas/chat.png)

![Lista de conectados](capturas/usuarios.png)

---

## 6. Lo que más me costó

[Escribe aquí en dos o tres frases qué se te atravesó y cómo lo resolviste.]

---

## 7. Preguntas de sustentación

**1. ¿En qué se diferencian `socket.emit`, `socket.broadcast.emit` e `io.emit`?**

[Con tus palabras: `socket.emit` le manda solo a ese cliente; `socket.broadcast.emit` a todos menos a ese; `io.emit` a todos, incluido él.]

**2. ¿Por qué el servidor no puede confiar en el nombre que manda el cliente?**

[...]

**3. ¿Qué pasa con el `Map` de usuarios si el servidor se reinicia? ¿Cómo lo arreglarías?**

[...]

**4. ¿Qué es el "fallback a long-polling" y cuándo entra en acción?**

[...]

**5. Si hubiera 10.000 usuarios, ¿por qué `io.emit` en cada tecla presionada sería un problema?**

[...]

---

## 8. Antes de entregar — revisa esto

- [x] `node_modules/` **no** está en el repo (revisa tu `.gitignore`)
- [ ] El repo es **público** y el link de arriba abre
- [x] Tengo **6 commits o más**, con mensajes que dicen qué hice
- [ ] Clonando el repo en limpio, `npm install && npm start` funciona
- [ ] Las capturas se ven en GitHub (no son links rotos)
- [ ] Llené todos los `[...]` de este archivo
- [x] Borré los comentarios de la plantilla

---

## Fuentes y ayuda

- [Documentación oficial de Socket.IO](https://socket.io/docs/v4/)
- Asistencia de Claude (IA) para implementar los TODO y probar el flujo con clientes simulados.
