const net = require('net');

const HOST = '127.0.0.1';
const PORT = 8080;

// Simula o relógio local do cliente com um deslocamento aleatório em milissegundos
// Deslocamento pode ser de -100 a +100 segundos
const timeOffset = (Math.random() * 200 - 100) * 1000;

// Função para obter o tempo simulado do cliente
function getClientTime() {
    return new Date(Date.now() + timeOffset);
}

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log(`Conectado ao servidor em ${HOST}:${PORT}`);
    console.log(`Meu relógio inicial (simulado): ${getClientTime().toISOString()}`);
});



client.on('data', data => {
    const message = data.toString();

    if (message === "GET_TIME") {
        const serverTimeEstimation = new Date();
        const clientSimulatedTime = getClientTime();

        const timeDifference = (clientSimulatedTime.getTime() - serverTimeEstimation.getTime()) / 1000.0;
        
        console.log(`\nServidor solicitou o tempo. Minha diferença é: ${timeDifference.toFixed(4)}s`);
        client.write(timeDifference.toString());

    } else {
        const adjustmentSeconds = parseFloat(message);
        if (!isNaN(adjustmentSeconds)) {
            console.log(`Recebido ajuste de ${adjustmentSeconds.toFixed(4)} segundos.`);
            
            const adjustmentMilliseconds = adjustmentSeconds * 1000;
            global.timeOffset += adjustmentMilliseconds;

            console.log(`Relógio ajustado para: ${getClientTime().toISOString()}`);
        }
    }
});

client.on('close', () => {
    console.log('Conexão com o servidor fechada.');
});

client.on('error', err => {
    console.error(`Erro de conexão: ${err.message}`);
});