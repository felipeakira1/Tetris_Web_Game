let matriz = [];
let pontuacao = 0;
let dificuldade = 1;

function iniciarJogo() {
    // Limpar as informações
    pontuacao = 0;
    document.getElementById("score-value").textContent = pontuacao;
    document.getElementById("time-value").textContent = "00:00:00";
    document.getElementById("lines-value").textContent = 0;
    document.getElementById("level-value").textContent = `${dificuldade}`;
    matriz = criarMatriz(configs.NUM_LINHAS, configs.NUM_COLUNAS);
    adicionarPecaAoTabuleiro(matriz);
    atualizarTabuleiro(matriz);
    iniciarCronometro();
    iniciarQueda();
}

function pausarJogo() {
    document.getElementById("fundo-pausa").style.display = "block";
    pausarCronometro();
    queda.status = true;
}

// Função para voltar ao jogo após a pausa
function voltarJogo() {
    document.getElementById("fundo-pausa").style.display = "none";
    continuarCronometro();
    queda.status = false;
}

// Função para criar uma matriz com linhas e colunas preenchidas com zeros
function criarMatriz(linhas, colunas) {
    const matriz = []; // Limpa o conteúdo do tabuleiro
    for (let i = 0; i < linhas; i++) {
        const linha = Array(colunas).fill(0);
        matriz.push(linha);
    }
    return matriz;
}

function valorClasse(valorMatriz) {
    switch(valorMatriz) {
        case 1:
        case 11:
            return 'fundo-vermelho'
        case 2:
        case 12:
            return 'fundo-azul'
        case 3:
        case 13:
            return 'fundo-verde'
        case 4:
        case 14:
            return 'fundo-amarelo'
        case 5:
        case 15:
            return 'fundo-roxo'
        case 6:
        case 16:
            return 'fundo-laranja'
        case 7:
        case 17:
            return 'fundo-azul-claro'
        case 20:
            return 'branco'
        case 21:
            return 'visual-vermelho'
        case 22:
            return 'visual-azul'
        case 23:
            return 'visual-verde'
        case 24:
            return 'visual-amarelo'
        case 25:
            return 'visual-roxo'
        case 26:
            return 'visual-laranja'
        case 27:
            return 'visual-azul-claros'
    }
}

// Função para atualizar a aparência do tabuleiro no HTML
function atualizarTabuleiro(matriz) {
    const tabuleiro = document.getElementById('tabuleiro'); // Elemento do tabuleiro no HTML
    tabuleiro.innerHTML = '';

    if(!matriz) {
        console.error('Matriz é indefinida ou nula.');
        return;
    }
    
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            const valorMatriz = matriz[i][j];
            const celula = document.createElement('div'); // Cria um elemento <div> para representar uma célula do tabuleiro
            if(configs.NUM_COLUNAS == 10) {
                celula.classList.add('celula'); // Adiciona a classe 'celula' à célula
            } else {
                celula.classList.add('celulaPequena')
            }
            celula.classList.add(`${valorClasse(valorMatriz)}`)
            tabuleiro.appendChild(celula); // Adiciona a célula ao tabuleiro no HTML
        }
    }
}