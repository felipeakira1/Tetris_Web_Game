function alterar_perfil(event) {
    event.preventDefault();

    let nome = document.getElementById('nome').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;

    let xhttp = new XMLHttpRequest();

    if(!xhttp) {
        alert("Não foi possível criar um objeto XMLHttpRequest");
        return false;
    }

    xhttp.onerror = function() {
        alert("Erro!");
    }

    xhttp.onload = function() {
        console.log(xhttp.responseText);
        if(xhttp.status === 200) {
            let resposta = JSON.parse(xhttp.responseText);
            mostrar_mensagem(resposta.message);
        } else {
            alert("erro");
        }
    }

    xhttp.open('POST', '../php/verificar_alterar_perfil.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(
        'nome=' + encodeURIComponent(nome) +
        '&telefone=' + encodeURIComponent(telefone) + 
        '&email=' + encodeURIComponent(email)
    );
}

function mostrar_mensagem(mensagem) {
    let div_mensagem = document.getElementById('div_mensagem');
    div_mensagem.style.display = 'block';

    let titulo_mensagem = document.getElementById('titulo-mensagem');
    titulo_mensagem.textContent = mensagem;
   

    let barra_progresso = document.getElementById('barra-progresso');
    
    barra_progresso.style.width = '0%';
    div_mensagem.style.display ='block';

    let time = 0;
    let intervalo = 20;
    let duracao = 2000;
    let timer = setInterval(function() {
        time += intervalo;
        let progresso = (time / duracao) * 100;
        barra_progresso.style.width = progresso + '%';

        if(time >= duracao) {
            clearInterval(timer);
            div_mensagem.style.display = 'none';
        }
    }, intervalo);
    setTimeout(function() {
        window.location.href ='Perfil.php';
    }, 2000);
}