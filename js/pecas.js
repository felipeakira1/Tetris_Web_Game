import {configs, matriz, atualizarTabuleiro} from "./jogo.js";
import { pontuacao, processarLinhasCompletas } from "./linhasCompletas.js";
import { pausarCronometro } from "./cronometro.js";

const pecaAtual = {
    formato: null,
    x: 0,
    y: 0,
}

const proximaPeca = {
    formato: null,
}

let fimDeJogo = false;
let primeiraRodada = true;
let xPecaIndicador;
let yPecaIndicador;


const queda = {
    status: false,
    funcao: null,
    limite: 100,
    intervalo: 1000
}

const tiposPecas = [
    //4 retas, vermelho
    [[1], 
     [1], 
     [1], 
     [1]], 
    // L contrário, azul     
    [[0, 2],
     [0, 2],           
     [2, 2]],
    //joystick, verde
    [[0, 3, 0], 
     [3, 3, 3]], 
    //dado, amarelo
    [[4, 4], 
     [4, 4]],   
    // U, roxo
    [[5, 0, 5], 
     [5, 5, 5]], 
    // L, laranja
    [[6, 0],
     [6, 0],           
     [6, 6]],
    // peça especial
    [[7]]           
]

// Função para gerar uma nova peça aleatória
function gerarPeca() {
    let tipoPeca = Math.floor(Math.random() * tiposPecas.length); // Randomiza um número entre 0 e o tamanho da constante pecas
    return tiposPecas[tipoPeca];
}

function verificarFimDeJogo() {
    for(let linha = 0; linha < pecaAtual.formato.length; linha++) {
        for(let coluna = 0; coluna < pecaAtual.formato[0].length; coluna++) {
            if(pecaAtual.formato[linha][coluna] !== 0 && matriz[pecaAtual.y + linha][pecaAtual.x + coluna] > 0 && matriz[pecaAtual.y + linha][pecaAtual.x + coluna] < 20) {
                return true;
            }
        }
    }
    return false;
}

function exibirTelaFimDeJogo() {
    // Função para pausar o jogo
    document.getElementById("fundo-game-over").style.display = "block";
    pausarCronometro();
    queda.status = false;
    // Atualiza a pontuação e o tempo na tela de Game Over
    const pontuacaoGameOver = document.getElementById("pontuacao-gameover");
    const tempoGameOver = document.getElementById("tempo-gameover");
    const pontuacaoString = parseInt(pontuacao).toString();
    pontuacaoGameOver.textContent = pontuacaoString;
    tempoGameOver.textContent = document.getElementById("time-value").textContent;

}

// Função para adicionar a peça atual ao tabuleiro
function adicionarPecaAoTabuleiro() {
    if(fimDeJogo == false) {
        // Se não houver nenhuma peça no tabuleiro, cria uma nova peça para a peça atual e para a proxima peça
        if(primeiraRodada == true) {
            proximaPeca.formato = gerarPeca();
            pecaAtual.formato = gerarPeca();
            atualizarPainelProximaPeca();
            primeiraRodada = false;
        } else {
            // Define a peça atual como sendo a proxima peça que estava salva
            pecaAtual.formato = proximaPeca.formato;
            // Cria uma nova peça para a proxima peça
            proximaPeca.formato = gerarPeca();
            atualizarPainelProximaPeca();
        }


        pecaAtual.x = Math.floor(configs.NUM_COLUNAS/ 2) - 1; // Define a posição X inicial da peça
        pecaAtual.y = 0; // Define a posição Y inicial da peça
        if(verificarFimDeJogo()) {
            fimDeJogo = true;
            exibirTelaFimDeJogo();
        }
        desenharPecaAtual(0);
        desenharIndicador();
    }
    
    
    
}

