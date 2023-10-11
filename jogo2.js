let tempoDecorrido = 0; // Inicializa o tempo decorrido em segundos
let cronometroInterval; // Variável para armazenar o intervalo do cronômetro
let pontuacao = 0;

// Função para iniciar o cronômetro
function iniciarCronometro() {
    cronometroInterval = setInterval(() => {
        tempoDecorrido++;
        atualizarTempo();
    }, 1000); // Atualiza o tempo a cada segundo (1000ms)
}

// Função para pausar o cronômetro
function pausarCronometro() {
    clearInterval(cronometroInterval); // Cancela o intervalo do cronômetro
}

// Função para continuar o cronômetro
function continuarCronometro() {
    iniciarCronometro(); // Inicia novamente o intervalo do cronômetro
}

// Função para pausar o jogo
function pausarJogo() {
    document.getElementById("fundo-pausa").style.display = "block";
    pausarCronometro();
}

// Função para voltar ao jogo após a pausa
function voltarJogo() {
    document.getElementById("fundo-pausa").style.display = "none";
    continuarCronometro();
}


/* JOGO */
const NUM_COLUNAS = 10;     // Número de colunas do tabuleiro pequeno
const NUM_LINHAS = 20;      // Número de linhas do tabuleiro pequeno
var INTERVALO_QUEDA = 1000; // Intervalo de queda inicial da peça em milissegundos
var quedaInterval = INTERVALO_QUEDA; //intervalo de queda dinamico
var limiteQueda = 100; // Limite de 100ms
var pecaAtual = null;       // Peça atual
var xPecaAtual;             // Posição X da peça atual
var yPecaAtual;             // Posição Y da peça atual
let funcao_queda;
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
function iniciarQueda(quedaInterval) {
    funcao_queda = setInterval(() => {
        moverPecaParaBaixo();
    }, quedaInterval);
}

// Função para aumentar a velocidade da queda a cada 300 pontos
function aumentarVelocidadeQueda() {
    if (pontuacao % 300 === 0) {
        if (quedaInterval > limiteQueda) {
            quedaInterval -= 100; // Diminue 100ms do intervalo
        }
        clearInterval(funcao_queda); // Limpa o intervalo atual
        iniciarQueda(quedaInterval); // Inicia um novo intervalo com a velocidade atualizada
    }
}

