function verificar_login(event) {
    event.preventDefault();
    
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    if(!email || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    let xhttp = new XMLHttpRequest();

    if(!xhttp) {
        alert("Não foi possível criar um objeto XMLHttpRequest");
        return false;
    }

    xhttp.onerror = function() {
        alert("Erro!");
    }

    xhttp.onload = function() {
        if(xhttp.status === 200) {
            try {
                let resposta = JSON.parse(xhttp.responseText);

                if(resposta.status === "success") {
                    let id = resposta.id;
                    login_sucesso();
                    setTimeout(function() {
                        window.location.href ='menu.html';
                    }, 2000);
                }
            } catch(error) {
                login_falha();
            }
        } else {
            alert("Erro na requisição. Status: " + xhttp.status);
        }
    }
    xhttp.open('POST', '../php/Login.php', true);

    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhttp.send(
        'email=' + encodeURIComponent(email) +
        '&senha=' + encodeURIComponent(senha)
    );
}

function login_sucesso() {
    let login_sucesso = document.getElementById('login-sucesso');
    let login_falha = document.getElementById('login-falha');
    let barra_progresso = document.getElementById('barra-progresso');

    login_sucesso.style.display = 'block';
    if(login_falha.style.display == 'block') {
        login_falha.style.display = 'none';
    }
    barra_progresso.style.width = '0%';

    let time = 0;
    let intervalo = 20;
    let duracao = 2000;
    let timer = setInterval(function() {
        time += intervalo;
        let progresso = (time / duracao) * 100;
        barra_progresso.style.width = progresso + '%';

        if(time >= duracao) {
            clearInterval(timer);
            login_sucesso.style.display = 'none';
        }
    }, intervalo);
}

function login_falha() {
    let login_falha = document.getElementById('login-falha');
    login_falha.style.display = 'block';
}