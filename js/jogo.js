import { iniciarCronometro, pausarCronometro, continuarCronometro } from "./cronometro.js";
import { adicionarPecaAoTabuleiro, iniciarQueda} from "./pecas.js";
// Variáveis globais

const configs = {
    NUM_COLUNAS: 10,
    NUM_LINHAS: 20,
    INTERVALO_QUEDA: 1000,
}

let matriz = [];
let pontuacao = 0;

function iniciarJogo() {
    // Limpar as informações
    pontuacao = 0;
    document.getElementById("score-value").textContent = pontuacao;
    document.getElementById("time-value").textContent = "00:00:00";
    document.getElementById("lines-value").textContent = "0";
    document.getElementById("level-value").textContent = "1";
    matriz = criarMatriz(configs.NUM_LINHAS, configs.NUM_COLUNAS);
    adicionarPecaAoTabuleiro(matriz);
    atualizarTabuleiro(matriz);
    iniciarCronometro();
    iniciarQueda();
}

function pausarJogo() {
    document.getElementById("fundo-pausa").style.display = "block";
    pausarCronometro();
    // quedaPausada = true;
}

// Função para voltar ao jogo após a pausa
function voltarJogo() {
    document.getElementById("fundo-pausa").style.display = "none";
    continuarCronometro();
    // quedaPausada = false;
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

// Função para atualizar a aparência do tabuleiro no HTML
function atualizarTabuleiro(matriz) {
    let tabuleiro = document.getElementById('tabuleiro'); // Elemento do tabuleiro no HTML
    tabuleiro.innerHTML = '';

    if(!matriz) {
        console.error('Matriz é indefinida ou nula.');
        return;
    }
    
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            const celula = document.createElement('div'); // Cria um elemento <div> para representar uma célula do tabuleiro
            celula.classList.add('celula'); // Adiciona a classe 'celula' à célula
            if (matriz[i][j] === 1 || matriz[i][j] === 11) {
                celula.classList.add('fundo-vermelho');
            } else if (matriz[i][j] === 2 || matriz[i][j] === 12) {
                celula.classList.add('fundo-azul');
            } else if (matriz[i][j] === 3 || matriz[i][j] === 13) {
                celula.classList.add('fundo-verde');
            } else if (matriz[i][j] === 4 || matriz[i][j] === 14) {
                celula.classList.add('fundo-amarelo');
            } else if (matriz[i][j] === 5 || matriz[i][j] === 15) {
                celula.classList.add('fundo-roxo');
            } else if (matriz[i][j] === 6 || matriz[i][j] === 16) {
                celula.classList.add('fundo-laranja');
            } else if (matriz[i][j] === 7 || matriz[i][j] === 17) {
                celula.classList.add('fundo-azul-claro');
            } else if (matriz[i][j] === 20) {
                celula.classList.add('branco');
            } else if (matriz[i][j] === 21) {
                celula.classList.add('visual-vermelho');
            } else if (matriz[i][j] === 22) {
                celula.classList.add('visual-azul');
            } else if (matriz[i][j] === 23) {
                celula.classList.add('visual-verde');
            } else if (matriz[i][j] === 24) {
                celula.classList.add('visual-amarelo');
            } else if (matriz[i][j] === 25) {
                celula.classList.add('visual-roxo');
            } else if (matriz[i][j] === 26) {
                celula.classList.add('visual-laranja');
            } else if (matriz[i][j] === 27) {
                celula.classList.add('visual-azul-claros');
            }
            tabuleiro.appendChild(celula); // Adiciona a célula ao tabuleiro no HTML
        }
    }
}

export { configs, matriz, iniciarJogo, pausarJogo, voltarJogo, atualizarTabuleiro };