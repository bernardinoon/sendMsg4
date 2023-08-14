const msg1 = "Olá estou testando meu atendente virtual" + "\n" +
"Se deseja falar sobre aulas, escreva - *Aula*";
var count = 0;
async function meuBot(sock) {
    sock.ev.on('messages.upsert', async ({ messages }) => {
      
     console.log(messages)
      
     const msgRecebida = messages[0];

      const textMessage = msgRecebida.message?.conversation;
    /*  const textMessage2 = msgRecebida.message?.conversation?.text;
const extendedTextMessage = msgRecebida.message?.extendedTextMessage?.text;
const imageTextMessage = msgRecebida.message?.imageMessage?.caption;
const stickerMessage = msgRecebida.message?.stickerMessage;
const fullMessage = textMessage || extendedTextMessage || imageTextMessage || stickerMessage || textMessage2;
*/

var resposta = textMessage.toLowerCase();

const remetente = msgRecebida.key.remoteJid
const nome = msgRecebida.pushName
const fromMe = msgRecebida.key.fromMe
      


      const txtIntro = "Olá " + nome + "\n" +
      "Em função da grande demanda de trabalho criei um atendente virtual especialmente pra *VOCÊ*!!!" + "\n" +
      "Se deseja falar sobre site, digite: *Site*" +"\n" +
      "Se deseja falar sobre shows ou eventos, digite: *Eventos*" +"\n" +
      "Assunto particular digite: *Particular*";
      


    
      if (msgRecebida.message = resposta && count == 0 ){
        //const jid = '55' + "21988642844" + '@s.whatsapp.net';
        await sock.sendMessage(remetente, { text: txtIntro });
        count++;
       
      }
    
      //Iniciando tratamento para resposta COUNT 1
     
    if (count === 1 && resposta === "site"){
            await sock.sendMessage(remetente, { text: "Entendi." + "\n" + "Você deseja obter informações sobre site!" + "\n"+
        "Você já possui um site conosco?" + "\n" +
    "Digite: *Sim* ou *Não*" });
    count++;
}else if (count === 1 && resposta === "eventos"){
    await sock.sendMessage(remetente, { text: "Entendi." + "\n" + "Você deseja obter informações sobre Eventos!" + "\n"+
"Você já possui um evento confirmado conosco?" + "\n" +
"Digite: *Sim* ou *Não*" });
count++;
}else if (count === 1 && resposta === "particular"){
    await sock.sendMessage(remetente, { text: "Entendi." + "\n" + "Você deseja falar diretamente comigo!" + "\n"+
"Estou enviando uma notificação de assunto *URGENTE*" + "\n" +
"Aguarde que assim que possível retornarei o contato!" });
count++;
}

    });
}
  
  module.exports = {
    meuBot,
  };
  