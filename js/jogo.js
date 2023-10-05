// Função para pausar o jogo
function pausarJogo() {
    document.getElementById("fundo-pausa").style.display = "block";
}

// Função para voltar ao jogo após a pausa
function voltarJogo() {
    document.getElementById("fundo-pausa").style.display = "none";
}


/* JOGO */
const NUM_COLUNAS = 10;     // Número de colunas do tabuleiro pequeno
const NUM_LINHAS = 20;      // Número de linhas do tabuleiro pequeno
var INTERVALO_QUEDA = 1000; // Intervalo de queda inicial da peça em milissegundos
var pecaAtual = null;       // Peça atual
var xPecaAtual;             // Posição X da peça atual
var yPecaAtual;             // Posição Y da peça atual

const tabuleiro = document.getElementById('tabuleiro'); // Elemento do tabuleiro no HTML
var matriz = []; // Matriz representando o tabuleiro

// Função para criar uma matriz com linhas e colunas preenchidas com zeros
function criarMatriz(linhas, colunas) {
    const matriz = []; // Limpa o conteúdo do tabuleiro
    for(let i = 0; i < linhas; i++) {
        const linha = Array(colunas).fill(0);
        matriz.push(linha);
    }
    return matriz;
}

// Função para iniciar a queda da peça em intervalos regulares
function iniciarQueda() {
    setInterval(() => {
        moverPecaParaBaixo();
    }, INTERVALO_QUEDA);
}

// Configuração do botão de início
botaoIniciar = document.getElementById('btn-iniciar');
botaoIniciar.addEventListener('click', (event) => {
    event.preventDefault();
    matriz = criarMatriz(NUM_LINHAS, NUM_COLUNAS);
    adicionarPecaAoTabuleiro();
    iniciarQueda();
})

// Captura de eventos de teclado para movimentação da peça
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

// Função para atualizar a aparência do tabuleiro no HTML
function atualizarTabuleiro() {
    tabuleiro.innerHTML = '';
    for(let i = 0; i < NUM_LINHAS; i++) {
        for(let j = 0; j < NUM_COLUNAS; j++) {
            const celula = document.createElement('div'); // Cria um elemento <div> para representar uma célula do tabuleiro
            celula.classList.add('celula'); // Adiciona a classe 'celula' à célula
            if(matriz[i][j] === 1 || matriz[i][j] === 11) {
                celula.classList.add('fundo-vermelho');
            } else if(matriz[i][j] === 2 || matriz[i][j] === 12) {
                celula.classList.add('fundo-azul');
            }
            tabuleiro.appendChild(celula); // Adiciona a célula ao tabuleiro no HTML
        }
    }
}

const pecas = [
    [[2, 0],
     [2, 0],
     [2, 2]]
]

// Função para gerar uma nova peça aleatória
function gerarPeca() {
    let tipoPeca = Math.floor(Math.random() * pecas.length); // Randomiza um número entre 0 e o tamanho da constante pecas
    return pecas[tipoPeca];
}

// Função para adicionar a peça atual ao tabuleiro
function adicionarPecaAoTabuleiro() {
    // Inserir verificação se é possível adicionar mais uma peça ao tabuleiro
    // if(!verificarFimJogo()) {
    pecaAtual = gerarPeca(); // Gera uma nova peça aleatória
    xPecaAtual = Math.floor(NUM_COLUNAS / 2) - 1; // Define a posição X inicial da peça
    yPecaAtual = 0; // Define a posição Y inicial da peça

    // Atualiza a matriz do tabuleiro com a posição da nova peça
    for(let i = 0; i < pecaAtual.length; i++) {
        for(let j = 0; j < pecaAtual[0].length; j++) {
            matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j];
        }
    }
    atualizarTabuleiro(); // Atualiza a aparência do tabuleiro no HTML
}

// Função para verificar se é possível mover a peça para baixo
function podeMoverParaBaixo() {
    if((pecaAtual.length + yPecaAtual >= NUM_LINHAS)) {
        return false;
    } else {
        for(let i = pecaAtual.length - 1; i >= 0; i--) {
            for(let j = pecaAtual[0].length - 1; j >= 0; j--) {
                if(pecaAtual[i][j] != 0 && matriz[yPecaAtual + i + 1][xPecaAtual + j] > 10) {
                    return false;
                }
            }
        }
    }
    return true;
}

function verificarLinhasCompletas() {
    let num_celulas_por_linha = 0;
    let num_linhas_completas = 0;
    for(let i = 0; i < NUM_LINHAS; i++) {
        num_linhas_completas = 0;
        for(let j = 0; j < NUM_COLUNAS; j++) {
            if(matriz[i][j] != 0) {
                num_celulas_por_linha++;
            }
        }
        if(num_celulas_por_linha === NUM_COLUNAS) {
            num_linhas_completas++;
        }
    }
    return num_linhas_completas;
}

// Função para mover a peça para baixo
function moverPecaParaBaixo() {
    if(podeMoverParaBaixo()) {
        for(let i = 0; i < pecaAtual.length; i++) {
            for(let j = 0; j < pecaAtual[0].length; j++) {
                if(pecaAtual[i][j] != 0) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = 0;
                }
            }
        }
        atualizarTabuleiro();
        yPecaAtual += 1;
        for(let i = 0; i < pecaAtual.length; i++) {
            for(let j = 0; j < pecaAtual[0].length; j++) {
                if(pecaAtual[i][j] != 0) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j];
                }
            }
        }
        atualizarTabuleiro();
    } else {
        for(let i = 0; i < pecaAtual.length; i++) {
            for(let j = 0; j < pecaAtual[0].length; j++) {
                if(pecaAtual[i][j] != 0) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j] + 10;
                }
            }
        }
        let num_linhas_completas = verificarLinhasCompletas();
        
        moverLinhasParaBaixo(num_linhas_completas);

        atualizarTabuleiro();
        pecaAtual = gerarPeca();
        adicionarPecaAoTabuleiro();
    }
    
}

// Função para mover a peça para a esquerda
function moverPecaParaEsquerda() {
    for(let i = 0; i < pecaAtual.length; i++) {
        for(let j = 0; j < pecaAtual[0].length; j++) {
            if(pecaAtual[i][j] != 0) {
                matriz[yPecaAtual + i][xPecaAtual + j] = 0;
            }
        }
    }
    atualizarTabuleiro();
    xPecaAtual -= 1;
    for(let i = 0; i < pecaAtual.length; i++) {
        for(let j = 0; j < pecaAtual[0].length; j++) {
            if(pecaAtual[i][j] != 0) {
                matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j];
            }
        }
    }
    atualizarTabuleiro();
}

// Função para mover a peça para a direita
function moverPecaParaDireita() {
    for(let i = 0; i < pecaAtual.length; i++) {
        for(let j = 0; j < pecaAtual[0].length; j++) {
            if(pecaAtual[i][j] != 0) {
                matriz[yPecaAtual + i][xPecaAtual + j] = 0;
            }
        }
    }
    atualizarTabuleiro();
    xPecaAtual += 1;
    for(let i = 0; i < pecaAtual.length; i++) {
        for(let j = 0; j < pecaAtual[0].length; j++) {
            console.log(yPecaAtual)
            console.log(xPecaAtual)
            if(pecaAtual[i][j] != 0) {
                matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j];
            }
        }
    }
    atualizarTabuleiro();
}