function atualizarPainelProximaPeca() {
    const panelProximaPeca = document.getElementById("next-piece-preview");
    panelProximaPeca.innerHTML = '';

    const numLinhas = proximaPeca.formato.length;
    const numColunas = proximaPeca.formato[0].length;
    panelProximaPeca.style.width = `${numColunas * 25}px`;
    panelProximaPeca.style.height = `${numLinhas * 25}px`;

    for(let i = 0; i < numLinhas; i++) {
        for(let j = 0; j < numColunas; j++) {
            const celula = document.createElement('div');
            celula.classList.add('celulaProximaPeca');
            switch(proximaPeca.formato[i][j]) {
                case 1:
                    celula.classList.add('fundo-vermelho');
                    break;
                case 2:
                    celula.classList.add('fundo-azul');
                    break;
                case 3:
                    celula.classList.add('fundo-verde');
                    break;
                case 4:
                    celula.classList.add('fundo-amarelo');
                    break;
                case 5:
                    celula.classList.add('fundo-roxo');
                    break;
                case 6:
                    celula.classList.add('fundo-laranja');
                    break;
                case 7:
                    celula.classList.add('fundo-azul-claro');
            }
            panelProximaPeca.appendChild(celula);
        }
    }
}

function aumentarVelocidadeQueda() {
    if (pontuacao > 300) {
        if (queda.intervalo > queda.limite) {
            queda.intervalo -= 100; //Diminue 100ms do intervalo
        }
        clearInterval(queda.funcao); // Limpa o intervalo atual
        iniciarQueda(queda.intervalo); // Inicia um novo intervalo com a velocidade atualizada
    }
}

function limparPecaAtual() {
    for (let linha = 0; linha < pecaAtual.formato.length; linha++) {
        for (let coluna = 0; coluna < pecaAtual.formato[0].length; coluna++) {
            if (pecaAtual.formato[linha][coluna] != 0) {
                matriz[pecaAtual.y + linha][pecaAtual.x + coluna] = 0;
            }
        }
    }
}

function desenharPecaAtual(tipoCelula) {
    for (let i = 0; i < pecaAtual.formato.length; i++) {
        for (let j = 0; j < pecaAtual.formato[0].length; j++) {
            if (pecaAtual.formato[i][j] != 0) {
                matriz[pecaAtual.y + i][pecaAtual.x + j] = pecaAtual.formato[i][j] + tipoCelula;
            }
        }
    }
}

function moverPecaFinal() {
    limparPecaAtual();
    pecaAtual.y = yPecaIndicador;
    desenharPecaAtual(10);
    atualizarTabuleiro(matriz);

    processarLinhasCompletas();
    atualizarTabuleiro(matriz);
    tremer();
    adicionarPecaAoTabuleiro();
    aumentarVelocidadeQueda();
}

// Função para iniciar a queda da peça em intervalos regulares
function iniciarQueda() {
    if (!queda.status) {
        queda.funcao = setInterval(() => {
            moverPecaParaBaixo();
        }, queda.intervalo);
    }
}

// Função para verificar se é possível mover a peça para baixo
function podeMoverParaBaixo() {
    if ((pecaAtual.formato.length + pecaAtual.y >= configs.NUM_LINHAS)) {
        return false;
    } else {
        for (let i = pecaAtual.formato.length - 1; i >= 0; i--) {
            for (let j = pecaAtual.formato[0].length - 1; j >= 0; j--) {
                if (pecaAtual.formato[i][j] != 0 && matriz[pecaAtual.y + i + 1][pecaAtual.x + j] > 10 && matriz[pecaAtual.y + i + 1][pecaAtual.x + j] < 20) {
                    return false;
                }
            }
        }
    }
    return true;
}

function moverPecaParaBaixo() {
    if (queda.status) {
        return;
    }

    if (podeMoverParaBaixo()) {
        limparPecaAtual();
        atualizarTabuleiro(matriz);
        pecaAtual.y += 1;
        desenharPecaAtual(0);
        atualizarTabuleiro(matriz);
    } else {
        

        desenharPecaAtual(10);
        processarLinhasCompletas();
        atualizarTabuleiro(matriz);
        pecaAtual.formato = gerarPeca();
        adicionarPecaAoTabuleiro();
        aumentarVelocidadeQueda();
    }
}

function tremer() {
    let tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.classList.add('tremer');
    setTimeout(() => {
        tabuleiro.classList.remove('tremer')
    }, 300);
}

