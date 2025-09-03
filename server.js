const net = require('net');

const HOST = '127.0.0.1';
const PORT = 8080;
const NUM_CLIENTS = 2; 

const clients = [];
const clientTimeDiffs = new Map(); 

const server = net.createServer(socket => {
    console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
    clients.push(socket);

    socket.on('data', data => {
        const timeDiff = parseFloat(data.toString());
        console.log(`Recebida diferença de tempo do cliente ${socket.remoteAddress}:${socket.remotePort}: ${timeDiff.toFixed(4)}s`);
        clientTimeDiffs.set(socket, timeDiff);

        if (clientTimeDiffs.size === clients.length) {
            calculateAndSendAdjustments();
        }
    });

    socket.on('close', () => {
        console.log(`Cliente desconectado: ${socket.remoteAddress}:${socket.remotePort}`);
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
        clientTimeDiffs.delete(socket);
    });

    socket.on('error', err => {
        console.error(`Erro no socket do cliente: ${err.message}`);
    });

    if (clients.length === NUM_CLIENTS) {
        console.log(`\n${NUM_CLIENTS} clientes conectados. Iniciando a sincronização.`);
        setTimeout(startSynchronizationCycle, 1000);
    }
});

function startSynchronizationCycle() {
    console.log("\n--- Iniciando novo ciclo de sincronização ---");

    clientTimeDiffs.clear();
    
    console.log("Enviando solicitação de tempo para todos os clientes...");
    clients.forEach(client => {
        client.write("GET_TIME");
    });
}

function calculateAndSendAdjustments() {
    console.log("\nCalculando a média dos deslocamentos...");

    let totalDiff = 0;
    let timeDiffs = Array.from(clientTimeDiffs.values());
    timeDiffs.push(0);

    timeDiffs.forEach(diff => {
        totalDiff += diff;
    });

    const averageOffset = totalDiff / timeDiffs.length;
    console.log(`Diferenças coletadas (em segundos): [${timeDiffs.map(d => d.toFixed(4)).join(', ')}]`);
    console.log(`Média do deslocamento calculada: ${averageOffset.toFixed(4)}s`);
    
    clients.forEach(client => {
        const clientDiff = clientTimeDiffs.get(client);
        if (clientDiff !== undefined) {
            const adjustment = averageOffset - clientDiff;
            console.log(`Enviando ajuste de ${adjustment.toFixed(4)}s para ${client.remoteAddress}:${client.remotePort}`);
            client.write(adjustment.toString());
        }
    });

    console.log("--- Ciclo de sincronização concluído ---\n");
    
    setTimeout(startSynchronizationCycle, 30000);
}

server.listen(PORT, HOST, () => {
    console.log(`Servidor Berkeley aguardando conexões em ${HOST}:${PORT}`);
});