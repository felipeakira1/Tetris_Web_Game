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
        processarVelocidadeQueda();
    }
}

function moverPecaFinal() {
    limparPecaAtual();
    pecaAtual.y = yPecaIndicador;
    desenharPecaAtual(10);
    atualizarTabuleiro(matriz);

    processarLinhasCompletas();
    atualizarTabuleiro(matriz);
    // tremer();
    adicionarPecaAoTabuleiro();
    processarVelocidadeQueda();
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