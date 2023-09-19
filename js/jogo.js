function pausarJogo() {
    document.getElementById("fundo-pausa").style.display = "block";
}

function voltarJogo() {
    document.getElementById("fundo-pausa").style.display = "none";
}


/* JOGO */
const NUM_COLUNAS = 10;
const NUM_LINHAS = 20;

const tabuleiro = document.getElementById('tabuleiro');
const matriz = [];

for (let i = 0; i < NUM_LINHAS; i++) {
    for(let j = 0; j < NUM_COLUNAS; j++) {
        const celula_fundo = document.createElement('div');
        celula_fundo.classList.add('celula_fundo');
        tabuleiro.appendChild(celula_fundo);
    }
    const linha = Array(NUM_COLUNAS).fill(0);
    matriz.push(linha);
}

console.log(matriz);

botaoIniciar = document.getElementById('btn-iniciar');
botaoIniciar.addEventListener('click', (event) => {
    
})