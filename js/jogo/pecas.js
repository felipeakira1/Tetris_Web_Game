const pecaAtual = {
    formato: null,
    x: 0,
    y: 0,
}

const proximaPeca = {
    formato: null,
}

var fimDeJogo = false;
var primeiraRodada = true;
var xPecaIndicador;
var yPecaIndicador;
var nivel = 1;

const queda = {
    status: false, // false = caindo, true = parar
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
            salvarDadosPartida();
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

var marcaTrezentos = false;
var marcaSeiscentos = false;
var marcaNovecentos = false;
var marcaMilDuzentos = false;

function aumentarVelocidadeQueda() {
    const levelValue = document.getElementById('level-value');
    const intervaloReducao = 150;

    queda.intervalo -= intervaloReducao;
    clearInterval(queda.funcao);
    iniciarQueda(queda.intervalo);
    nivel++;
    levelValue.textContent = nivel;
}

// Função que aumenta a velocidade de queda da peça a cada 300 pontos
function processarVelocidadeQueda() {
    if(pontuacao >= 300 && pontuacao < 600 && !marcaTrezentos) {
        aumentarVelocidadeQueda();
        marcaTrezentos = true;
    } else if(pontuacao >= 600 && pontuacao < 900 && !marcaSeiscentos) {
        aumentarVelocidadeQueda();
        marcaSeiscentos = true;
    } else if(pontuacao >= 900 && pontuacao < 1200 && !marcaNovecentos) {
        aumentarVelocidadeQueda();
        marcaNovecentos = true;
    } else if(pontuacao >= 1200 && pontuacao < 1500 && !marcaMilDuzentos) {
        aumentarVelocidadeQueda();
        marcaMilDuzentos = true;
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

// Função para iniciar a queda da peça em intervalos regulares
function iniciarQueda() {
    if (!queda.status) {
        queda.funcao = setInterval(() => {
            moverPecaParaBaixo();
        }, queda.intervalo);
    }
}

function tremer() {
    let tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.classList.add('tremer');
    setTimeout(() => {
        tabuleiro.classList.remove('tremer')
    }, 300);
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