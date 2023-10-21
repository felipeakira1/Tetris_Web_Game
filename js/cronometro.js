let tempoDecorrido = 0;
let cronometroInterval;


function iniciarCronometro() {
    cronometroInterval = setInterval(() => {
        tempoDecorrido++;
        atualizarTempo();
    }, 1000);
}

// Função para pausar o cronômetro
function pausarCronometro() {
    clearInterval(cronometroInterval); // Cancela o intervalo do cronômetro
}

// Função para continuar o cronômetro
function continuarCronometro() {
    iniciarCronometro(); // Inicia novamente o intervalo do cronômetro
}

// Função para atualizar o painel de tempo com o tempo decorrido
function atualizarTempo() {
    const tempoElement = document.getElementById("time-value");
    const horas = Math.floor(tempoDecorrido / 3600);
    const minutos = Math.floor((tempoDecorrido % 3600) / 60);
    const segundos = tempoDecorrido % 60;
    tempoElement.textContent = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
