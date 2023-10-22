var numLinhasEliminadas = 0;
var tabuleiroInvertido = 0;

// Objeto que contém informações sobre as linhas completas
let obj = {
    // Contador que verifica se uma linha foi completada, ao contar quantas células completas há naquela linha
    num_celulas_por_linha: 0,

    // Contador que armazena o número de linhas completadas de uma vez
    num_linhas_completas: 0,

    // Atributo que armazena o índice da primeira linha que foi completada
    indice_linha: Array(20).fill(0),

    pecaEspecial: false
};

pontuacao = 0;

function limparObjeto() {
    obj.num_celulas_por_linha = 0;
    obj.num_linhas_completas = 0;
    obj.indice_linha = Array(20).fill(0);
    obj.pecaEspecial = false;
}

function inverterTabuleiro() {
    console.log(tabuleiroInvertido)
    const tabuleiro = document.getElementById('tabuleiro');
    if(!tabuleiroInvertido) {
        tabuleiro.classList.add('inverter');
        tabuleiroInvertido = 1;
    } else {
        tabuleiro.classList.remove('inverter');
    }
}

function processarLinhasCompletas() {
    limparObjeto();
    verificarLinhasCompletas();

    if (obj.num_linhas_completas > 0) {
        if(obj.pecaEspecial === true) {
            inverterTabuleiro();
        }
        
        pontuacao += (obj.num_linhas_completas * 10) * obj.num_linhas_completas;
        document.getElementById("score-value").textContent = pontuacao;
        numLinhasEliminadas += 1 * obj.num_linhas_completas;
        document.getElementById("lines-value").textContent = `${numLinhasEliminadas}`;
        
        linhasCompletasEmBranco();
        atualizarTabuleiro(matriz);
        removerLinhas(obj);
    }
}


function verificarLinhasCompletas() {
    for (let i = 0; i < configs.NUM_LINHAS; i++) {

        obj.num_celulas_por_linha = 0;

        for (let j = 0; j < configs.NUM_COLUNAS; j++) {
            if (matriz[i][j] != 0) {
                obj.num_celulas_por_linha++;
            }
        }

        if (obj.num_celulas_por_linha === configs.NUM_COLUNAS) {
            obj.indice_linha[i] = 1;
            obj.num_linhas_completas++;
            for (let j = 0; j < configs.NUM_COLUNAS; j++) {
                if(matriz[i][j] === 17) {
                    obj.pecaEspecial = true;
                }
            }
        }
    }
}

// Função que adiciona animação para as linhas completas ficarem em branco
function linhasCompletasEmBranco() {
    for(let i = 0; i < configs.NUM_LINHAS; i++) {
        if(obj.indice_linha[i] === 1) {
            for (let j = 0; j < configs.NUM_COLUNAS; j++) {
                matriz[i][j] = 20;
            }
        }
    }
}

function tremer() {
    let tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.classList.add('tremer');
    setTimeout(() => {
        tabuleiro.classList.remove('tremer')
    }, 300);
}

function removerLinhas() {
    // Após 0,5s exuta a seguinte função:
    setTimeout(function () {
        // Array para armazenar os índices das linhas a serem removidas
        const indicesARemover = [];

        // Remove as linhas da matriz e atualiza o tabuleiro
         // Encontra os índices das linhas a serem removidas
         for (let i = 0; i < configs.NUM_LINHAS; i++) {
            if (obj.indice_linha[i] === 1) {
                indicesARemover.push(i);
            }
        }

        // Remove as linhas da matriz (começando pelas últimas)
        for (let i = indicesARemover.length - 1; i >= 0; i--) {
            matriz.splice(indicesARemover[i], 1);
        }

        // Adiciona n novas linhas ao topo da matriz e atualiza o tabuleiro
        for (let i = 0; i < obj.num_linhas_completas; i++) {
            const linha = Array(configs.NUM_COLUNAS).fill(0);
            matriz.unshift(linha);
            pecaAtual.y++;
        }
        atualizarTabuleiro(matriz);

    }, 500);
}

function verificarFimDeJogo() {
    
}
