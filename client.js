const net = require('net');

const HOST = '127.0.0.1';
const PORT = 8080;

// Simula o relógio local do cliente com um deslocamento aleatório em milissegundos
// Deslocamento pode ser de -100 a +100 segundos
let timeOffset = (Math.random() * 200 - 100) * 1000;

function getClientTime(serverTime = new Date()) {
    return new Date(serverTime.getTime() + timeOffset);
}

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Conectado ao servidor em ${HOST}:${PORT}`);
    console.log(`Meu relógio inicial (simulado): ${getClientTime().toISOString()}`);
});

client.on('data', data => {
    const messageString = data.toString();
    
    const parsedMessage = JSON.parse(messageString);

    if (parsedMessage.type === 'time_request') {
        const serverTime = new Date(parsedMessage.payload);
        const clientTime = getClientTime(serverTime);

        const timeDifference = (clientTime.getTime() - serverTime.getTime()) / 1000.0;
        
        console.log(`\nRecebido pedido de tempo do servidor com o timestamp: ${serverTime.toISOString()}`);
        console.log(`Meu tempo simulado é:         ${clientTime.toISOString()}`);
        console.log(`Enviando minha diferença: ${timeDifference.toFixed(4)}`);
        
        client.write(timeDifference.toString());

    } else if (parsedMessage.type === 'adjustment') {
        const adjustmentSeconds = parsedMessage.payload;
        
        console.log(`\nRecebido ajuste de ${adjustmentSeconds.toFixed(4)} milissegundos.`);
        
        const adjustmentMilliseconds = adjustmentSeconds * 1000;
        timeOffset += adjustmentMilliseconds;

        console.log(`Relógio ajustado`);
    }
});

client.on('close', () => {
    console.log('Conexão com o servidor fechada.');
});

client.on('error', err => {
    console.error(`Erro de conexão: ${err.message}`);
});