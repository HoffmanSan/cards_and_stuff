// Libs import
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import socketHandler from './config/socket.js';

// Initial config
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Initalize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'Frontend', 'dist')));

// Initialize server, pass the app to handle http traffic, initalize websocket instance
const server = createServer(app);
const io = new Server(server);

socketHandler(io)

app.post('/api/auth/login', (req, res) => {
  res.status(200).send()
})

app.post('/api/auth/register', (req, res) => {
  res.status(200).send()
})

app.get('/{*any}', (req, res) => {
  res.sendFile(join(__dirname, '..', 'Frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is up an running on port ${PORT}`);
});
