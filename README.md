
# Berkeley Clock Synchronization Algorithm / Algoritmo de Sincronização de Relógios de Berkeley

## 🇧🇷 Português

### Descrição do Projeto

Este projeto é uma implementação do Algoritmo de Sincronização de Relógios de Berkeley, desenvolvido como parte do Trabalho Prático 02 da disciplina de Sistemas Distribuídos. O objetivo é demonstrar como um grupo de computadores (clientes) em um sistema distribuído pode sincronizar seus relógios internos com a ajuda de um nó coordenador (servidor).

O Algoritmo de Berkeley funciona da seguinte maneira:

1.  O servidor (mestre do tempo) solicita a hora de todos os clientes.
2.  Cada cliente calcula a diferença entre seu relógio e o do servidor e envia essa diferença de volta.
3.  O servidor calcula a média de todas as diferenças de tempo recebidas (incluindo a sua própria, que é zero).
4.  O servidor envia a cada cliente o ajuste necessário para que todos convirjam para o tempo médio do sistema.

A comunicação entre o servidor e os clientes é realizada utilizando Sockets TCP.

### Estrutura do Projeto

  * `server.js`: Contém o código do servidor mestre do tempo. Ele gerencia as conexões dos clientes, orquestra o processo de sincronização e calcula os ajustes de tempo.
  * `client.js`: Contém o código do cliente. Cada instância deste script simula um nó na rede com seu próprio relógio (com um deslocamento inicial aleatório) que se conecta ao servidor para ser sincronizado.
  * `package.json`: Arquivo de configuração do projeto Node.js.

### Como Executar

**Pré-requisitos:**

  * [Node.js](https://nodejs.org/) instalado.

**Passos:**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO
    ```

2.  **Abra 3 terminais** (ou mais, dependendo de quantos clientes você configurar no servidor).

3.  **No primeiro terminal, inicie o servidor:**
    O servidor irá iniciar e aguardar o número configurado de clientes se conectarem.

    ```bash
    node server.js
    ```

4.  **Em cada um dos outros terminais, inicie um cliente:**

    ```bash
    node client.js
    ```

5.  **Observe a saída:**

      * O terminal do servidor mostrará as conexões dos clientes e o log do processo de sincronização (diferenças recebidas, média calculada e ajustes enviados).
      * Os terminais dos clientes mostrarão seus tempos iniciais, as diferenças enviadas e o tempo ajustado após receberem a correção do servidor.
      * O ciclo de sincronização se repetirá a cada 30 segundos.

-----

## 🇬🇧 English

### Project Description

This project is an implementation of the Berkeley Clock Synchronization Algorithm, developed as part of a practical assignment for a Distributed Systems course. The goal is to demonstrate how a group of computers (clients) in a distributed system can synchronize their internal clocks with the help of a coordinator node (server).

The Berkeley Algorithm works as follows:

1.  The server (time master) requests the time from all clients.
2.  Each client calculates the difference between its clock and the server's and sends this difference back.
3.  The server calculates the average of all received time differences (including its own, which is zero).
4.  The server then sends each client the necessary adjustment for all clocks to converge to the system's average time.

Communication between the server and clients is handled using TCP Sockets.

### Project Structure

  * `server.js`: Contains the time master server code. It manages client connections, orchestrates the synchronization process, and calculates the time adjustments.
  * `client.js`: Contains the client code. Each instance of this script simulates a node in the network with its own clock (featuring an initial random offset) that connects to the server to be synchronized.
  * `package.json`: The configuration file for the Node.js project.

### How to Run

**Prerequisites:**

  * [Node.js](https://nodejs.org/) must be installed.

**Steps:**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **Open 3 terminal windows** (or more, depending on the number of clients configured in the server).

3.  **In the first terminal, start the server:**
    The server will start and wait for the configured number of clients to connect.

    ```bash
    node server.js
    ```

4.  **In each of the other terminals, start a client:**

    ```bash
    node client.js
    ```

5.  **Observe the output:**

      * The server's terminal will show client connections and log the synchronization process (differences received, average calculated, and adjustments sent).
      * The clients' terminals will display their initial times, the differences they send, and their adjusted time after receiving the correction from the server.
      * The synchronization cycle will repeat every 30 seconds.