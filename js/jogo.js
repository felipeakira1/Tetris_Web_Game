function pausarJogo() {
    document.getElementById("fundo-pausa").style.display = "block";
}

function voltarJogo() {
    document.getElementById("fundo-pausa").style.display = "none";
}


/* JOGO */
const NUM_COLUNAS = 10;
const NUM_LINHAS = 20;
const INTERVALO_QUEDA = 1000;
let pecaAtual = null;
let xPecaAtual;
let yPecaAtual;

const tabuleiro = document.getElementById('tabuleiro');
let matriz = [];

function criarMatriz(linhas, colunas) {
    const matriz = [];
    for(let i = 0; i < linhas; i++) {
        const linha = Array(colunas).fill(0);
        matriz.push(linha);
    }
    return matriz;
}

function atualizarTabuleiro() {
    tabuleiro.innerHTML = '';
    for(let i = 0; i < NUM_LINHAS; i++) {
        for(let j = 0; j < NUM_COLUNAS; j++) {
            const celula = document.createElement('div');
            celula.classList.add('celula');
            if(matriz[i][j] === 1) {
                celula.classList.add('fundo-vermelho');
            } else if (matriz[i][j] === 11) {
                celula.classList.add('fundo-vermelho');
            }
            tabuleiro.appendChild(celula);
        }
    }
    console.log(matriz);
}

const pecas = [
    [[1],
     [1],
     [1],
     [1]],
    [[1, 1],
     [0, 1],
     [0, 1]],
    [[1, 0],
     [1, 1],
     [0, 1]],
    [[1, 1],
     [1, 1]],
    [[1]]
]

function gerarPeca() {
    let tipoPeca = Math.floor(Math.random() * pecas.length);
    return pecas[tipoPeca];
}

function adicionarPecaAoTabuleiro() {
    pecaAtual = gerarPeca();
    xPecaAtual = Math.floor(NUM_COLUNAS / 2) - 1;
    yPecaAtual = 0;

    for(let i = 0; i < pecaAtual.length; i++) {
        for(let j = 0; j < pecaAtual[0].length; j++) {
            matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j];
        }
    }
    atualizarTabuleiro();
}

// Função para verificar se é possível mover a peça para baixo
function podeMoverParaBaixo() {
    if((pecaAtual.length + yPecaAtual >= NUM_LINHAS)) {
        return false;
    } else {
        for(let i = pecaAtual.length - 1; i >= 0; i--) {
            for(let j = pecaAtual[0].length - 1; j >= 0; j--) {
                console.log("Linha:" + i);
                console.log("Coluna:" + j);
                if(pecaAtual[i][j] === 1) {
                    if (matriz[yPecaAtual + i + 1][xPecaAtual + j] > 1) {
                        return false;
                    }
                }
                console.log("Proxima peca")
            }
        }
    }
    return true;
}

// Função para mover a peça para baixo
function moverPecaParaBaixo() {
    if(podeMoverParaBaixo()) {
        for(let i = 0; i < pecaAtual.length; i++) { // LINHA
            for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
                if(pecaAtual[i][j] === 1) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = 0;
                }
            }
        }
        atualizarTabuleiro();
        yPecaAtual += 1;
        for(let i = 0; i < pecaAtual.length; i++) { // LINHA
            for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
                if(pecaAtual[i][j] === 1) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = 1;
                }
            }
        }
        atualizarTabuleiro();
    } else {
        for(let i = 0; i < pecaAtual.length; i++) { // LINHA
            for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
                if(pecaAtual[i][j] === 1) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = 11;
                }
            }
        }
        atualizarTabuleiro();
        pecaAtual = gerarPeca();
        adicionarPecaAoTabuleiro();
    }
    
}

function moverPecaParaEsquerda() {
    for(let i = 0; i < pecaAtual.length; i++) { // LINHA
        for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
            if(pecaAtual[i][j] === 1) {
                matriz[yPecaAtual + i][xPecaAtual + j] = 0;
            }
        }
    }
    atualizarTabuleiro();
    xPecaAtual -= 1;
    for(let i = 0; i < pecaAtual.length; i++) { // LINHA
        for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
            if(pecaAtual[i][j] === 1) {
                matriz[yPecaAtual + i][xPecaAtual + j] = 1;
            }
        }
    }
    atualizarTabuleiro();
}

function moverPecaParaDireita() {
    for(let i = 0; i < pecaAtual.length; i++) { // LINHA
        for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
            console.log(yPecaAtual)
            console.log(xPecaAtual)
            if(pecaAtual[i][j] === 1) {
                matriz[yPecaAtual + i][xPecaAtual + j] = 0;
            }
        }
    }
    atualizarTabuleiro();
    xPecaAtual += 1;
    for(let i = 0; i < pecaAtual.length; i++) { // LINHA
        for(let j = 0; j < pecaAtual[0].length; j++) { // COLUNA
            console.log(yPecaAtual)
            console.log(xPecaAtual)
            if(pecaAtual[i][j] === 1) {
                matriz[yPecaAtual + i][xPecaAtual + j] = 1;
            }
        }
    }
    atualizarTabuleiro();
}

function iniciarQueda() {
    setInterval(() => {
        moverPecaParaBaixo();
    }, INTERVALO_QUEDA);
}

botaoIniciar = document.getElementById('btn-iniciar');
botaoIniciar.addEventListener('click', (event) => {
    event.preventDefault();
    matriz = criarMatriz(NUM_LINHAS, NUM_COLUNAS);
    adicionarPecaAoTabuleiro();
    iniciarQueda();
})

document.addEventListener('keydown', function(event) {
    if(event.key === 'ArrowDown') {
        moverPecaParaBaixo();
    }
    if(event.key === 'ArrowLeft') {
        moverPecaParaEsquerda();
    }
    if(event.key === 'ArrowRight') {
        moverPecaParaDireita();
    }
})