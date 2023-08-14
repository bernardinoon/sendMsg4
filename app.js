const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, sendMessage, MessageType, MessageOptions, Mimetype } = require("@whiskeysockets/baileys");
const { Boom } = require('@hapi/boom');
const { meuBot,msgBot } = require('./utilidades/bot');



async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth/auth_info_baileys');
  
    const sock = makeWASocket({
    
      printQRInTerminal: true,
      auth: state,
      defaultQueryTimeoutMs: undefined,
     
    });
    const jid = '55' + '21988642844' + '@s.whatsapp.net';
    sock.ev.on('connection.update', async(update) => {
      const { connection, lastDisconnect } = update;
     if (connection === 'open' ) {
    //sock, number, nome
    //await meuBot(sock);

    await sock.sendMessage(jid, { text: 'texto teste' });
    }
  
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error instanceof Boom &&
          lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut);
        console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
        if (shouldReconnect) {
          connectToWhatsApp();
        }
      }
    });
    
    sock.ev.on('creds.update', saveCreds);
 
    
}

connectToWhatsApp();