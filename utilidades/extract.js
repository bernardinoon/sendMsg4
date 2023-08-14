/*async function extract(msgRecebida){

const textMessage = msgRecebida.message?.conversation;
const extendedTextMessage = msgRecebida.message?.extendedTextMessage.text
const imageTextMessage = msgRecebida.message?.imageMessage?.caption

const fullMessage = textMessage || extendedTextMessage || imageTextMessage

if(!fullMessage){

    return{
        remoteJid: '',
        fullMessage: '',
        command: '',
        args: '',
        isImage: false
    }
}

const isImage = !!msgRecebida.message?.imageMessage ||
!!msgRecebida.message?extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

const [command, ...args] = fullMessage.trim().split('')
 
const arg = args.reduce((acc, arg) => acc + ' ' +arg, '').trim();

return{

remoteJid: msgRecebida?.key?.remoteJid,
fullMessage,
command:command.trim(),
args:arg.trim(),



}


}
module.exports = {


    extract,
}

*/