import { iniciarJogo, pausarJogo, voltarJogo } from "./jogo.js";
import {moverPecaParaBaixo, moverPecaParaDireita, moverPecaParaEsquerda, moverPecaFinal, rotacionarPeca} from "./pecas.js"

// Iniciar jogo
const botaoIniciar = document.getElementById('btn-iniciar');
botaoIniciar.addEventListener('click', (event) => {
    event.preventDefault();
    iniciarJogo();
})

// Pausar jogo
const botaoPausar = document.getElementById('btn-pausar');
botaoPausar.addEventListener('click', (event) => {
    event.preventDefault();
    pausarJogo();
})

// Voltar jogo
const botaoVoltar = document.getElementById('btn-voltar');
botaoVoltar.addEventListener('click', event => {
    event.preventDefault();
    voltarJogo();
})

// Captura de eventos de teclado para movimentação da peça
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') {
        moverPecaParaBaixo();
    }
    if (event.key === 'ArrowLeft') {
        moverPecaParaEsquerda();
    }
    if (event.key === 'ArrowRight') {
        moverPecaParaDireita();
    }
    if (event.key === 'ArrowUp') {
        rotacionarPeca();
    }
    if (event.key === ' ') {
        event.preventDefault();
        moverPecaFinal();
    }
})