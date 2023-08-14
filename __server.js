//Este arquivo é para função de enviar mensagem a partir do index.html ouvindo na porta
const express = require('express');
const app = express();
const path = require('path');
const port = 3001;


// Configura o servidor para lidar com requisições POST
app.use(express.urlencoded({ extended: false }));

// Rota para receber o formulário
app.post('/enviar', (req, res) => {
  const nome = req.body.nome;
  const number = req.body.number;
  const fluxo = req.body.fluxo;
  const convocacao = req.body.convocacao;

  // Chama a função connectToWhatsApp() passando os valores recebidos
  connectToWhatsApp(nome, number,fluxo,convocacao);

  // Envie uma resposta de sucesso ao formulário HTML
  res.send('Valores recebidos com sucesso!');
});

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
  console.log('Servidor iniciado na porta' + port);
});


// Função connectToWhatsApp com os parâmetros nome e number
function connectToWhatsApp(nome, number,fluxo,convocacao) {
  const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, sendMessage, MessageType, MessageOptions, Mimetype } = require("@whiskeysockets/baileys");
  const { Boom } = require('@hapi/boom');
  const { wp } = require('./sendMsg');
  //const { meuBot } = require('./bot');

  const msgEntrada = async function envMsg() {


    const { state, saveCreds } = await useMultiFileAuthState('auth/auth_info_baileys');
    const sock = makeWASocket({
      printQRInTerminal: true,
      auth: state,
      defaultQueryTimeoutMs: undefined,
    });

    sock.ev.on('connection.update', async(update) => {
      const { connection, lastDisconnect } = update;

      if (connection === 'open' && number !== '') {
       // sock.sendMessage(jid, { text: txt });.
      
      await wp(sock, number, nome, fluxo,convocacao);
       
      }
/*
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error instanceof Boom &&
          lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut);
        console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
        if (shouldReconnect) {
          connectToWhatsApp(nome, number);
        }
      }*/
    });
    sock.ev.on('creds.update', saveCreds);
  };
 
  msgEntrada();
 
   

}