// Função para atualizar o painel de tempo com o tempo decorrido
function atualizarTempo() {
    const tempoElement = document.getElementById("time-value");
    const horas = Math.floor(tempoDecorrido / 3600);
    const minutos = Math.floor((tempoDecorrido % 3600) / 60);
    const segundos = tempoDecorrido % 60;
    tempoElement.textContent = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

// Configuração do botão de início
botaoIniciar = document.getElementById('btn-iniciar');
botaoIniciar.addEventListener('click', (event) => {
    pontuacao = 0;
    document.getElementById("score-value").textContent = pontuacao;
    event.preventDefault();
    clearInterval(funcao_queda);
    matriz = criarMatriz(NUM_LINHAS, NUM_COLUNAS);
    adicionarPecaAoTabuleiro();
    iniciarQueda(quedaInterval); // Inicie a queda com o intervalo atual
    iniciarCronometro();
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
    for(let i = 0; i < matriz.length; i++) {
        for(let j = 0; j < matriz[0].length; j++) {
            const celula = document.createElement('div'); // Cria um elemento <div> para representar uma célula do tabuleiro
            celula.classList.add('celula'); // Adiciona a classe 'celula' à célula
            if(matriz[i][j] === 1 || matriz[i][j] === 11) {
                celula.classList.add('fundo-vermelho');
            } else if(matriz[i][j] === 2 || matriz[i][j] === 12) {
                celula.classList.add('fundo-azul');
            } else if(matriz[i][j] === 20) {
                celula.classList.add('branco');
            }
            tabuleiro.appendChild(celula); // Adiciona a célula ao tabuleiro no HTML
        }
    }
}

const pecas = [
    [[2, 2],
     [2, 2],
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

function linhasCompletasEmBranco(obj) {
    // Calcular pontuação

    // Remover linhas completas
    for(let i = obj.indice_linha; i < (obj.indice_linha + obj.num_linhas_completas); i++) {
        for(let j = 0; j < NUM_COLUNAS; j++) {
            matriz[i][j] = 20;
        }
    }
}

function verificarLinhasCompletas() {

    // Objeto que contém informações sobre as linhas completas
    let obj = {
        // Contador que verifica se uma linha foi completada, ao contar quantas células completas há naquela linha
        num_celulas_por_linha: 0, 

        // Contador que armazena o número de linhas completadas de uma vez
        num_linhas_completas: 0, 

        // Atributo que armazena o índice da primeira linha que foi completada
        indice_linha: 0
    };

    for(let i = 0; i < NUM_LINHAS; i++) {
        obj.num_celulas_por_linha = 0;
        for(let j = 0; j < NUM_COLUNAS; j++) {
            if(matriz[i][j] != 0) {
                obj.num_celulas_por_linha++;
            }
        }

        if(obj.num_celulas_por_linha === NUM_COLUNAS) {
            if(obj.num_linhas_completas == 0)
                obj.indice_linha = i;
            
            obj.num_linhas_completas++;
            console.log("Linha: ", obj.indice_linha);
            console.log("Numero de linhas: " + obj.num_linhas_completas);
            console.table(matriz);
        }
    }

    return obj;
}

// Função para mover a peça para baixo
function tremer() {
    tabuleiro.classList.add('tremer');
    setTimeout(() => {
        tabuleiro.classList.remove('tremer')
    }, 300);
}

function removerLinhas(obj) {
    // Após 0,5s exuta a seguinte função:
    setTimeout(function() {
        // Remove as linhas da matriz e atualiza o tabuleiro
        matriz.splice(obj.indice_linha, obj.num_linhas_completas);
        atualizarTabuleiro();

        // Adiciona n novas linhas ao topo da matriz e atualiza o tabuleiro
        for(let i = 0; i < obj.num_linhas_completas; i++) {
            const linha = Array(NUM_COLUNAS).fill(0);
            matriz.unshift(linha);
            yPecaAtual++;
        }
        atualizarTabuleiro();

    }, 500);
}

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
        /*
            Bloco de código executado se não puder mais mover peça para baixo:
            1. Define o valor de cada célula da peça parada como +10
            2. Verifica se ao parar a peça, alguma linha é completada
            3. 
        */

        // 1. Define o valor de cada célula da peça parada como +10
        for(let i = 0; i < pecaAtual.length; i++) {
            for(let j = 0; j < pecaAtual[0].length; j++) {
                if(pecaAtual[i][j] != 0) {
                    matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j] + 10;
                }
            }
        }

        // 2. Verifica se ao parar a peça, alguma linha é completada
            /* A função verificarLinhasCompletas retorna um objeto com 
                atributos que representam informações sobre as linhas completadas*/
        let obj = verificarLinhasCompletas();
        if(obj.num_linhas_completas > 0) {
            // 3. Calcula a pontuação total
            pontuacao += obj.num_linhas_completas * 100; //total de pontos ganhos por linha
            document.getElementById("score-value").textContent = pontuacao; // Atualiza o elemento HTML com a pontuação
            
            // 4. Animação das linhas completadas desaparecendo
            linhasCompletasEmBranco(obj);
            tremer();
            atualizarTabuleiro();
            removerLinhas(obj);
         }

        atualizarTabuleiro();

        pecaAtual = gerarPeca();
        adicionarPecaAoTabuleiro();
        aumentarVelocidadeQueda();
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
            if(pecaAtual[i][j] != 0) {
                matriz[yPecaAtual + i][xPecaAtual + j] = pecaAtual[i][j];
            }
        }
    }
    atualizarTabuleiro();
}
