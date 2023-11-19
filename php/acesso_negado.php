<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/acesso_negado.css">
    <title>Acesso negado</title>
</head>
<body>
    <div id="toast">
        <h1>Acesso negado!</h3>
        <div id="barra-progresso"></div>
        <p>Você não está logado. Você será redirecionado para a página de login.</p>
    </div>
    <script>
        const toast = document.getElementById('toast');
        const barra_progresso = document.getElementById('barra-progresso');

        barra_progresso.style.width = '0%';

        let time = 0;
            let intervalo = 20;
            let duracao = 4000;
            let timer = setInterval(function() {
                time += intervalo;
                let progresso = (time / duracao) * 100;
                barra_progresso.style.width = progresso + '%';

                if(time >= duracao) {
                    clearInterval(timer);
                    window.location.href = 'Login.php';
                }
            }, intervalo);
    </script>
</body>
</html>