// Função para verificar se é possível mover a peça para a esquerda
function podeMoverParaEsquerda() {
    for (let i = 0; i < pecaAtual.formato.length; i++) {
        for (let j = 0; j < pecaAtual.formato[0].length; j++) {
            if (pecaAtual.formato[i][j] !== 0 && (pecaAtual.x + j <= 0 || matriz[pecaAtual.y + i][pecaAtual.x + j - 1] > 10)) {
                return false;
            }
        }
    }
    return true;
}

// Função para mover a peça para a esquerda
function moverPecaParaEsquerda() {
    if (podeMoverParaEsquerda()) {
        limparPecaAtual();
        atualizarTabuleiro(matriz);
        pecaAtual.x -= 1;
        desenharIndicador();
        desenharPecaAtual(0);
        atualizarTabuleiro(matriz);
    }
}

// Função para verificar se é possível mover a peça para a direita
function podeMoverParaDireita() {
    for (let i = 0; i < pecaAtual.formato.length; i++) {
        for (let j = 0; j < pecaAtual.formato[0].length; j++) {
            if (pecaAtual.formato[i][j] !== 0 && (pecaAtual.x + j >= configs.NUM_COLUNAS - 1 || matriz[pecaAtual.y + i][pecaAtual.x + j + 1] > 10)) {
                return false;
            }
        }
    }
    return true;
}

// Função para mover a peça para a direita
function moverPecaParaDireita() {
    if (podeMoverParaDireita()) {
        limparPecaAtual();
        atualizarTabuleiro(matriz);
        pecaAtual.x += 1;
        desenharIndicador()
        desenharPecaAtual(0);
        atualizarTabuleiro(matriz);
    }
}

function desenharIndicador() {
    for (let i = 0; i < configs.NUM_LINHAS; i++) {
        for (let j = 0; j < configs.NUM_COLUNAS; j++) {
            if (matriz[i][j] > 20) {
                matriz[i][j] = 0;
            }
        }
    }

    const tempx = pecaAtual.x;
    const tempy = pecaAtual.y;

    while (podeMoverParaBaixo()) {
        pecaAtual.y++;
    }

    const pecaIndicador = pecaAtual.formato;
    xPecaIndicador = pecaAtual.x;
    yPecaIndicador = pecaAtual.y;
    desenharPecaAtual(20);

    pecaAtual.x = tempx;
    pecaAtual.y = tempy;
    atualizarTabuleiro(matriz);
}

function rotacionarPeca() {
    const novaPeca = [];
    // Obtém o número de linhas e colunas da peça
    let numLinhas = pecaAtual.formato.length;
    let numColunas = pecaAtual.formato[0].length;
    for(let coluna = 0; coluna < numColunas; coluna++) {
        novaPeca[coluna] = [];
        for(let linha = numLinhas - 1; linha >= 0; linha--) {
            novaPeca[coluna].push(pecaAtual.formato[linha][coluna]);
        }
    }

    for(let linha = 0; linha < numLinhas; linha++) {
        for(let coluna = 0; coluna < numColunas; coluna++) {
            if(pecaAtual.formato[linha][coluna] != 0) {
                matriz[pecaAtual.y + linha][pecaAtual.x + coluna] = 0;
            }
            
        }
    }
    atualizarTabuleiro(matriz);

    pecaAtual.formato = novaPeca;
    numLinhas = pecaAtual.formato.length;
    numColunas = pecaAtual.formato[0].length;
    for(let linha = 0; linha < numLinhas; linha++) {
        for(let coluna = 0; coluna < numColunas; coluna++) {
            if(pecaAtual.formato[linha][coluna] != 0) {
                matriz[pecaAtual.y + linha][pecaAtual.x + coluna] = pecaAtual.formato[linha][coluna];
            }
        }
    }
    desenharIndicador();
    atualizarTabuleiro(matriz);
    return;
}

export { 
    adicionarPecaAoTabuleiro,
    iniciarQueda,
    moverPecaParaBaixo,
    moverPecaParaEsquerda,
    moverPecaParaDireita,
    moverPecaFinal,
    rotacionarPeca,
    pecaAtual
};
