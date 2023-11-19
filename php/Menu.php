<?php
    session_start();

    // Caso não esteja logado
    if(!isset($_SESSION['id'])) {
        header("Location: Acesso_Negado.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/menu.css">
    <script>
        function confirmarSaida() {
            var sair = confirm("Você tem certeza que desja sair?");
            if(sair) {
                window.location.href  = "../php/Logout.php";
            }
        }
    </script>
    <title>Tetris</title>
</head>

<body>
    <main class="container">
        <nav class="menu">
            <img src="../images/logo.png" alt="" class="logo">
            <ul>
                <li><a href="../php/EscolherTabuleiro.php">JOGAR</a></li>
                <li><a href="../php/Controles.php">CONTROLES</a></li>
                <li><a href="../php/RankingGlobal.php">RANKING GLOBAL</a></li>
                <li><a href="../php/Perfil.php">VISUALIZAR PERFIL</a></li>
                <li><a href="javascript:void(0);" onclick="confirmarSaida()">SAIR</a></li>
            </ul>
        </nav>
        <img class="bg-img" src="../images/fundo_menu.png" alt="image-de-fundo">
    </main>
</body>
</html>